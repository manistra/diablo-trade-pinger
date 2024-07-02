import { useContext, useState } from 'react'
import logo from './assets/logo.png'
import AddListing from './components/AddListing'
import DiabloTradePingerContext from './context'
import ListingsTab from './components/ListingsTab'
import PingsTab from './components/PingsTab'
import Settings from './components/Settings'
import Info from './components/Info'

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
