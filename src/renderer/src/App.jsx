import logo from './assets/logo.png'
import Listings from './components/Listings'

function App() {
  // const logInfo = (message) => {
  //   setInfo(message)
  // }

  // const handleClick = async () => {
  //   setIsBumping(true)
  //   await bumpDiabloTradeAllItems({
  //     executablePath: executablePath,
  //     logInfo: logInfo
  //   })
  //   setIsBumping(false)
  // }

  return (
    <div className="h-[100vh] w-full flex flex-col items-start justify-start box-content">
      <header className="flex flex-row items-center justify-center gap-3 h-[15%]">
        <img alt="logo" className="w-28 h-28" src={logo} />

        <div className="flex flex-col items-center font-exo text-2xl">
          <span className="text-5xl text-diablo">DIABLO</span>
          <span>Trade Pinger</span>
        </div>
      </header>

      <div className="w-full h-[80%] flex flex-row gap-5">
        <Listings />

        <div className="w-1/3 border-diablo-dark border rounded-xl p-2 backdrop-blur-sm bg-black bg-opacity-10"></div>
      </div>
    </div>
  )
}

export default App
