import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI JOOWON',
  description: '바이브 코딩 실전 가이드 — 최주원과 함께하는 AI 입문',
  lang: 'ko-KR',
  cleanUrls: true,

  head: [
    ['meta', { name: 'og:title', content: 'AI JOOWON — 바이브 코딩 실전 가이드' }],
    ['meta', { name: 'og:description', content: '바이브 코딩 실전 가이드 — 최주원과 함께하는 AI 입문' }],
  ],

  themeConfig: {
    nav: [
      { text: '홈', link: '/' },
    ],

    sidebar: {
      '/': [
        { text: '소개', link: '/' },
        {
          text: '1. 사전가이드',
          collapsed: false,
          items: [
            { text: '1-1. 사전 준비', link: '/학습자료/1-사전가이드/1-1 사전 준비' },
            { text: '1-2. 들어가기 앞서', link: '/학습자료/1-사전가이드/1-2 들어가기 앞서' },
            { text: '참고: VS Code 기본 사용법', link: '/학습자료/1-사전가이드/참고_VS Code 기본 사용법+세팅' },
          ],
        },
        { text: '2. 클로드코드란?', link: '/학습자료/1-클로드코드란' },
        {
          text: '3. 스킬개념',
          collapsed: false,
          items: [
            { text: '3-1. 스킬이란?', link: '/학습자료/3-스킬개념/3-1-스킬이란' },
            { text: '3-2. 공식스킬 체험', link: '/학습자료/3-스킬개념/3-2-공식스킬체험' },
            { text: '3-3. 첫 스킬 만들기', link: '/학습자료/3-스킬개념/3-3-첫스킬만들기' },
            { text: '3-4. 배포 및 공유', link: '/학습자료/3-스킬개념/3-4-배포및공유' },
          ],
        },
        {
          text: '4. 바이브코딩 기초',
          collapsed: false,
          items: [
            { text: '4-1. 바이브코딩?', link: '/학습자료/4-바이브코딩기초/4-1-바이브코딩' },
            { text: '4-2. CLAUDE.md', link: '/학습자료/4-바이브코딩기초/4-2-claudemd' },
            { text: '4-3. MCP 설명', link: '/학습자료/4-바이브코딩기초/4-3-mcp설명' },
            { text: '4-4. MCP 설치 실습', link: '/학습자료/4-바이브코딩기초/4-4-mcp설치실습' },
          ],
        },
        {
          text: '5. 워크샵 실습',
          collapsed: true,
          items: [
            { text: '5-1. 나만의 스킬 설계', link: '/학습자료/4-워크샵실습/4-1-나만의스킬설계' },
            { text: '5-2. 설계서 예시', link: '/학습자료/4-워크샵실습/4-2-설계서예시' },
          ],
        },
        { text: '6. 다음 단계', link: '/학습자료/5-다음단계' },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Bejoowon' },
    ],

    footer: {
      message: 'AI JOOWON',
      copyright: '© 2026 최주원. All rights reserved.',
    },

    outline: {
      label: '목차',
    },

    docFooter: {
      prev: '이전',
      next: '다음',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '검색' },
          modal: {
            noResultsText: '결과를 찾을 수 없습니다',
            resetButtonTitle: '초기화',
            footer: { selectText: '선택', navigateText: '이동' },
          },
        },
      },
    },
  },
})
