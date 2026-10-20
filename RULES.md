# 팀 규칙 (클래스로 회사소개 홈페이지)

## 역할
| 담당 | 파일 | 브랜치 |
| --- | --- | --- |
| 조장(PO/PM) | index.html, style.css, RULES.md | main |
| 조원 A | about.html (회사소개) | feature/about |
| 조원 B | classes.html (클래스 둘러보기) | feature/classes |
| 조원 C | location.html (오시는길) | feature/location |
| 조원 D | partner.html (공방 입점 안내) | feature/partner |

## 꼭 지킬 것
1. 내 담당 파일만 수정한다. 다른 파일 수정이 필요하면 조장에게 요청.
2. 파일 안의 "✏️ 담당자 작성 영역" 사이만 고친다. 메뉴·푸터는 건드리지 않는다.
3. 디자인은 style.css를 그대로 쓴다. 새 스타일이 필요하면 조장에게 요청.
4. main에 직접 올리지 않는다. 내 브랜치에 올리고 PR을 보낸다.
5. 작업 시작 전에 최신 main을 받는다 (git pull).
6. 커밋 메시지 형식: [담당메뉴] 한 일  예) [회사소개] 기본 정보 표 추가

## 작업 순서 (조원)
1. 초대 메일 수락
2. git clone https://github.com/think2output/261020.git
3. git checkout -b feature/담당메뉴
4. 담당 파일 작업 → 브라우저로 열어서 확인
5. git add . → git commit -m "[담당메뉴] 한 일" → git push origin feature/담당메뉴
6. GitHub에서 Pull Request 생성, 리뷰 담당 조원 지정
7. 조장이 머지하면: git checkout main → git pull

## PR 리뷰 짝꿍
A → B, B → C, C → D, D → A (화살표 방향으로 댓글 1개 이상)

## 내용 기준
- 회사 정보는 수업 자료 00_회사소개.md 기준 (설립 2023년 3월, 대표 한서윤 등)
- md에 없는 내용(주소, 입점 신청 방법)은 지어내되, 다른 페이지와 숫자가 어긋나지 않게 한다

## AI 도구를 쓰는 경우
작업 전에 이 RULES.md와 담당 파일을 AI에게 먼저 보여주고 시작한다.
