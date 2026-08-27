// shelf.jsx — the physical bookcase: themed wood frame, shelves, decor. Exports to window.

const MB_THEMES = {
  warmWhite: {
    name: 'Warm white',
    frame: 'linear-gradient(180deg, #f3eee2, #e9e2d2)',
    frameEdge: '#d8cfba',
    side: 'linear-gradient(90deg, #e4dcc8, #f1ebdd 40%, #ece4d2)',
    board: 'linear-gradient(180deg, #f6f1e6 0%, #efe8d8 55%, #ddd3bd 100%)',
    boardFront: 'linear-gradient(180deg, #e7dfcc, #d3c9b1)',
    back: 'linear-gradient(180deg, #efe9db 0%, #e6dfce 100%)',
    backShade: 'rgba(120,100,60,0.10)',
    decor: '#e8e0cd',
  },
  oak: {
    name: 'Light oak',
    frame: 'linear-gradient(180deg, #d9b988, #caa572)',
    frameEdge: '#a9854f',
    side: 'linear-gradient(90deg, #b9925c, #d8b884 45%, #c2a06a)',
    board: 'linear-gradient(180deg, #e0cb8a, #d7b682 55%, #b78f55 100%)',
    boardFront: 'linear-gradient(180deg, #c2a06a, #a17e49)',
    back: 'linear-gradient(180deg, #c8a96f 0%, #b2904f 100%)',
    backShade: 'rgba(80,52,18,0.18)',
    decor: '#c9a76d',
  },
  walnut: {
    name: 'Dark walnut',
    frame: 'linear-gradient(180deg, #4a3320, #3a2616)',
    frameEdge: '#26170c',
    side: 'linear-gradient(90deg, #341f10, #4c3320 45%, #3a2414)',
    board: 'linear-gradient(180deg, #5a3d24 0%, #4a3019 55%, #2f1d0e 100%)',
    boardFront: 'linear-gradient(180deg, #3a2414, #25160a)',
    back: 'linear-gradient(180deg, #2e1c0e 0%, #23150a 100%)',
    backShade: 'rgba(0,0,0,0.34)',
    decor: '#4a3320',
  },
};

// wood-grain overlay for a board / side
function MB_grain(intensity = 1, horizontal = true) {
  const a = 0.05 * intensity, b = 0.035 * intensity;
  const dir = horizontal ? '90deg' : '0deg';
  return `repeating-linear-gradient(${dir}, rgba(0,0,0,${a}) 0px, rgba(0,0,0,0) 3px, rgba(255,255,255,${b}) 6px, rgba(0,0,0,0) 9px)`;
}

// a small cozy stack of horizontal books to fill empty shelf space
function MB_Stack({ scale, books, faceFont }) {
  return (
    <div style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'column-reverse',
      flex: '0 0 auto', marginLeft: 6 }}>
      {books.map((b, i) => {
        const wide = Math.round(b.heightMM * 0.66 * scale);
        const tall = Math.round(b.thickMM * scale);
        return (
          <div key={i} style={{ width: wide - i * 6, height: tall, marginLeft: i * 3,
            background: b.spineColor, borderRadius: 2, position: 'relative',
            boxShadow: '0 -1px 0 rgba(255,255,255,0.12), 0 2px 4px rgba(40,28,12,0.25)' }}>
            <div style={{ position: 'absolute', inset: 0, background: MB_sheen, borderRadius: 2 }} />
            <div style={{ position: 'absolute', left: 5, right: 5, top: '50%', transform: 'translateY(-50%)',
              height: 1.5, background: b.accent, opacity: 0.7 }} />
          </div>
        );
      })}
    </div>
  );
}

function MB_Shelf({ books, theme, scale, density, faceFont, onSelect, selectedId, grain, stack }) {
  const tallest = Math.max(...books.map(b => b.heightMM)) * scale;
  const interior = Math.round(tallest + 14);
  return (
    <div style={{ position: 'relative' }}>
      {/* compartment */}
      <div style={{ position: 'relative', height: interior, background: theme.back, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: MB_grain(grain, false), opacity: 0.6 }} />
        {/* ambient interior shading */}
        <div style={{ position: 'absolute', inset: 0, background:
          `linear-gradient(180deg, ${theme.backShade} 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 78%, ${theme.backShade} 100%)` }} />
        {/* top-of-compartment cast shadow from the board above */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 16,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0))' }} />
        {/* the row of books, sitting on the board */}
        <div style={{ position: 'absolute', left: 10, right: 10, bottom: 0, display: 'flex',
          alignItems: 'flex-end', justifyContent: 'flex-start', gap: 0 }}>
          {books.map(b => (
            <ShelfSpine key={b.id} book={b} scale={scale} density={density} faceFont={faceFont}
              dimmed={selectedId && selectedId !== b.id}
              onClick={(e) => onSelect(b, e.currentTarget.getBoundingClientRect())} />
          ))}
          {stack && <MB_Stack scale={scale} books={stack} faceFont={faceFont} />}
        </div>
      </div>
      {/* the shelf board (thickness) */}
      <div style={{ position: 'relative', height: 15, background: theme.board,
        boxShadow: '0 3px 6px rgba(30,20,8,0.30)' }}>
        <div style={{ position: 'absolute', inset: 0, background: MB_grain(grain, true), opacity: 0.5 }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 5, background: theme.boardFront }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1.5, background: 'rgba(255,255,255,0.35)' }} />
      </div>
    </div>
  );
}

// Full bookcase
function Bookshelf({ shelves, theme, scale, density, faceFont, onSelect, selectedId, grain = 1, stacks = {} }) {
  return (
    <div style={{ position: 'relative', padding: '0 0', background: theme.frameEdge,
      boxShadow: '0 24px 50px rgba(30,20,8,0.30)' }}>
      {/* top cap */}
      <div style={{ height: 13, background: theme.frame, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: MB_grain(grain, true), opacity: 0.4 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.4)' }} />
      </div>
      <div style={{ display: 'flex' }}>
        {/* left side panel */}
        <div style={{ width: 11, background: theme.side, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: MB_grain(grain, false), opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 2, background: 'rgba(0,0,0,0.18)' }} />
        </div>
        {/* shelves */}
        <div style={{ flex: 1 }}>
          {shelves.map((row, i) => (
            <MB_Shelf key={i} books={row} theme={theme} scale={scale} density={density}
              faceFont={faceFont} onSelect={onSelect} selectedId={selectedId} grain={grain}
              stack={stacks[i] || null} />
          ))}
        </div>
        {/* right side panel */}
        <div style={{ width: 11, background: theme.side, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: MB_grain(grain, false), opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 2, background: 'rgba(255,255,255,0.18)' }} />
        </div>
      </div>
      {/* base */}
      <div style={{ height: 16, background: theme.frame, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: MB_grain(grain, true), opacity: 0.4 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(0,0,0,0.22)' }} />
      </div>
    </div>
  );
}

Object.assign(window, { MB_THEMES, Bookshelf, MB_grain });
