import { useContext, useState } from 'react'
import logo from './assets/logo.png'
import discord from './assets/discord.png'
import AddListing from './components/AddListing'
import DiabloTradePingerContext from './context'
import ListingsTab from './components/ListingsTab'
import PingsTab from './components/PingsTab'
import Settings from './components/Settings'
import Info from './components/Info'
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

        <a
          className="absolute bottom-3 left-1/2 -translate-x-1/2 border border-diablo-dark rounded p-4 bg-black-blur w-72 flex flex-row gap-5 items-center opacity-50 hover:opacity-100 transition-all duration-200 cursor-pointer"
          href="https://discord.gg/QVDgUQMSqB"
          onClick={(e) => {
            e.preventDefault()
            openInBrowser(e.currentTarget.href)
          }}
        >
          <div>
            <img alt="logo" className="w-12" src={discord} />
          </div>
          <div className="w-48 text-xs">
            Click here to join our discord and help us out with{' '}
            <strong className="text-diablo">suggestions</strong> and{' '}
            <strong className="text-diablo">bug reports</strong>.
          </div>
        </a>
        <Settings />
      </header>

      <div className="w-full h-[70%] flex flex-row gap-5">
        <ListingsTab />
        <PingsTab />
      </div>
      {(isInfoOpen || isAddListingOpen) && (
        <div
          className="absolute h-screen w-full bg-black bg-opacity-20 backdrop-blur-sm"
          onClick={() => {
            setIsInfoOpen(false)
            setIsAddListingOpen(false)
          }}
        ></div>
      )}
      {isAddListingOpen && <AddListing close={() => setIsAddListingOpen(false)} />}
      <Info setIsInfoOpen={setIsInfoOpen} isInfoOpen={isInfoOpen} />
    </div>
  )
}

export default App
