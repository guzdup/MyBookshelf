// discover.jsx — Discover tab: genre recommendation rows of demo book covers + fixed Add button.
// Reuses CoverArt from spine.jsx. Exports Discover, MB_AddButton.

// Demo catalogue — original placeholder titles grouped by genre (no real cover art needed).
const MB_GENRES = [
  { name: 'Horror', books: [
    { title: 'The Hollow House', author: 'V. Renner', spineColor: '#1c1c1f', textColor: '#e8e2d4', accent: '#a8331f', coverStyle: 'feature' },
    { title: 'Salt & Ash', author: 'M. Crane', spineColor: '#3a1f24', textColor: '#e6cfc4', accent: '#c46a4a' },
    { title: 'Nightjar', author: 'D. Vesper', spineColor: '#14202a', textColor: '#cdd8de', accent: '#5a8a9a' },
    { title: 'The Quiet Floor', author: 'L. Mercer', spineColor: '#26221c', textColor: '#e2d8c4', accent: '#9a7a3a', coverStyle: 'feature' },
    { title: 'Reliquary', author: 'S. Holt', spineColor: '#2b2b2b', textColor: '#d9cfc0', accent: '#b13a2f' },
  ]},
  { name: 'Drama', books: [
    { title: 'The Weight of Afternoons', author: 'A. Lindqvist', spineColor: '#e7dcc4', textColor: '#4a3a24', accent: '#9c7c4a' },
    { title: 'Saltwater Years', author: 'P. Okafor', spineColor: '#2c5e54', textColor: '#e8e0c8', accent: '#d9b25a', coverStyle: 'feature' },
    { title: 'A Room Facing North', author: 'I. Sorel', spineColor: '#9fb6c2', textColor: '#23323a', accent: '#3a5260' },
    { title: 'The Inheritance of Light', author: 'R. Adeyemi', spineColor: '#7a3320', textColor: '#f0dcc0', accent: '#d99a4a' },
    { title: 'Quietly, the River', author: 'F. Moreau', spineColor: '#3a3f4b', textColor: '#e9e4d6', accent: '#b9c1cc' },
  ]},
  { name: 'Romance', books: [
    { title: 'The Letter You Never Sent', author: 'C. Bellweather', spineColor: '#8a3a52', textColor: '#f3e3df', accent: '#e3a6b4', coverStyle: 'feature' },
    { title: 'Two Summers Late', author: 'N. Halloran', spineColor: '#d24a3a', textColor: '#fbeede', accent: '#f0c050' },
    { title: 'Paper Hearts', author: 'J. Wren', spineColor: '#dfe7ea', textColor: '#2b3a42', accent: '#6f8a93' },
    { title: 'The Slow Hour', author: 'E. Marchetti', spineColor: '#c8632a', textColor: '#fbf0d8', accent: '#f2c75c' },
    { title: 'Almost, Always', author: 'T. Fairview', spineColor: '#43304a', textColor: '#e9dcea', accent: '#b99ac4' },
  ]},
  { name: 'Mystery', books: [
    { title: 'The Tenth Witness', author: 'G. Ashford', spineColor: '#13243f', textColor: '#cfe0f0', accent: '#f0c14b', coverStyle: 'feature' },
    { title: 'Cold Harbour', author: 'D. Vance', spineColor: '#1f4e63', textColor: '#dfeaf0', accent: '#7fc0cf' },
    { title: 'The Glass Alibi', author: 'M. Province', spineColor: '#3b3b3b', textColor: '#d8d2c4', accent: '#8c8578' },
    { title: 'Nine Empty Chairs', author: 'R. Calloway', spineColor: '#5a1f24', textColor: '#e8cf9a', accent: '#c9a227' },
    { title: 'The Last Departure', author: 'S. Iqbal', spineColor: '#2c3a2e', textColor: '#e6e0cc', accent: '#c2a85a' },
  ]},
  { name: 'Science Fiction', books: [
    { title: 'The Ninth Orbit', author: 'K. Sundara', spineColor: '#161616', textColor: '#f2f2f2', accent: '#e0b020', coverStyle: 'feature' },
    { title: 'Tidewater Protocol', author: 'A. Reyes', spineColor: '#1f6e7a', textColor: '#e6f0ec', accent: '#f0a83a' },
    { title: 'Pale Engines', author: 'H. Ito', spineColor: '#2858a6', textColor: '#eef4fb', accent: '#e9b949' },
    { title: 'The Long Quiet', author: 'B. Osei', spineColor: '#16324f', textColor: '#dfe9f2', accent: '#9fd0e0' },
    { title: 'Vector & Vine', author: 'C. Lindgren', spineColor: '#3a2438', textColor: '#ecdcea', accent: '#c8a05a' },
  ]},
];

