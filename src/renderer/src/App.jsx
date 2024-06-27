import { useState, useContext } from 'react'
import logo from './assets/logo.png'
import Listings from './components/Listings'
import AddListing from './components/AddListing'
import DiabloTradePingerContext from './context'

function App() {
  const [isAddListingOpen, setIsAddListingOpen] = useState(false)
  const { deleteAllListings } = useContext(DiabloTradePingerContext)

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
        <div className="w-2/3 border-diablo-dark border rounded-xl h-full p-6 backdrop-blur-sm bg-black bg-opacity-10 ">
          <div className="w-full flex flex-row border-diablo-dark justify-between border-b pb-6">
            <h1 className="font-exo uppercase text-4xl">Listings</h1>

            <div className="flex flex-row gap-5">
              <button
                className="btn border-red-800 text-red-800 hover:text-red-600 hover:border-red-600"
                onClick={() => {
                  if (confirm('Are you sure you want to delete all listings?')) deleteAllListings()
                }}
              >
                Delete All Listings
              </button>
              <button className="btn" onClick={() => setIsAddListingOpen(true)}>
                Add Listing
              </button>
            </div>
          </div>

          <div className="p-8 h-full box-border">
            <Listings />
          </div>
        </div>

        <div className="w-1/3 border-diablo-dark border rounded-xl p-2 backdrop-blur-sm bg-black bg-opacity-10"></div>
      </div>

      {isAddListingOpen && <AddListing close={() => setIsAddListingOpen(false)} />}
    </div>
  )
}

export default App
