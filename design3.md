# 클래스로 — Style Reference v3
> 동네 공방의 따뜻함을 숫자와 이야기로 보여주는 흰 종이. 굵은 한글 제목, 감빛 주황 하나, 둥근 사진, 굴러 올라가는 숫자.

**Theme:** light
**기반:** `design2.md`(ElevenLabs — 절제된 에디토리얼, 알약 버튼, 그림자 최소화)
**참고:** 당근 회사소개 페이지(about.daangn.com) — 흰 바탕, 굵은 한글 제목, 브랜드 주황 하나, 16px 둥근 미디어, 카테고리 탭 + 연한 색 이야기 카드, 숫자 카운터, 보도자료 목록
**적용 파일:** `style5.css`

v2가 "속삭이는 얇은 제목 + 무채색"으로 고급스러움을 냈다면, v3는 **동네 서비스다운 친근함**으로 옮겨 갑니다. 제목은 굵고 짧게, 설명은 말하듯이. 색은 여전히 아끼되, 이제 **감빛 주황 하나는 '행동'에 씁니다** — 주 버튼, 선택된 탭, 강조 숫자. 페이지는 "한 줄 제목 → 큰 사진 → 이야기 → 숫자 → 다음 행동" 순서로 흐릅니다.

## v2 → v3 무엇이 바뀌었나

| 항목 | v2 (design2) | v3 (design3) | 이유 |
|------|--------------|--------------|------|
| 바탕 | 에그셸 `#fdfcfc` + 베이지 `#f5f3f1` | 흰색 `#ffffff` + 쿨 그레이 `#f2f3f6` | 사진·일러스트 색이 더 깨끗하게 보임 |
| 제목 | Waldenburg 300 (아주 얇게) | Pretendard 700 (굵게), 자간 -0.03em | 한글은 얇으면 힘이 없음. 짧고 굵은 문장이 동네 서비스의 목소리 |
| 강조색 | 그래픽 안에서만 (버튼 금지) | 감빛 주황 `#ff6f0f` — 주 버튼·선택 탭·숫자 | 예약이 목적인 페이지라 "누를 곳"이 바로 보여야 함 |
| 카드 | 베이지 단색 | 흰 바탕 + 카테고리별 연한 색(피치·버터·하늘·민트…) | 이야기·클래스마다 구분되는 따뜻함 |
| 모서리 | 카드 20 / 큰 카드 24 | 카드·사진 16 / 큰 미디어 24 | 참고 사이트 기준, 사진 위주라 조금 단단하게 |
| 그림자 | 거의 없음 | 기본 없음, 마우스 올릴 때만 부드럽게 | 그대로 절제, 반응만 추가 |
| 움직임 | 탭 전환 정도 | 스크롤 떠오르기, 숫자 카운트, 카드 호버, 탭 전환 | 신뢰(숫자)와 이야기를 리듬 있게 보여줌 |
| 글꼴 | Inter + Noto Sans KR | Pretendard 하나 (영문·한글 모두) | 한글 굵기 단계가 고르고 무료 |

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Paper | `#ffffff` | `--paper` | 페이지 바탕, 카드 바탕 |
| Cloud | `#f2f3f6` | `--surface` | 보조 면: 회색 버튼, 탭 묶음 바탕, 정보 박스 |
| Line | `#eaebee` | `--line` | 구분선, 입력칸 테두리, 카드 테두리 |
| Ink | `#1a1c20` | `--ink` | 제목·본문 기본 글자, 선택된 탭 바탕 |
| Body | `#4d5159` | `--body` | 긴 설명 문단 |
| Muted | `#868b94` | `--muted` | 날짜, 라벨, 보조 설명 |
| Faint | `#adb1ba` | `--faint` | 가장 흐린 주석, 비활성 |
| Persimmon | `#ff6f0f` | `--accent` | **주 버튼, 선택된 탭 점, 강조 숫자, 링크 화살표** — 한 화면에 한두 군데만 |
| Persimmon Deep | `#e85d00` | `--accent-strong` | 주 버튼 눌림·호버 |
| Persimmon Soft | `#fff5f0` | `--accent-soft` | 주황 계열 연한 면 (CTA 띠, 강조 박스) |

