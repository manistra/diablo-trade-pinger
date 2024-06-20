import { useState } from 'react'
import { bumpDiabloTradeAllItems } from './pupeteer'
import logo from './assets/logo.png'
import button from './assets/button.png'

function App() {
  const [isBumping, setIsBumping] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pageCount, setPageCount] = useState(1)
  const [info, setInfo] = useState('')

  const logInfo = (message) => {
    setInfo(message)
  }

  const handleClick = async () => {
    setIsBumping(true)
    await bumpDiabloTradeAllItems({
      email: email,
      password: password,
      listingPageCount: pageCount,
      logInfo: logInfo
    })
    setIsBumping(false)
  }

  return (
    <div
      style={{
        gap: 3,
        display: 'flex',
        flexDirection: 'column',
        fontSize: '16px',
        padding: '70px',
        borderRadius: '10px'
        // backgroundColor: 'rgba(11, 4, 1, 0.5)' /* Black w/opacity/see-through */
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <header
          style={{
            fontFamily: 'ExocetOTCECY-Medium',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '30px'
          }}
        >
          <img alt="logo" className="logo" src={logo} style={{ margin: 0 }} />

          <div
            style={{
              fontFamily: 'ExocetOTCECY-Medium',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <span style={{ color: '#f28303', fontSize: '50px' }}>DIABLO</span>
            <span style={{ color: 'white', fontSize: '25px' }}>Trade Bumper</span>
          </div>
        </header>

        {!isBumping && (
          <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '14px', marginBottom: '4px' }}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  fontSize: '17px',
                  backgroundColor: '#1a130e',
                  color: '#f28303',
                  outline: 'none',
                  padding: '8px',
                  border: '1px inset #6d3c04f3',
                  borderRadius: '3px'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '14px', marginBottom: '4px' }}>Password:</label>
              <input
                style={{
                  fontSize: '17px',
                  backgroundColor: '#1a130e',
                  color: '#f28303',
                  outline: 'none',
                  padding: '8px',
                  border: '1px inset #6d3c04f3',
                  borderRadius: '3px'
                }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '14px', marginBottom: '4px' }}>Item Page Count:</label>
              <input
                type="number"
                value={pageCount}
                onChange={(e) => setPageCount(parseInt(e.target.value))}
                style={{
                  fontSize: '17px',
                  backgroundColor: '#1a130e',
                  color: '#f28303',
                  outline: 'none',
                  padding: '8px',
                  border: '1px inset #6d3c04f3',
                  borderRadius: '3px'
                }}
              />
            </div>
            <img alt="logo" className="button" src={button} onClick={handleClick} />
          </div>
        )}
      </div>
      <div className="bump-logger">{info}</div>
    </div>
  )
}

export default App
