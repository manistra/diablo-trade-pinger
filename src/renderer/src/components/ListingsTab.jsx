import { useContext } from 'react'
import Listings from './Listings'
import DiabloTradePingerContext from '../context'

const ListingsTab = () => {
  const { deleteAllListings, setIsAddListingOpen } = useContext(DiabloTradePingerContext)

  return (
    <div className="w-1/3 border-diablo-dark border rounded-xl h-full p-6 backdrop-blur bg-black bg-opacity-10 ">
      <div className="w-full flex flex-row border-diablo-dark justify-between border-b pb-6">
        <h1 className="font-exo uppercase text-4xl">Listings</h1>

        <div className="flex flex-row gap-5">
          <button
            className="btn border-red-800 text-red-800 hover:text-red-600 hover:border-red-600"
            onClick={() => {
              if (confirm('Are you sure you want to delete all listings?')) deleteAllListings()
            }}
          >
            Clear Listings
          </button>
          <button
            className="btn border-diablo opacity-80 text-diablo hover:opacity-100"
            onClick={() => setIsAddListingOpen(true)}
          >
            Add Listing
          </button>
        </div>
      </div>

      <div className="p-8 h-full box-border">
        <Listings />
      </div>
    </div>
  )
}

export default ListingsTab
