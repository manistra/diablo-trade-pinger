import { useState } from 'react'

const useListings = () => {
  const existingListings = localStorage.getItem('listings')
  const [listings, setListings] = useState(existingListings ? JSON.parse(existingListings) : [])
  const [isAddListingOpen, setIsAddListingOpen] = useState(false)

  const hanldeAddListing = (listing) => {
    const newListing = [...listings, listing]
    setListings(newListing)
    localStorage.setItem('listings', JSON.stringify(newListing))
  }

  const deleteAllListings = () => {
    localStorage.removeItem('listings')
    setListings([])
  }

  const deleteListingById = (id) => {
    const listingsCopy = listings.filter((item) => item.id !== id)

    setListings(listingsCopy)
    localStorage.setItem('listings', JSON.stringify(listingsCopy))
  }
  return {
    listings,
    isAddListingOpen,
    setIsAddListingOpen,
    hanldeAddListing,
    deleteAllListings,
    deleteListingById
  }
}

export default useListings
