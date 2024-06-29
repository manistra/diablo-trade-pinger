import { useContext } from 'react'
import logo from './assets/logo.png'
import AddListing from './components/AddListing'
import DiabloTradePingerContext from './context'
import ListingsTab from './components/ListingsTab'
import PingsTab from './components/PingsTab'
import Settings from './components/Settings'

function App() {
  const { isAddListingOpen, isSnooping, setIsAddListingOpen } = useContext(DiabloTradePingerContext)

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

        {isSnooping && (
          <img
            className="w-56 h-56 -mb-10 -m-20 -mr-5"
            src="https://media2.giphy.com/media/Z8AjrStWlMS0WIQqKf/giphy.gif?cid=6c09b952b2x7rnpcvrsksopbkhvtv20xwy0d8qcp0me3zsz8&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
            alt="enter image description here"
          />
        )}

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
    </div>
  )
}

export default App
