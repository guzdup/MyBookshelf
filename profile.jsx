// profile.jsx — Profile tab: lets the reader set the name shown around the app (e.g. the shelf greeting).

function FontSizeSelector(){
    const [fontSize, setFontSize] = useState('11px')
}


function Profile({ faceFont, userName, setUserName, goalAmount, setGoalAmount, goalUnit, setGoalUnit, goalSpan, setGoalSpan }) {
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
        
        <label style={{ fontFamily: faceFont, display: "block", fontSize: 12, letterSpacing: 1.5,
            textTransform: 'uppercase', marginTop: 20, color: '#6f6048', fontWeight: 600 }}>Reading Goal</label>
        <div style={{display: 'flex', gap: '10px', width: '100%'}}>
            <input type="number" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)}
                placeholder="-" min={0} style={{ display: 'block', width: '25%', marginTop: 8,
                padding: '12px 14px', fontFamily: faceFont, fontSize: 17, color: '#2e261b',
                background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(120,100,60,0.25)',
                borderRadius: 10, outline: 'none', boxSizing: 'border-box' }} />
            <select value={goalUnit} onChange={(e) => setGoalUnit(e.target.value)}
                placeholder="Select unit"  style={{ display: 'block', width: '40%', marginTop: 8,
                padding: '12px 14px', fontFamily: faceFont, fontSize: 17, color: '#2e261b',
                background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(120,100,60,0.25)',
                borderRadius: 10, outline: 'none', boxSizing: 'border-box' }} >
                <option value={""}></option>
                <option value={"book"}>Books</option>
                <option value={"page"}>Pages</option>
                <option value={"hour"}>Hours</option>
                <option value={"minute"}>Minutes</option> 
            </select>
            <select value={goalSpan} onChange={(e) => setGoalSpan(e.target.value)}
            placeholder="Select time span" style={{ display: 'block', width: '40%', marginTop: 8,
            padding: '12px 14px', fontFamily: faceFont, fontSize: 17, color: '#2e261b',
            background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(120,100,60,0.25)',
            borderRadius: 10, outline: 'none', boxSizing: 'border-box' }} >
                <option value={""}></option>
                <option value={"day"}>Day</option>
                <option value={"month"}>Month</option>
                <option value={"year"}>Year</option>
            </select>
        </div>
        <button onClick={() => {setGoalAmount(''); setGoalUnit(''); setGoalSpan('');}}
            style={{ display: 'flex', justifyContent: 'center', margin: '8px auto 0px auto', alignItems: 'center' , height: 20, width: '25%', padding: '12px 14px', 
                fontFamily: faceFont, fontSize: 17, color: 'rgba(255,255,255,0.55)',
                background: '#2e261b', border: '1px solid rgba(120,100,60,0.25)',
                borderRadius: 10, outline: 'none', boxSizing: 'border-box' }}>
            Clear 
        </button>
        
        
      </div>

      <MB_Timer faceFont={faceFont}/>
    </div>);

}

Object.assign(window, { Profile });
