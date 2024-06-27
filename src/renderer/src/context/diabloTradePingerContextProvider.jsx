import { useState } from 'react'
import DiabloTradePingerContext from '.'
import PropTypes from 'prop-types'

const DiabloTradePingerContextProvider = ({ children }) => {
  // Add 'children' to props validation
  DiabloTradePingerContextProvider.propTypes = {
    children: PropTypes.node.isRequired
  }
  const existingListings = localStorage.getItem('listings')

  const [listings, setListings] = useState(existingListings ? JSON.parse(existingListings) : [])

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

  return (
    <DiabloTradePingerContext.Provider
      value={{
        listings,
        hanldeAddListing,
        deleteAllListings,
        deleteListingById
      }}
    >
      {children}
    </DiabloTradePingerContext.Provider>
  )
}

export default DiabloTradePingerContextProvider
