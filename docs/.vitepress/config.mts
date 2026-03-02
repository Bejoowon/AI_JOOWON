import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI JOOWON 워크샵',
  description: '최주원과 함께하는 실전 AI 워크샵 시리즈',
  lang: 'ko-KR',
  cleanUrls: true,

  head: [
    ['meta', { name: 'og:title', content: 'AI JOOWON 워크샵' }],
    ['meta', { name: 'og:description', content: '최주원과 함께하는 실전 AI 워크샵 시리즈' }],
  ],

  themeConfig: {
    nav: [
      { text: '홈', link: '/' },
    ],

    sidebar: {
      '/': [
        { text: '워크샵 소개', link: '/' },
        { text: '사전가이드', link: '/사전가이드' },
        { text: '워크샵 커리큘럼', link: '/워크샵커리큘럼' },
        {
          text: '학습자료',
          items: [
            { text: '1. 클로드코드란?', link: '/학습자료/1-클로드코드란' },
            {
              text: '2. 스킬개념',
              collapsed: false,
              items: [
                { text: '2-1. 스킬이란?', link: '/학습자료/2-스킬개념/2-1-스킬이란' },
                { text: '2-2. 공식스킬 체험', link: '/학습자료/2-스킬개념/2-2-공식스킬체험' },
                { text: '2-3. 첫 스킬 만들기', link: '/학습자료/2-스킬개념/2-3-첫스킬만들기' },
                { text: '2-4. 배포 및 공유', link: '/학습자료/2-스킬개념/2-4-배포및공유' },
              ],
            },
            {
              text: '3. 바이브코딩 기초',
              collapsed: false,
              items: [
                { text: '3-1. 바이브코딩?', link: '/학습자료/3-바이브코딩기초/3-1-바이브코딩' },
                { text: '3-2. CLAUDE.md', link: '/학습자료/3-바이브코딩기초/3-2-claudemd' },
                { text: '3-3. MCP 설명', link: '/학습자료/3-바이브코딩기초/3-3-mcp설명' },
                { text: '3-4. MCP 설치 실습', link: '/학습자료/3-바이브코딩기초/3-4-mcp설치실습' },
              ],
            },
            {
              text: '4. 워크샵 실습',
              collapsed: false,
              items: [
                { text: '4-1. 나만의 스킬 설계', link: '/학습자료/4-워크샵실습/4-1-나만의스킬설계' },
                { text: '4-2. 설계서 예시', link: '/학습자료/4-워크샵실습/4-2-설계서예시' },
              ],
            },
            { text: '5. 다음 단계', link: '/학습자료/5-다음단계' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ai-joowon' },
    ],

    footer: {
      message: 'AI JOOWON 워크샵',
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
