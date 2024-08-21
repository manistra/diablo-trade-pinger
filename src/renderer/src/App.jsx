import { useContext, useState } from 'react'
import logo from './assets/logo.png'
import AddListing from './components/listings/AddListing'
import DiabloTradePingerContext from './context'
import ListingsTab from './components/listings/ListingsTab'
import PingsTab from './components/pings/PingsTab'
import Settings from './components/Settings'
import Help from './components/Help'
import DiscordBanner from './components/DiscordBanner'
import PatchNotes from './components/PatchNotes'
import WelcomeModal from './components/WelcomeModal'
import clsx from 'clsx'

function App() {
  const { isAddListingOpen, setIsAddListingOpen } = useContext(DiabloTradePingerContext)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const godmodeActive = localStorage.getItem('godmode') === 'true'

  return (
    <div className="h-[100vh] w-full flex flex-col items-start justify-start box-content">
      <header className="flex flex-row items-center w-full justify-between h-[15%]">
        <div className="flex flex-row items-center gap-3">
          <img alt="logo" className={clsx('w-28 h-28', godmodeActive && 'burning')} src={logo} />

          <div className="flex flex-col items-center font-exo text-2xl relative">
            <span className="text-5xl text-diablo">DIABLO</span>
            <span>Trade Pinger</span>
            {godmodeActive && (
              <span className="absolute bottom-0 translate-y-7  text-red-950 font-thin z-50 left-0 opacity-65">
                God Mode
              </span>
            )}
          </div>
        </div>
        <DiscordBanner />
      </header>

      <div className="w-full h-[70%] flex flex-row gap-5">
        <ListingsTab />
        <PingsTab />
      </div>
      {isInfoOpen && (
        <div
          className="absolute h-screen w-full bg-black bg-opacity-20 backdrop-blur-sm"
          onClick={() => {
            setIsInfoOpen(false)
            setIsAddListingOpen(false)
          }}
        ></div>
      )}

      {isAddListingOpen && <AddListing close={() => setIsAddListingOpen(false)} />}
      <Help setIsInfoOpen={setIsInfoOpen} isInfoOpen={isInfoOpen} />

      {/* MODALS */}
      <Settings />
      <PatchNotes />
      <WelcomeModal />
    </div>
  )
}

export default App
