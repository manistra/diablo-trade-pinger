import AddListing from './AddListing'

const Listings = () => {
  return (
    <div className="w-2/3 border-diablo-dark border rounded-xl p-6 backdrop-blur-sm bg-black bg-opacity-10 ">
      <div className="w-full flex flex-row border-diablo-dark justify-between border-b pb-6">
        <h1 className="font-exo uppercase text-4xl">Listings</h1>
        <button className="btn">Add Listing</button>
      </div>

      <div className="p-8">
        <AddListing />
      </div>
    </div>
  )
}

export default Listings
