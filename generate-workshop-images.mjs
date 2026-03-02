#!/usr/bin/env node
/**
 * 워크샵 사이트 일러스트 생성 — Gemini Image API
 * 스타일: 깔끔한 미니멀 플랫 일러스트
 * 출력: docs/public/images/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 셀루션랩 프로젝트의 .env에서 API 키 가져오기
const envPath = path.join(__dirname, '..', '..', '셀루션랩-Lynidos', 'my-video', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const API_KEY = envContent.match(/GEMINI_API_KEY=(.+)/)[1].trim();

const MODEL = 'gemini-3-pro-image-preview';
const OUTPUT_DIR = path.join(__dirname, 'docs', 'public', 'images');

// 공통 스타일 지시
const STYLE = `Style: Clean minimal flat illustration. Simple geometric shapes, soft rounded corners, warm pastel color palette (#FFE4C9 peach, #C5E8FF sky blue, #E8D5FF lavender, #D4F5D4 mint, #FFD6E0 pink). Flat colors with subtle soft shadows only. White or very light warm cream (#FAFAF7) background. NO gradients, NO 3D effects, NO photorealism. Think: Notion-style or Figma community illustrations. Friendly, approachable, modern.
IMPORTANT: No text, no labels, no watermarks, no UI chrome. Pure illustration only. Aspect ratio: 16:9 horizontal, 1024x576.`;

const images = [
  {
    name: 'chatgpt-vs-claude-code',
    title: '1/6 ChatGPT vs Claude Code 비교',
    prompt: `A split comparison illustration showing two work scenarios side by side, divided by a thin vertical line.

LEFT SIDE — "Phone consultant": A person sitting at a desk, talking on a phone. The phone has a small chat bubble. The person's computer screen is separate and untouched. The person looks slightly frustrated, having to relay information back and forth. Warm peach tones.

RIGHT SIDE — "Colleague next to you": The same person sitting at a desk, but now a friendly robot/AI character sits right next to them, looking at the SAME computer screen together. The AI character is actively pointing at the screen and helping. The person looks happy and relaxed. Cool blue-mint tones.

Both sides have the same desk setup but the interaction model is completely different. The contrast should be immediately obvious at a glance.

${STYLE}`
  },
  {
    name: 'skill-manual',
    title: '2/6 스킬 = 업무 매뉴얼',
    prompt: `A minimal flat illustration showing the concept of "giving a manual to AI".

Center composition: A friendly round robot character (simple geometric shapes — circle head, rounded rectangle body, dot eyes, small smile) receiving a booklet/manual from a human hand entering from the left side.

The booklet has a simple checklist icon on its cover (3 horizontal lines with checkmarks). Above the robot, a thought bubble shows organized output: a neat document with bullet points.

Around the scene, 3 small floating icons represent repeatable tasks: an envelope (email), a clipboard (report), a chat bubble (message). Each has a small circular arrow suggesting "repeat".

The feeling: giving clear instructions once → consistent results every time.

${STYLE}`
  },
  {
    name: 'claude-md-memory',
    title: '3/6 CLAUDE.md = AI의 기억',
    prompt: `A minimal flat illustration showing the concept of "AI memory / context file".

Center: A friendly round robot character with a name badge/ID card pinned to its chest. The badge shows a small profile icon and 3 tiny horizontal lines (representing text).

LEFT side (before, faded/muted): The same robot with a question mark above its head, looking confused. A person is explaining something with a long speech bubble full of text lines.

RIGHT side (after, vibrant): The robot confidently working, with the badge visible. The person is relaxed, giving only a short instruction. The robot already "knows" the context.

A dotted arrow from left to right suggests the transformation: "from explaining everything → to just a quick command".

${STYLE}`
  },
  {
    name: 'mcp-usbc-port',
    title: '4/6 MCP = USB-C 포트',
    prompt: `A minimal flat illustration showing the concept of "AI connecting to external services via ports".

Center: A friendly round robot character with 3-4 USB-C style ports on its side (simple rectangular slots).

Connected via colorful cables to different service icons arranged in a semicircle:
- A calendar icon (coral/peach color) — representing Google Calendar
- A database/table icon (blue) — representing Notion
- A chat bubble icon (green) — representing Slack
- A folder icon (lavender) — representing file system

Each cable is a different pastel color matching its service icon. Small lightning bolt symbols near each connection suggest "active/powered".

The robot looks capable and extended — like a laptop with many peripherals plugged in.

${STYLE}`
  },
  {
    name: 'skill-creation-flow',
    title: '5/6 스킬 만들기 흐름',
    prompt: `A minimal flat illustration showing a 4-step horizontal flow/journey from left to right.

Step 1 (left): A folder icon with a small plus sign — "Create folder". Soft peach background circle.

Step 2: A document icon with a pencil writing on it — "Write SKILL.md". Soft blue background circle.

Step 3: A play button / terminal icon with a command prompt — "Test it". Soft mint background circle.

Step 4 (right): A sparkle/star icon with a thumbs up — "Success!". Soft lavender background circle.

The 4 steps are connected by a gentle curved dotted arrow flowing left to right. Each step sits on a pastel circle. Below each circle is a small number (1, 2, 3, 4) as a simple dot indicator.

The overall feeling: a clear, non-intimidating journey. Anyone can follow these 4 simple steps.

${STYLE}`
  },
  {
    name: 'preparation-checklist',
    title: '6/6 사전준비 체크리스트',
    prompt: `A minimal flat illustration showing a preparation/setup checklist concept.

Center-left: A large clipboard or checklist card, slightly tilted. On it, 4 items with checkboxes:
- Item 1: checked (green checkmark) — a laptop icon next to it
- Item 2: checked (green checkmark) — a key/subscription icon next to it
- Item 3: checked (green checkmark) — a code editor icon (brackets) next to it
- Item 4: checked (green checkmark) — a robot/AI icon next to it

Center-right: A happy person (simple geometric figure) giving a thumbs up or raising both arms in celebration. Small confetti dots or sparkles around them.

At the bottom, a progress bar showing 100% complete in mint green.

The feeling: "You did it! All prepared and ready to go!"

${STYLE}`
  }
];

async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
    }),
  });
  return res.json();
}

async function generateImage(img) {
  console.log(`\n🎨 생성 중: ${img.title}`);
  const data = await callGemini(img.prompt);

  if (data.error) {
    console.error(`   ❌ API Error: ${data.error.message}`);
    return null;
  }

  for (const candidate of data.candidates || []) {
    for (const part of candidate.content?.parts || []) {
      if (part.inlineData) {
        const buf = Buffer.from(part.inlineData.data, 'base64');
        const filePath = path.join(OUTPUT_DIR, `${img.name}.png`);
        fs.writeFileSync(filePath, buf);
        const kb = Math.round(buf.length / 1024);
        console.log(`   ✅ 저장: images/${img.name}.png (${kb} KB)`);
        return filePath;
      }
    }
  }

  console.error(`   ❌ 이미지 없음`);
  if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
    console.error(`   응답: ${data.candidates[0].content.parts[0].text.substring(0, 300)}`);
  }
  return null;
}

async function main() {
  console.log('🖼️  워크샵 일러스트 생성 시작');
  console.log(`📁 출력: ${OUTPUT_DIR}\n`);

  let success = 0;
  for (const img of images) {
    const result = await generateImage(img);
    if (result) success++;
    console.log('   ⏳ 5초 대기 (rate limit)...');
    await new Promise((r) => setTimeout(r, 5000));
  }

  console.log(`\n✅ 완료! ${success}/${images.length}개 생성됨`);
  console.log('💡 마크다운에서 ![설명](/images/파일명.png) 으로 참조하세요.');
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