### 카테고리 연한 색 (이야기·클래스 카드 바탕)

| Name | Value | Token | 어울리는 클래스 |
|------|-------|-------|----------------|
| Peach | `#fff5f0` | `--tint-peach` | 도자기 |
| Butter | `#fff7e6` | `--tint-butter` | 베이킹 |
| Rose | `#fff3f2` | `--tint-rose` | 가죽공예 |
| Mint | `#e8faf6` | `--tint-mint` | 플라워 |
| Sky | `#ebf7fa` | `--tint-sky` | 드로잉 |
| Lilac | `#f4f0fb` | `--tint-lilac` | 향수 |

연한 색은 **면에만** 씁니다. 글자는 항상 Ink/Body/Muted.

## Tokens — Typography

### Pretendard — 유일한 글꼴 · `--font`
- **대체:** Karrot Sans(참고 사이트 전용 글꼴) → 무료 Pretendard
- **Weights:** 400(본문), 700(제목·버튼·숫자)
- **불러오기:** `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css`
- **자간:** 제목 -0.03em, 본문 -0.01em (한글은 좁힐수록 단단해 보임)
- **단어 끊김:** `word-break: keep-all` — 한글 단어 중간에서 줄 바꿈 금지

### Type Scale

| Role | Size (데스크톱 / 모바일) | Weight | Line Height | Letter Spacing | 쓰임 |
|------|--------------------------|--------|-------------|----------------|------|
| display | 56px / 34px | 700 | 1.25 | -0.03em | 페이지 첫 문장 (h1) |
| heading | 42px / 28px | 700 | 1.3 | -0.03em | 섹션 제목 (h2) |
| stat | 48px / 32px | 700 | 1.1 | -0.02em | 통계 숫자 |
| title | 28px / 22px | 700 | 1.35 | -0.02em | 카드·패널 제목 (h3) |
| body-lg | 20px / 18px | 400 | 1.6 | -0.01em | 소개 문단 (.lead) |
| body | 16px | 400 | 1.65 | -0.01em | 본문 |
| label | 14px | 700 | 1.4 | 0 | 탭, 버튼, 라벨 |
| caption | 13px | 400 | 1.5 | 0 | 날짜, 주석 |

## Tokens — Spacing & Shapes

**Base unit:** 4px · **Density:** comfortable

| 이름 | 값 | 쓰임 |
|------|----|------|
| `--space-section` | 160px (모바일 96px) | 섹션 사이 |
| `--space-block` | 48px | 섹션 제목 ↔ 내용 |
| `--gap` | 16px (큰 그리드 24px) | 카드 사이 |
| `--pad-card` | 32px (모바일 24px) | 카드 안쪽 |
| `--container` | 1152px | 본문 최대 폭 |
| `--gutter` | 24px (모바일 16px) | 화면 좌우 여백 |

### Border Radius

| Element | Value | Token |
|---------|-------|-------|
| 카드, 사진, 패널 | 16px | `--radius` |
| 큰 미디어(첫 화면 사진·영상) | 24px | `--radius-lg` |
| 입력칸 | 12px | `--radius-input` |
| 버튼, 탭, 태그 | 999px | `--radius-pill` |

## Elevation

- 기본은 **그림자 없음**. 면 구분은 흰색 ↔ Cloud(`#f2f3f6`) ↔ 연한 색으로.
- 마우스를 올린 카드·목록만: `0 8px 24px rgba(26, 28, 32, 0.08)` (0.2초)
- 테두리가 필요하면 1px `#eaebee`.

## Motion

| 토큰 | 값 | 쓰임 |
|------|----|------|
| `--dur-fast` | 200ms | 버튼·탭·카드 호버 (참고 사이트 `.2s`) |
| `--dur` | 250ms | 패널 전환, 안내 박스 등장 |
| `--dur-reveal` | 600ms | 스크롤로 섹션이 떠오름 |
| `--dur-count` | 1200ms | 숫자 카운트 |
| `--ease` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | 공통 |