let _did = 0;
MB_GENRES.forEach((g) => g.books.forEach((b) => { b.id = 'demo' + (_did++); b.widthMM = 130; b.heightMM = 200; }));

function MB_DemoCover({ book, faceFont }) {
  const W = 124, H = 188;
  return (
    <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: W, height: H, borderRadius: '3px 6px 6px 3px',
        boxShadow: '0 10px 20px rgba(50,36,16,0.28), 0 2px 4px rgba(50,36,16,0.2)',
        transition: 'transform 0.2s ease', cursor: 'pointer' }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
        <CoverArt book={book} w={W} h={H} faceFont={faceFont} />
      </div>
      {/* Demo tag */}
      <div style={{ fontFamily: faceFont, fontSize: 10, fontWeight: 600, letterSpacing: 1.5,
        textTransform: 'uppercase', color: '#8a7858',
        border: '1px solid rgba(120,100,60,0.32)', borderRadius: 20, padding: '2px 10px',
        background: 'rgba(255,255,255,0.4)' }}>Demo</div>
    </div>
  );
}

function MB_GenreRow({ genre, faceFont }) {
  return (
    <div style={{ marginBottom: 26 }}>
      {/* genre heading */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '0 20px', marginBottom: 12 }}>
        <span style={{ fontFamily: faceFont, fontSize: 24, fontWeight: 700, color: '#2e261b' }}>{genre.name}</span>
        <span style={{ fontFamily: faceFont, fontSize: 13, color: '#9a8a6e', fontStyle: 'italic' }}></span>
      </div>
      {/* horizontal strip */}
      <div className="mb-genre-strip" style={{ display: 'flex', gap: 18, overflowX: 'auto',
        padding: '4px 20px 6px', WebkitOverflowScrolling: 'touch' }}>
        {genre.books.map((b) => <MB_DemoCover key={b.id} book={b} faceFont={faceFont} />)}
      </div>
    </div>
  );
}

function Discover({ faceFont }) {
  return (
    <div style={{ position: 'absolute', inset: 0,
      background: 'radial-gradient(120% 80% at 50% 12%, #e3d9c4, #d3c7b0 70%, #c6b99e)' }}>
      <div className="mb-shelf-scroll" style={{ position: 'absolute', top: 116, left: 0, right: 0, bottom: 0,
        overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '8px 0 150px' }}>
          {MB_GENRES.map((g) => <MB_GenreRow key={g.name} genre={g} faceFont={faceFont} />)}
        </div>
      </div>
      <MB_AddButton faceFont={faceFont} />
    </div>
  );
}

function MB_AddButton({ faceFont }) {
  return (
    <button style={{ position: 'absolute', bottom: 104, left: '50%', transform: 'translateX(-50%)',
      zIndex: 35, display: 'flex', alignItems: 'center', gap: 9, border: 'none', cursor: 'pointer',
      padding: '13px 24px', borderRadius: 30, fontFamily: faceFont, fontSize: 16, fontWeight: 600,
      color: '#f6f0e2', background: 'linear-gradient(180deg, #4a6e4e, #3a5a3e)',
      boxShadow: '0 8px 20px rgba(40,60,40,0.36), inset 0 1px 0 rgba(255,255,255,0.18)',
      whiteSpace: 'nowrap' }}
      onMouseDown={(e) => e.currentTarget.style.transform = 'translateX(-50%) scale(0.96)'}
      onMouseUp={(e) => e.currentTarget.style.transform = 'translateX(-50%)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(-50%)'}>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14M5 12h14" stroke="#f6f0e2" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      Add new book
    </button>
  );
}

Object.assign(window, { Discover, MB_AddButton, MB_GENRES });
