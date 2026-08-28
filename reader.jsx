// reader.jsx — the "take the book off the shelf" sequence + reading view. Exports to window.
// Phases: rise → face → open → read  (and reverse on close)

function Reader({ book, origin, stage, scale, faceFont, speed = 1, density, onClosed }) {
  const [phase, setPhase] = React.useState('rise');
  const timers = React.useRef([]);
  const after = (ms, fn) => { const id = setTimeout(fn, ms / speed); timers.current.push(id); };

  const w = Math.round(book.widthMM * scale);
  const h = Math.round(book.heightMM * scale);

  // geometry: where the spine sits vs. the stage centre
  const cx = stage.w / 2, cy = stage.h / 2;
  const oc = { x: origin.x + origin.w / 2, y: origin.y + origin.h / 2 };
  const dx = oc.x - cx, dy = oc.y - cy;
  const S = Math.min(2.55, (stage.h * 0.58) / h);   // enlarge so the cover fills ~58% height
  const lift = stage.h * 0.04;

  React.useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase('face')));
    after(1080, () => setPhase('open'));
    after(1080 + 640, () => setPhase('read'));
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const close = () => {
    timers.current.forEach(clearTimeout); timers.current = [];
    setPhase('closeCover');
    after(780, () => setPhase('return'));
    after(780 + 840, () => onClosed && onClosed());
  };

  // per-phase look of the 3D book
  let transform, open = 0, bookOpacity = 1, dur = 620;
  switch (phase) {
    case 'rise':
      transform = `translate(${dx}px, ${dy}px) rotateY(90deg) scale(1)`; dur = 0; break;
    case 'face':
      transform = `translate(0px, ${-lift}px) rotateY(0deg) scale(${S})`; dur = 640; break;
    case 'open':
    case 'read':
      transform = `translate(${w * S * 0.12}px, ${-lift}px) rotateY(-20deg) scale(${S * 0.82})`;
      open = -150; dur = 600; bookOpacity = phase === 'read' ? 0 : 1; break;
    case 'closeCover':
      transform = `translate(0px, ${-lift}px) rotateY(0deg) scale(${S})`; open = 0; dur = 780; break;
    case 'return':
      transform = `translate(${dx}px, ${dy}px) rotateY(90deg) scale(1)`; open = 0; dur = 840; break;
    default: transform = '';
  }

  const scrimOn = phase !== 'rise' && phase !== 'return';
  const reading = phase === 'read';

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 80, pointerEvents: 'auto' }}>
      {/* scrim */}
      <div onClick={phase === 'read' ? undefined : close} style={{
        position: 'absolute', inset: 0, background: 'rgba(28,20,10,0.55)',
        backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)',
        opacity: scrimOn ? 1 : 0, transition: `opacity ${560 / speed}ms ease`,
      }} />

      {/* 3D stage */}
      <div style={{ position: 'absolute', inset: 0, perspective: 1700, perspectiveOrigin: '50% 42%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: bookOpacity, transition: `opacity ${340 / speed}ms ease`, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%',
          transition: `transform ${dur / speed}ms cubic-bezier(0.34, 0.02, 0.2, 1)`,
          transformStyle: 'preserve-3d', transform }}>
          {/* drop shadow puddle under the lifted book */}
          <div style={{ position: 'absolute', left: '50%', top: h * 0.62, width: w * 1.4, height: 22,
            transform: 'translateX(-50%) rotateX(78deg)', borderRadius: '50%',
            background: 'radial-gradient(50% 50%, rgba(0,0,0,0.4), rgba(0,0,0,0))',
            opacity: phase === 'rise' || phase === 'return' ? 0 : 0.8,
            transition: `opacity ${dur / speed}ms ease` }} />
          <Book3D book={book} scale={scale} transform="" open={open} faceFont={faceFont} />
        </div>
      </div>

      {/* full reading view */}
      <ReadingView book={book} faceFont={faceFont} visible={reading} speed={speed} onBack={close} />
    </div>
  );
}

function ReadingView({ book, faceFont, visible, speed, onBack }) {
  const pct = Math.round((book.page / book.pages) * 100);
  const paras = [book.excerpt,
    "Outside, the season had turned without asking permission. She marked the place with a ribbon the colour of weak tea and let the cover fall shut, though she did not, for some minutes, put the book down.",
    "There would be time tomorrow, and the day after, and all the quiet evenings stacked behind them like volumes waiting to be opened — each one promising the same small, renewable astonishment."];
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 90,
      background: 'linear-gradient(180deg, #f7f1e3 0%, #f2ead9 100%)',
      opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(1.04)',
      transition: `opacity ${380 / speed}ms ease, transform ${420 / speed}ms ease`,
      pointerEvents: visible ? 'auto' : 'none',
      display: 'flex', flexDirection: 'column',
      fontFamily: faceFont, color: '#2e261b',
    }}>
      {/* top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '58px 20px 12px' }}>
        <button onClick={onBack} style={{ border: 'none', background: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, color: '#6a5a42', font: 'inherit', padding: 0 }}>
          <span style={{ fontSize: 19 }}>‹</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Shelf</span>
        </button>
        <div style={{ display: 'flex', gap: 18, color: '#8a7858', fontSize: 15 }}>
          <span style={{ fontWeight: 600, fontSize: 17 }}>A<span style={{ fontSize: 12 }}>a</span></span>
          <span>⌖</span>
          <span>⌥</span>
        </div>
      </div>

      {/* page */}
      <div style={{ flex: 1, overflow: 'auto', padding: '6px 30px 0' }}>
        <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase',
          color: '#a9926a', marginBottom: 18 }}>{book.title}</div>
        <h2 style={{ fontFamily: faceFont, fontWeight: 600, fontSize: 25, lineHeight: 1.2,
          margin: '0 0 20px' }}>Chapter Eleven</h2>
        {paras.map((p, i) => (
          <p key={i} style={{ fontSize: 17.5, lineHeight: 1.72, margin: '0 0 16px',
            textAlign: 'justify', textIndent: i === 0 ? 0 : '1.4em',
            hyphens: 'auto', WebkitHyphens: 'auto' }}>{p}</p>
        ))}
      </div>

      {/* footer progress */}
      <div style={{ padding: '10px 30px 30px' }}>
        <div style={{ height: 3, background: 'rgba(120,90,50,0.16)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: pct + '%', height: '100%', background: '#b07a3a' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9,
          fontSize: 12, color: '#9a8660', letterSpacing: 0.4 }}>
          <span>Page {book.page} of {book.pages}</span>
          <span>{pct}% · {Math.max(1, Math.round((book.pages - book.page) * 1.6 / 60))} hrs left</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Reader, ReadingView });
