import { useState } from 'react'
import DiabloTradePingerContext from '.'
import PropTypes from 'prop-types'

const DiabloTradePingerContextProvider = ({ children }) => {
  // Add 'children' to props validation
  DiabloTradePingerContextProvider.propTypes = {
    children: PropTypes.node.isRequired
  }
  const [isAddListingOpen, setIsAddListingOpen] = useState(false)
  const [isSnooping, setIsSnooping] = useState(false)

  const existingListings = localStorage.getItem('listings')
  const existingPings = localStorage.getItem('pings')
  const executablePathLocalStorage = JSON.parse(localStorage.getItem('executablePath'))

  const [listings, setListings] = useState(existingListings ? JSON.parse(existingListings) : [])
  const [pings, setPings] = useState(existingPings ? JSON.parse(existingPings) : [])
  const [executablePath, setExecutablePath] = useState(executablePathLocalStorage)

  const handleSetExecutablePath = (value) => {
    setExecutablePath(value)
    localStorage.setItem('executablePath', JSON.stringify(value))
  }

  const handleAddPings = (incomingPings) => {
    const existingIds = pings.map((item) => item.diabloTradeId)
    const newNonDuplicatePings = incomingPings.filter(
      (item) => !existingIds.includes(item.diabloTradeId)
    )

    const newPings = [...pings, ...newNonDuplicatePings]
    setPings(newPings)
    localStorage.setItem('pings', JSON.stringify(newPings))
  }

  const hanldeAddListing = (listing) => {
    const newListing = [...listings, listing]
    setListings(newListing)
    localStorage.setItem('listings', JSON.stringify(newListing))
  }

  const deleteAllListings = () => {
    localStorage.removeItem('listings')
    setListings([])
  }
  const deleteAllPings = () => {
    localStorage.removeItem('pings')
    setPings([])
  }

  const deleteListingById = (id) => {
    const listingsCopy = listings.filter((item) => item.id !== id)

    setListings(listingsCopy)
    localStorage.setItem('listings', JSON.stringify(listingsCopy))
  }

  return (
    <DiabloTradePingerContext.Provider
      value={{
        isAddListingOpen,
        setIsAddListingOpen,

        isSnooping,
        setIsSnooping,

        executablePath,
        handleSetExecutablePath,

        listings,
        hanldeAddListing,
        deleteAllListings,
        deleteListingById,

        pings,
        handleAddPings,
        deleteAllPings
      }}
    >
      {children}
    </DiabloTradePingerContext.Provider>
  )
}

export default DiabloTradePingerContextProvider
