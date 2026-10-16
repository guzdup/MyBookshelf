// profile.jsx — Profile tab: lets the reader set the name shown around the app (e.g. the shelf greeting).

function FontSizeSelector(){
    const [fontSize, setFontSize] = useState('11px')
}


// accept only whole numbers in [1, max]; an empty field clears the goal
function MB_goalChange(e, max, setGoal) {
  const v = e.target.value;
  if (v === '') {
    if (!e.target.validity.badInput) setGoal(null); // badInput: browser holds text like "-" or "e"
    return;
  }
  if (!/^\d+$/.test(v)) return;
  const n = parseInt(v, 10);
  if (n >= 1 && n <= max) setGoal(n);
}

function Profile({ faceFont, userName, setUserName, dailyGoalMinutes, setDailyGoalMinutes, yearlyGoalBooks, setYearlyGoalBooks }) {
  const labelStyle = { fontFamily: faceFont, fontSize: 12, letterSpacing: 1.5,
    textTransform: 'uppercase', color: '#6f6048', fontWeight: 600 };
  const inputStyle = { display: 'block', marginTop: 8, padding: '12px 14px',
    fontFamily: faceFont, fontSize: 17, color: '#2e261b',
    background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(120,100,60,0.25)',
    borderRadius: 10, outline: 'none', boxSizing: 'border-box' };
  const unitStyle = { fontFamily: faceFont, fontSize: 15, color: '#6f6048', marginTop: 8 };
  // marginLeft auto pushes it to the row's right edge, lining up with the name field
  const clearStyle = { marginLeft: 'auto', marginTop: 8, height: 36, padding: '0 16px', flexShrink: 0,
    fontFamily: faceFont, fontSize: 17, color: 'rgba(255,255,255,0.55)',
    background: '#2e261b', border: '1px solid rgba(120,100,60,0.25)',
    borderRadius: 10, outline: 'none', boxSizing: 'border-box', cursor: 'pointer' };

  return (
    <div style={{ position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, #d3c7b0, #c6b99e)' }}>

      <MB_Header showSearch={false} faceFont={faceFont} title="Profile" fontSize={'28px'} />

      <div style={{ position: 'absolute', top: 132, left: 0, right: 0, padding: '20px 20px' }}>
        
        <label style={{ fontFamily: faceFont, fontSize: 12, letterSpacing: 1.5,
            textTransform: 'uppercase', color: '#6f6048', fontWeight: 600 }}>Your name</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name" style={{ display: 'block', width: '100%', marginTop: 8,
          padding: '12px 14px', fontFamily: faceFont, fontSize: 17, color: '#2e261b',
          background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(120,100,60,0.25)',
          borderRadius: 10, outline: 'none', boxSizing: 'border-box'}} />
        <div style={{ fontFamily: faceFont, fontSize: 13, color: '#6f6048', marginTop: 8 }}>
          This name will show on My Shelf.
        </div>
        
        <label style={{ ...labelStyle, display: 'block', marginTop: 20 }}>Daily goal</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="number" inputMode="numeric" min={1} max={1440} step={1}
                value={dailyGoalMinutes ?? ''} onChange={(e) => MB_goalChange(e, 1440, setDailyGoalMinutes)}
                placeholder="-" style={{ ...inputStyle, width: '30%' }} />
            <span style={unitStyle}>min / day</span>
            <button onClick={() => setDailyGoalMinutes(null)} style={clearStyle}>Clear</button>
        </div>

        <label style={{ ...labelStyle, display: 'block', marginTop: 20 }}>Yearly goal</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="number" inputMode="numeric" min={1} step={1}
                value={yearlyGoalBooks ?? ''} onChange={(e) => MB_goalChange(e, Infinity, setYearlyGoalBooks)}
                placeholder="-" style={{ ...inputStyle, width: '30%' }} />
            <span style={unitStyle}>books / year</span>
            <button onClick={() => setYearlyGoalBooks(null)} style={clearStyle}>Clear</button>
        </div>
      </div>

      <MB_Timer faceFont={faceFont}/>
    </div>);

}

Object.assign(window, { Profile });
