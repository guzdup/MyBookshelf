// app.jsx — myBookshelf screen: wall + bookcase + header + tab bar + Tweaks. Exports App.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "shelfTheme": "warmWhite",
  "grain": 1,
  "labelDensity": "full",
  "animSpeed": 1
} /*EDITMODE-END*/;

const MB_SCALE = 0.96; // display px per mm (keeps every spine proportional)

// decorative horizontal stacks (not clickable) to fill a shelf cozily
const MB_STACKS = {
  0: [{ heightMM: 198, thickMM: 22, spineColor: '#7c9a8a', accent: '#e8dcc0' },
  { heightMM: 188, thickMM: 18, spineColor: '#caa45a', accent: '#3a2e18' },
  { heightMM: 205, thickMM: 26, spineColor: '#9a4a3a', accent: '#f0dcc0' }],
  1: [{ heightMM: 196, thickMM: 20, spineColor: '#3a5260', accent: '#cfe0ea' },
  { heightMM: 190, thickMM: 24, spineColor: '#d8c068', accent: '#3a3214' }]
};

function MB_Icon({ name, active }) {
  const c = active ? '#2e261b' : '#9a8a6e';
  const sw = 1.9;
  if (name === 'discover') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth={sw} />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" stroke={c} strokeWidth={sw} strokeLinejoin="round" fill={active ? c : 'none'} fillOpacity={active ? 0.15 : 0} />
    </svg>);

  if (name === 'shelf') return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="4" width="3.5" height="16" rx="1" stroke={c} strokeWidth={sw} fill={active ? c : 'none'} fillOpacity={active ? 0.15 : 0} />
      <rect x="8.5" y="6.5" width="3.5" height="13.5" rx="1" stroke={c} strokeWidth={sw} fill={active ? c : 'none'} fillOpacity={active ? 0.15 : 0} />
      <rect x="13.2" y="4.5" width="3.6" height="15.5" rx="1" transform="rotate(9 15 12)" stroke={c} strokeWidth={sw} fill={active ? c : 'none'} fillOpacity={active ? 0.15 : 0} />
    </svg>);

  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8.5" r="3.6" stroke={c} strokeWidth={sw} fill={active ? c : 'none'} fillOpacity={active ? 0.15 : 0} />
      <path d="M4.5 20c0-4 3.4-6.5 7.5-6.5S19.5 16 19.5 20" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>);

}

function MB_TabBar({ tab, setTab, faceFont }) {
  const tabs = [['discover', 'Discover'], ['shelf', 'My Shelf'], ['profile', 'Profile']];
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40,
      paddingBottom: 26, paddingTop: 9,
      background: 'linear-gradient(180deg, rgba(244,238,225,0.72), rgba(244,238,225,0.92))',
      backdropFilter: 'blur(16px) saturate(160%)', WebkitBackdropFilter: 'blur(16px) saturate(160%)',
      borderTop: '1px solid rgba(120,100,60,0.16)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      {tabs.map(([id, label]) =>
      <button key={id} onClick={() => setTab(id)} style={{ border: 'none', background: 'none',
        cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        padding: '2px 14px' }}>
          <MB_Icon name={id} active={tab === id} />
          <span style={{ fontFamily: faceFont, fontSize: 11, fontWeight: tab === id ? 700 : 500,
          letterSpacing: 0.2, color: tab === id ? '#2e261b' : '#9a8a6e' }}>{label}</span>
        </button>
      )}
    </div>);

}

function MB_Header({ faceFont, title, eyebrow }) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30,
      padding: '58px 20px 12px',
      background: 'linear-gradient(180deg, rgba(206,195,173,0.96) 0%, rgba(206,195,173,0.7) 70%, rgba(206,195,173,0))' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: faceFont, fontSize: 13, letterSpacing: 1, color: '#6f6048',
            textTransform: 'uppercase', fontWeight: 600 }}>{eyebrow}</div>
          <div style={{ fontFamily: faceFont, fontSize: 28, fontWeight: 700, color: '#2e261b',
            lineHeight: 1.1, marginTop: 2 }}>{title}</div>
        </div>
        <div style={{ display: 'flex', gap: 9 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(120,100,60,0.2)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', boxShadow: '0 2px 6px rgba(60,44,20,0.1)' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#6f6048" strokeWidth="2" /><path d="M16 16l4 4" stroke="#6f6048" strokeWidth="2" strokeLinecap="round" /></svg>
          </div>
        </div>
      </div>
    </div>);

}

