import { useContext, useState } from 'react'
import logo from './assets/logo.png'
import AddListing from './components/AddListing'
import DiabloTradePingerContext from './context'
import ListingsTab from './components/ListingsTab'
import PingsTab from './components/PingsTab'
import Settings from './components/Settings'

function App() {
  const { isAddListingOpen, setIsAddListingOpen } = useContext(DiabloTradePingerContext)
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  return (
    <div className="h-[100vh] w-full flex flex-col items-start justify-start box-content">
      <header className="flex flex-row items-center w-full justify-between h-[15%]">
        <div className="flex flex-row items-center gap-3">
          <img alt="logo" className="w-28 h-28" src={logo} />
          <div className="flex flex-col items-center font-exo text-2xl">
            <span className="text-5xl text-diablo">DIABLO</span>
            <span>Trade Pinger</span>
          </div>
        </div>

        <Settings />
      </header>
      <div className="w-full h-[70%] flex flex-row gap-5">
        <ListingsTab />
        <PingsTab />
      </div>
      {isAddListingOpen && (
        <>
          <div className="absolute h-screen w-full bg-black bg-opacity-20 backdrop-blur-sm"></div>
          <AddListing close={() => setIsAddListingOpen(false)} />
        </>
      )}

      <div
        className={`absolute bottom-0 left-8 transition-all duration-500 ease-out bg-black-blur border border-b-0 border-diablo-dark rounded-t-sm w-[85%] h-[65px] ${!isInfoOpen && 'translate-y-full'}`}
      >
        <div className="relative">
          <button
            className="-ml-[1px] -mb-1px  bg-gradient-to-b from-diablo-bg to-black absolute top-0 -translate-y-full flex flex-row items-center gap-1 font-bold rounded-t-lg border border-diablo-dark border-b-0 py-1 px-3 bg-black-blur text-xs text-diablo"
            onClick={() => setIsInfoOpen(!isInfoOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className={`size-3 ${isInfoOpen && 'rotate-180 transition duration-500 ease-in'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>
            Info
          </button>

          <p className="p-3 text-gray-200 text-sm font-sans">
            {`This app scrapes item listings from diablo.trade pages. It checks all items on the first X
          pages with a Y-second delay between runs. Both X and Y are adjustable in the settings. The
          browser path should be set by default. If the loading bar isn't moving when you hit "START", right-click your browsers
          shortcut, go to Properties - Shortcut tab, and copy the path from the Target
          field into the browser path in settings.`}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
