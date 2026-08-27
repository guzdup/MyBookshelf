// spine.jsx — book rendering: SpineFace, ShelfSpine (flat, on shelf), Book3D (full box for animation)
// Loaded after React/Babel. Exports to window.

// curvature: a rounded spine catches light in the middle, darkens at both edges.
const MB_curve = 'linear-gradient(90deg, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.10) 9%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.04) 70%, rgba(0,0,0,0.12) 91%, rgba(0,0,0,0.40) 100%)';
// vertical aging / sheen
const MB_sheen = 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 14%, rgba(0,0,0,0) 86%, rgba(0,0,0,0.22) 100%)';

// deterministic pseudo-random from id
function MB_rand(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = h * 31 + seed.charCodeAt(i) >>> 0;
  return () => {h = h * 1664525 + 1013904223 >>> 0;return h / 4294967296;};
}

// ── The printed spine face (shared by shelf + 3D box) ──────────────────
function SpineFace({ book, w, h, density = 'full', faceFont }) {
  const thin = w < 17;
  const veryThin = w < 12;
  const r = MB_rand(book.id);
  const bands = book.hard && r() > 0.55; // raised hubs on some hardbacks
  const titleSize = Math.max(8.5, Math.min(w * 0.34, 13));
  const showText = density !== 'off' && !veryThin;
  const showAuthor = density === 'full' && !thin;

  return (
    <div style={{
      width: w, height: h, position: 'relative', overflow: 'hidden',
      background: book.spineColor,
      borderRadius: '2px 2px 1px 1px',
      boxSizing: 'border-box'
    }}>
      {/* curvature + sheen */}
      <div style={{ position: 'absolute', inset: 0, background: MB_curve }} />
      <div style={{ position: 'absolute', inset: 0, background: MB_sheen }} />
      {/* head cap — pale top edge of the text block */}
      <div style={{ position: 'absolute', top: 0, left: 1, right: 1, height: Math.max(1.5, w * 0.06),
        background: 'linear-gradient(180deg, rgba(245,240,225,0.85), rgba(245,240,225,0))' }} />
      {/* spine bands */}
      {bands && [0.13, 0.84].map((p, i) =>
      <div key={i} style={{ position: 'absolute', top: `${p * 100}%`, left: 0, right: 0, height: 2.5,
        background: 'rgba(0,0,0,0.28)', boxShadow: '0 1px 0 rgba(255,255,255,0.12)' }} />
      )}
      {/* accent rule near top */}
      {!thin &&
      <div style={{ position: 'absolute', top: '11%', left: '20%', right: '20%', height: 1.5,
        background: book.accent, opacity: 0.85 }} />
      }
      {/* vertical title */}
      {showText &&
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 6,
        transform: 'rotate(90deg)', transformOrigin: 'center',
        width: h, height: w, left: (w - h) / 2, top: (h - w) / 2, textAlign: "center"
      }}>
          <div style={{
          fontFamily: faceFont, fontWeight: 600, fontSize: titleSize, lineHeight: 1.04,
          color: book.textColor, letterSpacing: 0.2, textAlign: 'center',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          maxWidth: h - 16, textShadow: '0 1px 1px rgba(0,0,0,0.25)'
        }}>{book.title}</div>
          {showAuthor &&
        <div style={{
          fontFamily: faceFont, fontWeight: 500, fontSize: Math.max(7, titleSize * 0.66),
          color: book.textColor, opacity: 0.75, letterSpacing: 0.7,
          whiteSpace: 'nowrap', maxWidth: h - 24, overflow: 'hidden', textOverflow: 'ellipsis'
        }}>{book.author.split(' ').slice(-1)[0].toUpperCase()}</div>
        }
        </div>
      }
    </div>);

}

