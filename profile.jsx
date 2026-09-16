// profile.jsx — Profile tab: lets the reader set the name shown around the app (e.g. the shelf greeting).

function Profile({ faceFont, userName, setUserName }) {
  return (
    <div style={{ position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, #d3c7b0, #c6b99e)' }}>

      <MB_Header faceFont={faceFont} title="Profile" eyebrow="Your library" />

      <div style={{ position: 'absolute', top: 132, left: 0, right: 0, padding: '20px 20px' }}>
        <label style={{ fontFamily: faceFont, fontSize: 12, letterSpacing: 1.5,
          textTransform: 'uppercase', color: '#6f6048', fontWeight: 600 }}>Your name</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name" style={{ display: 'block', width: '100%', marginTop: 8,
          padding: '12px 14px', fontFamily: faceFont, fontSize: 17, color: '#2e261b',
          background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(120,100,60,0.25)',
          borderRadius: 10, outline: 'none', boxSizing: 'border-box' }} />
        <div style={{ fontFamily: faceFont, fontSize: 13, color: '#6f6048', marginTop: 8 }}>
          This name will show on My Shelf.
        </div>
      </div>

      <MB_Timer faceFont={faceFont}/>
    </div>);

}

Object.assign(window, { Profile });
