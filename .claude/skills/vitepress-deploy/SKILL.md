---
name: vitepress-deploy
description: |
  Obsidian 마크다운을 VitePress 호환 형식으로 변환하고 사이트를 배포하는 스킬.
  이미지 문법 변환, 파일명 정리, 빌드 검증, git push까지 한 번에 처리한다.

  Triggers:
  - "사이트 배포", "배포해줘", "사이트 업데이트", "vitepress 배포"
  - "옵시디언 변환", "마크다운 변환"
  - 사용자가 docs/학습자료/ 내 .md 파일을 수정한 뒤 배포를 요청할 때
---

# VitePress 배포 스킬

Obsidian에서 작성한 마크다운을 VitePress 사이트로 변환 및 배포한다.

## 프로젝트 구조

```
01.SITE/
├── docs/
│   ├── .vitepress/config.mts   ← 사이드바 설정
│   ├── public/attachments/     ← 이미지 저장소 (배포에 포함됨)
│   ├── public/images/          ← 기존 이미지
│   └── 학습자료/               ← 마크다운 콘텐츠
└── vercel.json                 ← cleanUrls: true
```

## 실행 순서

### 1. 이미지 변환

Obsidian `![[]]` 문법을 표준 마크다운으로 변환한다.

```bash
# docs/학습자료/ 내 모든 .md에서 ![[파일명]] → ![](/attachments/파일명) 변환
grep -rl '!\[\[' docs/학습자료/ --include="*.md" | while read f; do
  sed -i '' 's/!\[\[\([^]]*\)\]\]/![](\/attachments\/\1)/g' "$f"
done
```

### 2. 이미지 파일 처리

새 이미지를 `docs/public/attachments/`로 복사하고 파일명 공백을 하이픈으로 변경한다.
**핵심**: 파일명에 공백이 있으면 마크다운 파서가 img 태그를 생성하지 않는다.

```bash
# 학습자료 내 attachments 폴더에서 새 이미지를 public으로 복사
find docs/학습자료 -path "*/attachments/*.png" -exec cp {} docs/public/attachments/ \;

# 파일명 공백 → 하이픈 변경 (public/attachments 내)
cd docs/public/attachments/
for f in *\ *; do mv "$f" "${f// /-}"; done

# 마크다운 내 이미지 경로도 공백 → 하이픈으로 업데이트
grep -rl '/attachments/' docs/학습자료/ --include="*.md" | while read f; do
  sed -i '' 's|/attachments/Pasted image |/attachments/Pasted-image-|g' "$f"
done
```

### 3. VitePress 문법 검증

다음 항목을 검증한다:

- **`:::` 컨테이너**: `:::tip`, `:::warning`, `:::info`, `:::details`가 올바르게 열리고 닫혔는지 확인. 닫는 `:::`가 빠져있으면 추가.
- **Obsidian 잔여 문법**: `![[]]`가 남아있지 않은지 grep으로 확인.

```bash
# Obsidian 문법 잔여 확인
grep -rn '!\[\[' docs/학습자료/ --include="*.md"
# 결과가 있으면 변환 필요
```

### 4. 내부 링크 검증

`config.mts`의 사이드바 링크 경로와 실제 파일 위치가 일치하는지 확인한다.
폴더명이나 파일명이 변경된 경우 `config.mts`와 다른 마크다운 내부 링크도 함께 수정한다.

### 5. 빌드 확인

```bash
npm run build
```

- dead link가 발견되면 해당 마크다운 파일의 링크를 수정하고 다시 빌드.
- 빌드 성공할 때까지 반복.

### 6. 배포

```bash
git add -A
git commit -m "사이트 콘텐츠 업데이트"
git push origin master
```

Vercel이 자동으로 배포한다 (cleanUrls 적용 완료).

## 주의사항

- `docs/public/` 안의 파일만 배포에 포함된다. `docs/학습자료/*/attachments/`는 빌드에 포함 안 됨.
- 이미지 경로는 반드시 절대경로 `/attachments/파일명.png` 사용.
- 파일명에 공백 금지. 공백 있으면 `<img>` 태그가 생성되지 않음.
- `cleanUrls: true` 설정으로 `.html` 확장자 없이 접근 가능.
