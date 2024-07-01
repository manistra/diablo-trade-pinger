import { useContext } from 'react'
import Listings from './Listings'
import DiabloTradePingerContext from '../context'

const ListingsTab = () => {
  const { deleteAllListings, setIsAddListingOpen, isSnooping, listings } =
    useContext(DiabloTradePingerContext)

  return (
    <div className="w-1/3 border-diablo-dark border rounded h-full p-6 bg-black-blur">
      <div className="w-full flex flex-row border-diablo-dark justify-between border-b pb-6 h-20 items-center">
        <h1 className="font-exo uppercase text-4xl">Listings</h1>

        <div className="flex flex-row gap-5">
          <button
            disabled={isSnooping || !listings.length}
            className="btn-secondary"
            onClick={() => {
              if (confirm('Are you sure you want to delete all listings?')) deleteAllListings()
            }}
          >
            Clear Listings
          </button>
          <button className="btn-primary" onClick={() => setIsAddListingOpen(true)}>
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
