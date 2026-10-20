/* =========================================================================
   about.js — 회사소개 페이지 인터랙션
   1. 페이지 전환 (진입 커튼 / 이탈 커튼)
   2. 스크롤: 진행 바, 헤더 숨김, 패럴랙스
   3. Reveal + 카운터
   4. 그래픽 생성: 달력 점, 사람 아이콘, 와플 차트(팀 구성)
   5. 예약 흐름 스텝퍼 (자동 넘김 / 클릭 / 키보드)
   6. 연혁 캐러셀 (버튼 / 진행 바 / 드래그)
   7. 마이크로 인터랙션: 마그네틱 버튼, 카드 스포트라이트
   ========================================================================= */
(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const SVG_NS = 'http://www.w3.org/2000/svg';

  /* ---------- 1. Page transitions ---------- */
  const enter = () => requestAnimationFrame(() => root.classList.add('is-loaded'));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enter);
  else enter();

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) root.classList.remove('is-leaving');
  });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || reduceMotion) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== '_self') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/^(https?|file):$/.test(url.protocol)) return;
    if (url.pathname === location.pathname && url.hash) return;
    e.preventDefault();
    root.classList.add('is-leaving');
    setTimeout(() => { location.href = url.href; }, 480);
  });

  if (reduceMotion) {
    $$('svg').forEach((svg) => svg.pauseAnimations && svg.pauseAnimations());
  }

  /* ---------- 2. Scroll: progress / header / parallax ---------- */
  const progress = $('.scroll-progress');
  const parallaxEls = $$('[data-parallax]');
  let lastY = window.scrollY;
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);

    root.classList.toggle('is-scrolled', y > 8);
    const goingDown = y > lastY;
    root.classList.toggle('is-header-hidden', goingDown && y > 160);
    lastY = y;

    if (!reduceMotion) {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
        el.style.setProperty('--parallax', `${offset.toFixed(1)}px`);
      });
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- 3. Reveal + counters ---------- */
  const formatNum = (n, decimals) =>
    decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString('ko-KR');

  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    if (reduceMotion) { el.textContent = formatNum(target, decimals); return; }
    const dur = 1600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(2, -10 * t); // easeOutExpo
      el.textContent = formatNum(target * (t === 1 ? 1 : eased), decimals);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-inview');
      $$('[data-count]', el).forEach(runCounter);
      io.unobserve(el);
      // 등장이 끝나면 reveal 트랜지션(지연 포함)을 걷어내 호버 반응을 즉각적으로
      const i = parseFloat(getComputedStyle(el).getPropertyValue('--i')) || 0;
      setTimeout(() => el.removeAttribute('data-reveal'), 1000 + i * 90);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal]').forEach((el) => io.observe(el));

  // 카운터 시작 전 0 으로 초기화 (등장할 때 올라가도록)
  if (!reduceMotion) $$('[data-count]').forEach((el) => { el.textContent = '0'; });

  /* ---------- 4. Generated graphics ---------- */
  // 4-1. 월 예약: 30일 달력 점
  const cal = $('[data-cal]');
  if (cal) {
    for (let d = 0; d < 30; d++) {
      const r = document.createElementNS(SVG_NS, 'rect');
      r.setAttribute('x', (d % 10) * 14 + 1.5);
      r.setAttribute('y', Math.floor(d / 10) * 18 + 6);
      r.setAttribute('width', 11);
      r.setAttribute('height', 11);
      r.setAttribute('rx', 3);
      r.style.setProperty('--d', d);
      cal.appendChild(r);
    }
  }

  // 4-2. 직원 30명: 사람 아이콘
  const people = $('[data-people]');
  if (people) {
    for (let p = 0; p < 30; p++) {
      const x = (p % 15) * 10;
      const y = Math.floor(p / 15) * 26 + 2;
      const g = document.createElementNS(SVG_NS, 'g');
      g.style.setProperty('--p', p);
      const head = document.createElementNS(SVG_NS, 'circle');
      head.setAttribute('cx', x + 5); head.setAttribute('cy', y + 4); head.setAttribute('r', 3);
      const body = document.createElementNS(SVG_NS, 'rect');
      body.setAttribute('x', x + 1.5); body.setAttribute('y', y + 9);
      body.setAttribute('width', 7); body.setAttribute('height', 12); body.setAttribute('rx', 3.5);
      g.append(head, body);
      people.appendChild(g);
    }
  }

  // 4-3. 팀 구성 와플 차트 (6 x 5 = 30)
  const TEAMS = [
    { name: '개발', n: 11 },
    { name: '디자인', n: 4 },
    { name: 'PO', n: 3 },
    { name: '마케팅', n: 5 },
    { name: '운영·CS', n: 5 },
    { name: '경영지원', n: 2 },
  ];
  const SHADES = ['#000000', '#2b2f36', '#60646c', '#8b8d98', '#b9bbc6', '#d6d7de'];
  const waffle = $('[data-waffle]');
  const orgList = $('[data-org-list]');
  const orgCount = $('[data-org-count]');
  const orgLabel = $('[data-org-label]');

  if (waffle) {
    const cells = [];
    let n = 0;
    TEAMS.forEach((team, t) => {
      for (let k = 0; k < team.n; k++, n++) {
        const r = document.createElementNS(SVG_NS, 'rect');
        r.setAttribute('x', (n % 6) * 48);
        r.setAttribute('y', Math.floor(n / 6) * 48);
        r.setAttribute('width', 40);
        r.setAttribute('height', 40);
        r.setAttribute('rx', 6);
        r.style.setProperty('--n', n);
        r.dataset.team = t;
        waffle.appendChild(r);
        cells.push(r);
      }
    });

    const buttons = $$('button[data-team]', orgList);
    const setTeam = (t) => {
      cells.forEach((cell) => {
        const ct = +cell.dataset.team;
        const on = t === -1 || ct === t;
        cell.style.fill = t === -1 ? SHADES[ct] : on ? '#000000' : '#e3e4ea';
        cell.classList.toggle('is-hi', t !== -1 && on);
      });
      buttons.forEach((b) => b.classList.toggle('is-active', +b.dataset.team === t));
      orgCount.textContent = t === -1 ? 30 : TEAMS[t].n;
      orgLabel.textContent = t === -1 ? '명 · 전체' : `명 · ${TEAMS[t].name}`;
    };
    setTeam(-1);

    // 보는 동안 팀을 자동으로 순회, 사용자가 만지면 잠시 멈춤
    let auto = -1;
    let pausedUntil = 0;
    let visible = false;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.3 }).observe(waffle);
    if (!reduceMotion) {
      setInterval(() => {
        if (!visible || document.hidden || Date.now() < pausedUntil) return;
        auto = auto >= TEAMS.length - 1 ? -1 : auto + 1;
        setTeam(auto);
      }, 2200);
    }
    buttons.forEach((b) => {
      const pick = () => { pausedUntil = Date.now() + 6000; auto = +b.dataset.team; setTeam(auto); };
      b.addEventListener('mouseenter', pick);
      b.addEventListener('focus', pick);
      b.addEventListener('click', pick);
    });
    orgList.addEventListener('mouseleave', () => { pausedUntil = Date.now() + 2000; });
  }

  /* ---------- 5. Booking flow (단계 레일 + 상세 + 앱 화면) ---------- */
  const flow = $('[data-flow]');
  if (flow) {
    const STEP_MS = 5000;
    const steps = $$('.flow__step', flow);
    const texts = $$('[data-flow-text]', flow);
    const screens = $$('[data-flow-screen]', flow);
    const fill = $('[data-flow-fill]', flow);
    const timer = $('[data-flow-timer]', flow);
    const panel = $('#flow-panel', flow);
    flow.style.setProperty('--step-ms', `${STEP_MS}ms`);

    // 4단계 화면: 2026년 10월 달력 (1일 = 목요일), 24일 선택
    const calGrid = $('[data-cal-grid]', flow);
    if (calGrid) {
      const add = (tag, attrs, text) => {
        const el = document.createElementNS(SVG_NS, tag);
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        if (text != null) el.textContent = text;
        calGrid.appendChild(el);
        return el;
      };
      const colX = (c) => 50 + c * 44;
      ['일', '월', '화', '수', '목', '금', '토'].forEach((d, c) => add('text', { x: colX(c), y: 86, class: 'is-head' }, d));
      for (let day = 1; day <= 31; day++) {
        const cell = day + 3; // 목요일 시작
        const x = colX(cell % 7);
        const y = 120 + Math.floor(cell / 7) * 32;
        if (day === 24) {
          add('circle', { cx: x, cy: y - 5, r: 20, class: 'scr__cal-sel' });
          add('circle', { cx: x, cy: y - 5, r: 15 });
          add('text', { x, y, fill: '#fff', style: 'fill:#fff' }, day);
        } else {
          add('text', day < 20 ? { x, y, class: 'is-off' } : { x, y }, day);
        }
      }
    }

    // 2단계 화면: 검색어 끝에 커서
    const query = $('[data-scr-query]', flow);
    const caret = $('[data-scr-caret]', flow);

    let current = 0;
    let timerId = 0;
    let paused = false;
    let inView = false;

    const show = (i) => {
      current = i;
      steps.forEach((s, k) => {
        s.setAttribute('aria-selected', String(k === i));
        s.tabIndex = k === i ? 0 : -1;
        s.classList.toggle('is-done', k < i);
      });
      texts.forEach((t, k) => {
        t.hidden = k !== i;
        t.classList.toggle('is-active', k === i);
      });
      screens.forEach((s, k) => s.classList.toggle('is-active', k === i));
      panel.setAttribute('aria-labelledby', steps[i].id);
      fill.style.setProperty('--fill', `${(i / (steps.length - 1)) * 100}%`);
      if (i === 1 && query && caret) {
        try { caret.setAttribute('x', 68 + query.getComputedTextLength() + 3); } catch (_) {}
      }
      // 타이머 막대 재시작
      timer.classList.remove('is-running');
      void timer.offsetWidth;
      if (!reduceMotion) timer.classList.add('is-running');
    };

    const schedule = () => {
      clearTimeout(timerId);
      if (reduceMotion || paused || !inView) return;
      timerId = setTimeout(() => {
        if (!document.hidden) show((current + 1) % steps.length);
        schedule();
      }, STEP_MS);
    };

    steps.forEach((s, k) => {
      s.addEventListener('click', () => { show(k); schedule(); });
      s.addEventListener('keydown', (e) => {
        const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        const n = (current + dir + steps.length) % steps.length;
        show(n);
        steps[n].focus();
        schedule();
      });
    });

    // 마우스를 올리거나 포커스하면 자동 넘김을 멈춤
    const pause = (v) => {
      paused = v;
      flow.classList.toggle('is-paused', v);
      if (v) clearTimeout(timerId);
      else schedule();
    };
    flow.addEventListener('mouseenter', () => pause(true));
    flow.addEventListener('mouseleave', () => pause(false));
    flow.addEventListener('focusin', () => pause(true));
    flow.addEventListener('focusout', (e) => { if (!flow.contains(e.relatedTarget)) pause(false); });

    new IntersectionObserver(([e]) => {
      const was = inView;
      inView = e.isIntersecting;
      if (inView && !was) { show(current); schedule(); }
      if (!inView) clearTimeout(timerId);
    }, { threshold: 0.35 }).observe(flow);

    show(0);
  }

  /* ---------- 6. Timeline carousel ---------- */
  const tl = $('[data-timeline]');
  if (tl) {
    const prev = $('[data-tl-prev]');
    const next = $('[data-tl-next]');
    const bar = $('[data-tl-progress]');
    const track = $('.timeline__track', tl);
    const step = () => {
      const item = $('.tl-item', tl);
      return item ? item.getBoundingClientRect().width + 16 : 320;
    };
    const update = () => {
      const max = tl.scrollWidth - tl.clientWidth;
      const p = max > 0 ? tl.scrollLeft / max : 1;
      const visibleRatio = tl.clientWidth / tl.scrollWidth;
      bar.style.width = `${(visibleRatio + (1 - visibleRatio) * p) * 100}%`;
      prev.disabled = tl.scrollLeft <= 2;
      next.disabled = tl.scrollLeft >= max - 2;
    };
    prev.addEventListener('click', () => tl.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => tl.scrollBy({ left: step(), behavior: 'smooth' }));
    tl.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) track.style.setProperty('--line', 1);
    }, { threshold: 0.2 }).observe(tl);

    // 마우스 드래그로 넘기기
    let startX = 0;
    let startLeft = 0;
    let down = false;
    tl.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true; startX = e.clientX; startLeft = tl.scrollLeft;
    });
    window.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) tl.classList.add('is-dragging');
      tl.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      tl.classList.remove('is-dragging');
    });
  }

  /* ---------- 7. Micro interactions ---------- */
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (finePointer && !reduceMotion) {
    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.3}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });

    $$('.ds-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }
})();
