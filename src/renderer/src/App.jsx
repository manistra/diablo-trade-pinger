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
