import { useContext, useState } from 'react'
import logo from './assets/logo.png'
import AddListing from './components/AddListing'
import DiabloTradePingerContext from './context'
import ListingsTab from './components/ListingsTab'
import PingsTab from './components/PingsTab'
import Settings from './components/Settings'
import { openInBrowser } from './utils/openInBrowser'
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
      {(isInfoOpen || isAddListingOpen) && (
        <div className="absolute h-screen w-full bg-black bg-opacity-20 backdrop-blur-sm"></div>
      )}
      {isAddListingOpen && <AddListing close={() => setIsAddListingOpen(false)} />}

      <div
        className={`absolute bottom-0 left-8 transition-all duration-500 ease-out bg-gradient-to-b from-black to-diablo-bg  border border-b-0 border-diablo-dark rounded-t-sm w-[85%] h-[400px] ${!isInfoOpen && 'translate-y-full'}`}
      >
        <div className="relative">
          <button
            className="-ml-[1px] -mb-1px  bg-gradient-to-b from-black to-diablo-bg absolute top-0 -translate-y-full flex flex-row items-center gap-1 font-bold rounded-t-lg border border-diablo-dark border-b-0 py-1 px-3 text-base text-diablo-dark"
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
            {`The loading bar isn't moving? The app isn't working?`}
            <span className="text-diablo ">Click here!</span>
          </button>
          <div className="p-8 text-gray-200 text-base font-sans gap-5 flex flex-col">
            <p className="">
              {`This app scrapes item listings from diablo.trade listing pages. In the background it's`}
              <span className="text-diablo"> using your browser.</span>
            </p>

            <div>
              <h2 className="font-bold text-2xl">How to add a browser path?</h2>
              <p className="pl-7">
                Right-click your internet browsers shortcut, go to Properties - Shortcut tab, and
                copy the path from the Target field into the browser path in settings.
              </p>
              <a
                className="pl-7 underline text-blue-500"
                href="https://github.com/manistra/diablo-trade-pinger/blob/main/README.md#how-to-find-browser-path"
                onClick={(e) => {
                  e.preventDefault()
                  openInBrowser(e.currentTarget.href)
                }}
              >
                Click here for a more in depth guide on how to get browser path
              </a>
            </div>
            <div>
              <h2 className="font-bold text-2xl">
                {`I've set the browser path but this shit still ain't workin'!`}
              </h2>
              <p className="pl-7">
                {`First of all, I'm sorry to hear that. The only fix to this is to try to use another
                browser. Try downloading chrome if you're using something else, also Edge seems to
                always work. And of course, you'll have to get its browser path.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