// ── Front cover art ────────────────────────────────────────────────────
function CoverArt({ book, w, h, faceFont }) {
  const feature = book.coverStyle === 'feature';
  const pad = w * 0.1;
  return (
    <div style={{
      width: w, height: h, position: 'relative', overflow: 'hidden',
      background: book.spineColor, boxSizing: 'border-box',
      borderRadius: '2px 4px 4px 2px'
    }}>
      {/* paper grain wash */}
      <div style={{ position: 'absolute', inset: 0, background:
        'radial-gradient(120% 80% at 70% 10%, rgba(255,255,255,0.12), rgba(255,255,255,0) 60%)' }} />
      {feature ?
      <div style={{ position: 'absolute', inset: 0, padding: pad, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', boxSizing: 'border-box' }}>
          <div style={{ fontFamily: faceFont, fontWeight: 700, fontSize: w * 0.135, lineHeight: 1.02,
          color: book.textColor, letterSpacing: 0.3, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            {book.title}</div>
          <div style={{ alignSelf: 'center', width: w * 0.46, height: w * 0.46, borderRadius: '50%',
          border: `2px solid ${book.accent}`, boxShadow: `inset 0 0 0 6px ${book.spineColor}, inset 0 0 0 7px ${book.accent}55` }} />
          <div style={{ fontFamily: faceFont, fontWeight: 600, fontSize: w * 0.066, letterSpacing: 1.5,
          color: book.accent, textTransform: 'uppercase' }}>{book.author}</div>
        </div> :

      <div style={{ position: 'absolute', inset: pad, display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center', boxSizing: 'border-box' }}>
          <div style={{ width: '46%', height: 2, background: book.accent, marginTop: '14%', marginBottom: 'auto' }} />
          <div style={{ fontFamily: faceFont, fontWeight: 600, fontSize: w * 0.115, lineHeight: 1.08,
          color: book.textColor, marginBottom: '7%' }}>{book.title}</div>
          <div style={{ fontFamily: faceFont, fontWeight: 500, fontSize: w * 0.06, letterSpacing: 1,
          color: book.textColor, opacity: 0.78, textTransform: 'uppercase', marginTop: 'auto' }}>{book.author}</div>
          <div style={{ width: '46%', height: 2, background: book.accent, marginTop: '12%' }} />
        </div>
      }
      {/* cover sheen */}
      <div style={{ position: 'absolute', inset: 0, background:
        'linear-gradient(105deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 26%, rgba(0,0,0,0.06) 100%)' }} />
      {/* spine-edge shadow on the left */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: w * 0.07,
        background: 'linear-gradient(90deg, rgba(0,0,0,0.28), rgba(0,0,0,0))' }} />
    </div>);

}

// ── The flat spine standing on the shelf ───────────────────────────────
function ShelfSpine({ book, scale, density, faceFont, onClick, dimmed }) {
  const w = Math.round(book.thickMM * scale);
  const h = Math.round(book.heightMM * scale);
  const r = MB_rand(book.id + 'lean');
  const lean =  r() < 0.22 ? r() < 0.5 ? -0.6 : 0.7 : 0;

  return (
    <div
      onClick={onClick}
      style={{
        width: w, height: h, alignSelf: 'flex-end', flex: '0 0 auto',
        position: 'relative', cursor: 'pointer',
        transform: lean ? `rotate(${lean}deg)` : undefined,
        transformOrigin: 'bottom center',
        transition: 'transform 0.25s ease, filter 0.25s ease',
        filter: dimmed ? 'brightness(0.62) saturate(0.85)' : 'none',
        // each book casts a soft shadow onto its right-hand neighbour
        boxShadow: '1.5px 0 5px rgba(40,28,12,0.22)',
        marginRight: 0.5
      }}
      onMouseEnter={(e) => {if (!dimmed) e.currentTarget.style.transform = `translateY(-7px) ${lean ? `rotate(${lean}deg)` : ''}`;}}
      onMouseLeave={(e) => {e.currentTarget.style.transform = lean ? `rotate(${lean}deg)` : 'none';}}>
      
      <SpineFace book={book} w={w} h={h} density={density} faceFont={faceFont} />
      {/* contact shadow at the foot */}
      <div style={{ position: 'absolute', bottom: -3, left: -2, right: -3, height: 6,
        background: 'radial-gradient(60% 100% at 50% 0%, rgba(30,20,8,0.4), rgba(30,20,8,0))' }} />
    </div>);

}

// ── Full 3D book box, used for the take-off-the-shelf animation ─────────
// Props: book, scale, transform (string on the .book), open (deg 0..-155), faceFont
function Book3D({ book, scale, transform, open = 0, faceFont }) {
  const w = Math.round(book.widthMM * scale);
  const h = Math.round(book.heightMM * scale);
  const t = Math.round(book.thickMM * scale);
  const face = (extra) => ({ position: 'absolute', left: '50%', top: '50%', backfaceVisibility: 'hidden', ...extra });
  const cream = '#efe7d2';

  return (
    <div style={{ transformStyle: 'preserve-3d', transform, transition: 'inherit' }} className="mb-book">
      {/* BACK COVER */}
      <div style={face({ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2,
        transform: `rotateY(180deg) translateZ(${t / 2}px)`, background: book.spineColor,
        borderRadius: '4px 2px 2px 4px', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.25)' })}>
        <div style={{ position: 'absolute', inset: 0, background: MB_sheen }} />
      </div>
      {/* SPINE (left) */}
      <div style={face({ width: t, height: h, marginLeft: -t / 2, marginTop: -h / 2,
        transform: `rotateY(-90deg) translateZ(${w / 2}px)` })}>
        <SpineFace book={book} w={t} h={h} density="full" faceFont={faceFont} />
      </div>
      {/* FORE-EDGE (right) — stacked pages */}
      <div style={face({ width: t, height: h, marginLeft: -t / 2, marginTop: -h / 2,
        transform: `rotateY(90deg) translateZ(${w / 2}px)`,
        background: `repeating-linear-gradient(90deg, ${cream} 0px, #e3d9c0 1.2px, ${cream} 2.4px)`,
        boxShadow: 'inset 0 0 8px rgba(0,0,0,0.2)' })} />
      {/* TOP — pages */}
      <div style={face({ width: w, height: t, marginLeft: -w / 2, marginTop: -t / 2,
        transform: `rotateX(90deg) translateZ(${h / 2}px)`,
        background: `repeating-linear-gradient(0deg, ${cream} 0px, #e0d6bd 1.2px, ${cream} 2.4px)` })} />
      {/* BOTTOM */}
      <div style={face({ width: w, height: t, marginLeft: -w / 2, marginTop: -t / 2,
        transform: `rotateX(-90deg) translateZ(${h / 2}px)`, background: cream })} />

      {/* THE PAGE under the cover (first/last-read page) — shown when open */}
      <div style={face({ width: w * 0.94, height: h * 0.97, marginLeft: -w / 2 + w * 0.05, marginTop: -h * 0.97 / 2,
        transform: `translateZ(${t / 2 - 1}px)`, background: '#f6f0e2', borderRadius: '1px 3px 3px 1px',
        padding: '8% 8% 8% 6%', boxSizing: 'border-box', overflow: 'hidden' })}>
        <div style={{ fontFamily: faceFont, fontSize: Math.max(5, w * 0.05), lineHeight: 1.5,
          color: '#3a3024', textAlign: 'justify' }}>{book.excerpt}</div>
      </div>

      {/* FRONT COVER — hinged at its left edge */}
      <div style={face({ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2,
        transformStyle: 'preserve-3d', transformOrigin: 'left center',
        transform: `translateZ(${t / 2}px) rotateY(${open}deg)`,
        transition: 'inherit' })}>
        {/* outside = cover art */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden' }}>
          <CoverArt book={book} w={w} h={h} faceFont={faceFont} />
        </div>
        {/* inside = cream endpaper */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)', background: '#efe7d2', borderRadius: '2px 4px 4px 2px',
          boxShadow: 'inset 0 0 30px rgba(120,90,50,0.18)' }}>
          <div style={{ position: 'absolute', inset: 0, background:
            'repeating-linear-gradient(135deg, rgba(120,90,50,0.04) 0 8px, rgba(120,90,50,0) 8px 16px)' }} />
        </div>
      </div>
    </div>);

}

Object.assign(window, { SpineFace, CoverArt, ShelfSpine, Book3D, MB_rand });