- 움직이는 속성은 `opacity`, `transform`, `box-shadow`, 색만.
- 숫자는 화면에 보일 때 0부터 목표값까지 올라가고, 끝나면 멈춘다(반복 없음).
- `prefers-reduced-motion: reduce`면 모든 움직임을 끄고 최종 상태를 바로 보여준다.

## Components

### Top Navigation
흰 바탕, 높이 64px, 아래 1px Line. 왼쪽 로고(700, 20px), 오른쪽 메뉴(14px 700, Muted → 마우스 올리면 Ink). 현재 페이지는 Ink 글자 + 아래 주황 점.

### Page Hero
왼쪽 정렬 display 제목 한 줄(짧게), 아래 소개 문단(body-lg, Body), 그 아래 버튼 2개(주황 주 버튼 + 회색 보조 버튼). 넓은 화면에선 제목/설명이 2단 비대칭.

### Primary Button (주 버튼)
Persimmon 채움, 흰 글자, 999px, 14px 700, 패딩 14px 24px. 호버 시 Persimmon Deep, 누르면 `scale(0.97)`. **한 섹션에 하나.**

### Secondary Button (보조 버튼)
Cloud `#f2f3f6` 채움, Ink 글자, 999px. 호버 시 `#eaebee`.

### Text Link with Arrow
Ink 700 + 끝에 "→". 마우스 올리면 화살표가 4px 오른쪽으로.

### Category Tabs (카테고리 탭)
Cloud 바탕의 알약 묶음 안에 탭 알약. 선택된 탭 = Ink 바탕 + 흰 글자, 나머지 = 투명 + Muted 글자. ←/→ 키로 이동.

### Story / Class Panel (이야기·클래스 패널)
카테고리 연한 색 바탕, 16px, 패딩 48px. 왼쪽 라벨(주황 caption 700) → 제목(title) → 설명(body) → 정보 표, 오른쪽 둥근 사진(16px, 4:3). 탭 전환 시 아래에서 12px 떠오르며 등장.

### Stat Counter (숫자 카운터)
4칸 그리드. 위 라벨(14px Muted), 아래 숫자(stat, Ink) + 단위(title 크기, Persimmon). 칸 사이 1px Line 세로선. 화면에 들어오면 카운트.

### Step Card (단계 카드)
흰 바탕 + 1px Line 테두리, 16px, 패딩 32px. 왼쪽 위 원형 번호(Persimmon Soft 바탕, Persimmon 글자). 호버 시 그림자 + 2px 위로.

### News / List Row (소식 목록)
제목(18px 700) + 날짜(caption Muted), 줄 사이 1px Line. 호버 시 제목 밑줄 + 화살표.

### Form (예약 폼)
흰 카드(16px, 1px Line) 안에 라벨(14px 700) + 입력칸(Cloud 바탕, 테두리 없음, 12px, 높이 52px). 포커스 시 흰 바탕 + Ink 2px 테두리. 제출 버튼은 주 버튼 꽉 채움.

### CTA Band
Persimmon Soft 바탕, 24px, 왼쪽 제목 + 오른쪽 주 버튼.

## Do's and Don'ts

### Do
- 제목은 Pretendard 700, 한 줄에 끝나게 짧게 쓴다.
- 주황은 "누르거나 읽어야 할 곳"에만: 주 버튼, 선택된 탭 점, 숫자 단위.
- 카드 바탕은 카테고리 연한 색으로 구분하고, 글자는 Ink/Body/Muted만 쓴다.
- 사진·일러스트는 항상 16px(큰 것은 24px) 둥근 틀 안에 `object-fit: cover`로.
- 숫자(공방 420곳, 클래스 6종, 1인 42,000원)는 크게 보여준다 — 신뢰는 숫자에서 온다.
- 모든 문장은 말하듯이 "~해요" 체로.

