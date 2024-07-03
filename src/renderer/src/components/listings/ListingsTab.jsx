import { useContext } from 'react'
import Listings from './Listings'
import DiabloTradePingerContext from '../../context'

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
          <button
            className="font-exo text-4xl text-white bg-diablo rounded-sm px-1 opacity-80 hover:opacity-100 text-nowrap font-bold disabled:opacity-30 disabled:cursor-not-allowed text-outline"
            onClick={() => setIsAddListingOpen(true)}
            disabled={isSnooping}
          >
            t
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
