# MCP 설치 실습

MCP가 뭔지는 알겠는데, 실제로 어떻게 설치하나요? 직접 해봅시다.

오늘은 3가지 MCP를 설치합니다. 쉬운 것부터 차근차근 갑니다.

---

## Part A: Context7 MCP 확인

> 가장 간단한 MCP입니다. 이미 사전준비에서 설치되어 있을 수 있어요.

### Context7이 뭔가요?

프로그래밍 라이브러리의 **최신 공식 문서**를 AI가 직접 조회할 수 있게 해주는 MCP입니다.
비개발자에게는 "AI가 최신 정보를 직접 찾아볼 수 있게 해주는 연결"이라고 이해하면 됩니다.

### 확인 방법

Claude Code에게 물어보세요:

```
현재 연결된 MCP 서버 목록을 보여줘
```

`context7` 이 목록에 있으면 이미 설치된 겁니다!

### 없다면 설치하기

Claude Code에게:

```
Context7 MCP 서버를 설치해줘
```

### 테스트

```
Context7을 사용해서 VitePress의 최신 설정 방법을 알려줘
```

AI가 최신 문서를 기반으로 답변하면 성공!

::: tip Part A 체크리스트
- [ ] Context7 MCP가 연결되어 있는지 확인했다
- [ ] 없으면 설치했다
- [ ] 테스트 질문에 최신 문서 기반 답변을 받았다
:::

---

## Part B: Chrome DevTools MCP 설치

> AI가 웹 브라우저를 직접 제어하고 스크린샷을 찍을 수 있게 해주는 MCP입니다.

### 왜 필요한가요?

| MCP 없을 때 | MCP 있을 때 |
|------------|------------|
| "이 웹페이지 캡처해서 보내줘" → 직접 캡처해야 함 | "이 페이지 스크린샷 찍어줘" → AI가 직접 캡처 |
| "이 버튼 눌러봐" → 직접 클릭해야 함 | "로그인 버튼 클릭해줘" → AI가 직접 조작 |

### 설치하기

Claude Code에게 자연어로 요청하세요:

```
Chrome DevTools MCP 서버를 설치해줘
```

Claude Code가 알아서:
1. 필요한 패키지를 설치하고
2. 설정 파일(`.mcp.json`)에 등록하고
3. 연결 확인까지 해줍니다

### 테스트: 스크린샷 찍기

```
https://claude.ai 페이지를 열고 스크린샷을 찍어줘
```

스크린샷 이미지가 생성되면 성공!

::: details 잘 안 되면?
| 문제 | 해결 |
|------|------|
| "Chrome을 찾을 수 없습니다" | Chrome 브라우저가 설치되어 있는지 확인 |
| "연결할 수 없습니다" | Chrome을 완전히 종료한 후 다시 시도 |
| 설정 오류 | Claude Code에게 "MCP 설정 파일 확인해줘"라고 요청 |
:::

::: tip Part B 체크리스트
- [ ] Chrome DevTools MCP를 설치했다
- [ ] 스크린샷 테스트가 성공했다
:::

---

## Part C: Google Calendar MCP 설치

> AI가 내 Google 캘린더를 직접 읽고, 일정을 추가할 수 있게 해주는 MCP입니다.
> 이건 조금 더 복잡하지만, 설치 후 효과가 가장 큽니다!

### 왜 필요한가요?

설치 후에는 이런 대화가 가능해집니다:

```
👤 "내일 일정 알려줘"
🤖 "내일 오전 10시 팀 미팅, 오후 2시 고객 미팅이 있습니다."

👤 "금요일 오후 3시에 주간회의 잡아줘"
🤖 "금요일 15:00에 '주간회의' 일정을 추가했습니다."
```

### OAuth 설정이 필요합니다

Google Calendar은 개인 정보이기 때문에 **인증(OAuth)** 과정이 필요합니다.
복잡해 보이지만 한 번만 하면 됩니다.

### Step 1: Google Cloud Console 설정

Claude Code에게:

```
Google Calendar MCP를 설치하고 싶어.
OAuth 설정부터 안내해줘.
```

Claude Code가 단계별로 안내해줍니다:

1. **Google Cloud Console** 접속 ([console.cloud.google.com](https://console.cloud.google.com))
2. 새 프로젝트 생성
3. Google Calendar API 활성화
4. OAuth 동의 화면 설정
5. OAuth 클라이언트 ID 생성 → JSON 파일 다운로드

::: warning 이 과정이 가장 어렵습니다
Google Cloud Console이 처음이면 낯설 수 있어요.
**Claude Code에게 하나씩 물어보면서** 진행하세요. 막히면 손 들어주세요!
:::

### Step 2: MCP 설정

JSON 키 파일을 다운받았다면, Claude Code에게:

```
이 OAuth JSON 파일로 Google Calendar MCP를 설정해줘.
파일 위치: ~/Downloads/client_secret_xxxx.json
```

### Step 3: 인증 완료

브라우저가 열리면서 Google 로그인 화면이 나옵니다.
1. Google 계정 선택
2. **허용** 클릭
3. 터미널/VS Code로 돌아오기

### 테스트: 일정 조회

```
오늘 일정을 알려줘
```

내 Google Calendar의 일정이 나오면 성공!

```
내일 오후 2시에 "Claude Code 복습" 일정을 추가해줘
```

캘린더에 일정이 추가되면 완벽합니다!

::: details 잘 안 되면?
| 문제 | 해결 |
|------|------|
| "API가 활성화되지 않았습니다" | Google Cloud Console에서 Calendar API 활성화 확인 |
| "인증 실패" | OAuth JSON 파일 경로가 맞는지 확인 |
| "권한이 없습니다" | OAuth 동의 화면에서 calendar 범위(scope) 추가 |
| 브라우저가 안 열림 | 수동으로 터미널에 출력된 URL 복사해서 브라우저에 붙여넣기 |
:::

::: tip Part C 체크리스트
- [ ] Google Cloud Console에서 프로젝트를 만들었다
- [ ] Calendar API를 활성화했다
- [ ] OAuth 클라이언트 ID를 만들고 JSON 파일을 받았다
- [ ] MCP 설정을 완료했다
- [ ] "오늘 일정 알려줘"에 실제 일정이 나온다
- [ ] 새 일정을 추가할 수 있다
:::

---

## 전체 완료 체크리스트

- [ ] **Context7**: AI가 최신 문서를 조회할 수 있다
- [ ] **Chrome DevTools**: AI가 웹페이지 스크린샷을 찍을 수 있다
- [ ] **Google Calendar**: AI가 내 일정을 읽고 추가할 수 있다

::: tip 축하합니다!
3개의 MCP를 설치했다면, 여러분의 AI는 이제:
- 최신 정보를 직접 찾아보고
- 웹 브라우저를 직접 조작하고
- 캘린더를 직접 관리하는

**진짜 비서**가 된 겁니다!
:::

---

## MCP 설정 파일 위치

설치한 MCP 설정은 이 파일에 저장됩니다:

```
~/.claude/.mcp.json
```

나중에 MCP를 추가하거나 수정하고 싶으면 이 파일을 확인하세요.
Claude Code에게 "MCP 설정 보여줘"라고 하면 쉽게 볼 수 있습니다.

---

**[나만의 스킬 설계 →](/학습자료/4-워크샵실습/4-1-나만의스킬설계)**