### Don't
- 주황 글씨로 긴 문장을 쓰지 않는다. 주황 배경에 주황 글자를 올리지 않는다.
- 주 버튼(주황)을 한 섹션에 두 개 이상 두지 않는다.
- 연한 색 카드 위에 또 다른 연한 색 카드를 겹치지 않는다.
- 얇은 제목(300)을 쓰지 않는다 — v2의 흔적은 한글에서 힘이 없다.
- 그림자를 기본 상태에 깔지 않는다. 호버 반응으로만.
- 4px 미만의 날카로운 모서리를 쓰지 않는다.

## Imagery

참고 사이트는 실제 이웃의 손·얼굴·동네를 가까이 찍은 따뜻한 사진을 큰 둥근 틀에 담는다. 클래스로는 아직 실제 사진이 없으므로 **파스텔 톤 오일 파스텔 일러스트**(`images/classes-*.svg`)를 같은 틀에 넣는다. 실제 사진으로 바꿀 땐 같은 이름의 `.jpg`(500KB 이하)로 교체한다. 사진에 글자를 겹치지 않는다.

## Layout

- 본문 폭 1152px 가운데 정렬, 좌우 여백 24px(모바일 16px).
- 흐름: **한 줄 제목 → 소개 + 버튼 → 카테고리 탭 패널 → 숫자 → 단계 → 예약 폼(CTA)**.
- 섹션 사이 160px(모바일 96px). 섹션 제목은 왼쪽 정렬, 제목 아래 48px 띄우고 내용.
- 900px 이하에서 모든 2단은 1단으로, 숫자 4칸은 2칸으로.

## style5.css 클래스 대응표

| 클래스 | 역할 |
|--------|------|
| `.lead` | 소개 문단 (body-lg) |
| `.section` | 섹션 간격 |
| `.hero`, `.display`, `.actions` | 첫 화면 제목·설명·버튼 묶음 |
| `.btn` / `.btn--outline` | 주황 주 버튼 / 회색 보조 버튼 |
| `.tabs`, `.tab` | 카테고리 탭 |
| `.panel`, `.class-photo` | 클래스 패널(연한 색 자동), 둥근 사진 |
| `.stats`, `.stat`, `.stat-num`, `.stat-unit`, `.stat-label` | 숫자 카운터 (v3 새 부품) |
| `.cards` + `.card`, `.plate` | 단계 카드, 원형 번호 |
| `.list`, `.list-item` | 소식 목록 (v3 새 부품) |
| `.booking`, `.form-card`, `.form-row` | 예약 영역, 폼 |
| `.tag`, `.mono`, `.legal`, `.info-table` | 태그, 작은 라벨, 주석, 정보 표 |
| `.band`, `.band--dark`, `.band--lime`, `.band--pink` | 강조 박스 (주황 연한 면 / 잉크 / 흰 카드 / 로즈) |
| `.will-reveal` + `.is-visible` | 스크롤 떠오르기 (JS가 붙임) |

## Quick Start

```css
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');

:root {
  /* Colors */
  --paper: #ffffff;
  --surface: #f2f3f6;
  --line: #eaebee;
  --ink: #1a1c20;
  --body: #4d5159;
  --muted: #868b94;
  --faint: #adb1ba;
  --accent: #ff6f0f;
  --accent-strong: #e85d00;
  --accent-soft: #fff5f0;
  --tint-peach: #fff5f0;
  --tint-butter: #fff7e6;
  --tint-rose: #fff3f2;
  --tint-mint: #e8faf6;
  --tint-sky: #ebf7fa;
  --tint-lilac: #f4f0fb;

  /* Type */
  --font: 'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;

  /* Shape */
  --radius: 16px;
  --radius-lg: 24px;
  --radius-input: 12px;
  --radius-pill: 999px;
  --shadow-hover: 0 8px 24px rgba(26, 28, 32, 0.08);

  /* Layout */
  --container: 1152px;

  /* Motion */
  --dur-fast: 200ms;
  --dur: 250ms;
  --dur-reveal: 600ms;
  --dur-count: 1200ms;
  --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
}
```