function MB_Placeholder({ title, line, faceFont }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 12, padding: 40, textAlign: 'center',
      background: 'linear-gradient(180deg, #d3c7b0, #c6b99e)' }}>
      <div style={{ fontFamily: faceFont, fontSize: 30, fontWeight: 700, color: '#2e261b' }}>{title}</div>
      <div style={{ fontFamily: faceFont, fontSize: 16, color: '#6f6048', maxWidth: 240, lineHeight: 1.5 }}>{line}</div>
      <div style={{ marginTop: 6, fontFamily: faceFont, fontSize: 12, letterSpacing: 2,
        textTransform: 'uppercase', color: '#9a8a6e' }}>Coming soon</div>
    </div>);

}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [tab, setTab] = React.useState('shelf');
  const [selected, setSelected] = React.useState(null);
  const [origin, setOrigin] = React.useState(null);
  const stageRef = React.useRef(null);
  const [stageSize, setStageSize] = React.useState({ w: 402, h: 690 });

  React.useLayoutEffect(() => {
    const el = stageRef.current;if (!el) return;
    const measure = () => setStageSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const theme = MB_THEMES[t.shelfTheme] || MB_THEMES.warmWhite;
  const faceFont = "'Spectral', Georgia, serif";

  const handleSelect = (book, rect) => {
    if (selected) return;
    const host = stageRef.current;
    const hb = host.getBoundingClientRect();
    const sf = hb.width / host.offsetWidth || 1;
    setOrigin({ x: (rect.left - hb.left) / sf, y: (rect.top - hb.top) / sf,
      w: rect.width / sf, h: rect.height / sf });
    setSelected(book);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(120% 80% at 50% 18%, #d8ccb5, #c2b59b 70%, #b3a587)' }}>

      {/* ── main stage (wall + bookcase) ── */}
      <div ref={stageRef} style={{ position: 'absolute', inset: 0 }}>
        {tab === 'shelf' &&
        <React.Fragment>
            {/* soft wall light */}
            <div style={{ position: 'absolute', inset: 0, background:
            'radial-gradient(80% 50% at 50% 8%, rgba(255,250,238,0.5), rgba(255,250,238,0) 60%)' }} />
            {/* scrollable bookcase — starts just below the header, scrolls behind the tab bar */}
            <div className="mb-shelf-scroll" style={{ position: 'absolute', top: 132, left: 0, right: 0, bottom: 0,
            overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <div style={{ padding: '6px 0 120px' }}>
                <Bookshelf shelves={window.MB_SHELVES.map((s) => s.slice(0, 8))}
            theme={theme} scale={MB_SCALE} density={t.labelDensity} faceFont={faceFont}
            grain={t.grain} onSelect={handleSelect} selectedId={selected ? selected.id : null} />
              </div>
            </div>
          </React.Fragment>
        }
        {tab === 'discover' && <Discover faceFont={faceFont} />}
        {tab === 'profile' && <MB_Placeholder faceFont={faceFont} title="Profile"
        line="Your reading streak, finished volumes and yearly goal will live here." />}

        {/* cinematic reader */}
        {selected && origin &&
        <Reader book={selected} origin={origin} stage={stageSize} scale={MB_SCALE}
        faceFont={faceFont} speed={t.animSpeed} density={t.labelDensity}
        onClosed={() => {setSelected(null);setOrigin(null);}} />
        }
      </div>

      {tab !== 'profile' &&
        <MB_Header faceFont={faceFont}
          title={tab === 'discover' ? 'Discover' : 'My Shelf'}
          eyebrow={tab === 'discover' ? 'Curated for you' : 'Good evening, Mara'} />
      }
      <MB_TabBar tab={tab} setTab={setTab} faceFont={faceFont} />

      {/* ── Tweaks ── */}
      <TweaksPanel>
        <TweakSection label="Bookcase" />
        <TweakRadio label="Material" value={t.shelfTheme}
        options={[{ value: 'warmWhite', label: 'Warm white' }, { value: 'oak', label: 'Light oak' }, { value: 'walnut', label: 'Walnut' }]}
        onChange={(v) => setTweak('shelfTheme', v)} />
        <TweakSlider label="Wood grain" value={t.grain} min={0} max={1.8} step={0.1}
        onChange={(v) => setTweak('grain', v)} />
        <TweakSection label="Spines" />
        <TweakRadio label="Labels" value={t.labelDensity}
        options={[{ value: 'full', label: 'Title + author' }, { value: 'minimal', label: 'Title only' }, { value: 'off', label: 'None' }]}
        onChange={(v) => setTweak('labelDensity', v)} />
        <TweakSection label="Animation" />
        <TweakSlider label="Speed" value={t.animSpeed} min={0.5} max={1.8} step={0.1} unit="×"
        onChange={(v) => setTweak('animSpeed', v)} />
      </TweaksPanel>
    </div>);

}

Object.assign(window, { App });