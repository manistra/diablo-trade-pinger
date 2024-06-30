import { useState } from 'react'
import DiabloTradePingerContext from '.'
import PropTypes from 'prop-types'
const notifier = require('node-notifier')
const path = require('path')

const DiabloTradePingerContextProvider = ({ children }) => {
  // Add 'children' to props validation
  DiabloTradePingerContextProvider.propTypes = {
    children: PropTypes.node.isRequired
  }
  const existingListings = localStorage.getItem('listings')
  const existingPings = localStorage.getItem('pings')
  const executablePathLocalStorage = JSON.parse(localStorage.getItem('executablePath'))
  const exisingRunInterval = JSON.parse(localStorage.getItem('run-interval'))
  const exisingPagesPerRun = JSON.parse(localStorage.getItem('pages-per-run'))

  const [isAddListingOpen, setIsAddListingOpen] = useState(false)
  const [isSnooping, setIsSnooping] = useState(false)
  const [showBrowser, setShowBrowser] = useState(false)
  const [pagesPerRun, setPagesPerRun] = useState(Number(exisingPagesPerRun) || 10)
  const [runInterval, setRunInterval] = useState(Number(exisingRunInterval) || 30)
  const [listings, setListings] = useState(existingListings ? JSON.parse(existingListings) : [])
  const [pings, setPings] = useState(existingPings ? JSON.parse(existingPings) : [])
  const [executablePath, setExecutablePath] = useState(executablePathLocalStorage)
  const [currentPage, setCurrentPage] = useState(0)

  const handleSetExecutablePath = (value) => {
    setExecutablePath(value)
    localStorage.setItem('executablePath', JSON.stringify(value))
  }

  const handleAddPings = (incomingPings) => {
    const existingPingsLocalStorage = localStorage.getItem('pings')
    const existingPings = existingPingsLocalStorage ? JSON.parse(existingPingsLocalStorage) : []

    const existingIds = existingPings.map((item) => item.diabloTradeId)

    const newNonDuplicatePings = incomingPings.filter(
      (item) => !existingIds.includes(item.diabloTradeId)
    )

    if (newNonDuplicatePings.length > 0)
      notifier.notify({
        title: `${newNonDuplicatePings.length} New Items Found!`,
        message: 'Items found, come check them out!',
        sound: true,
        icon: path.join(__dirname, '../assets/logo.png'),
        wait: true
      })

    const newPings = [...newNonDuplicatePings, ...existingPings]
    setPings(newPings)
    localStorage.setItem('pings', JSON.stringify(newPings))
  }

  const deleteAllPings = () => {
    localStorage.removeItem('pings')
    setPings([])
  }

  const deletePingById = (id) => {
    const pingsCopy = pings.filter((item) => item.diabloTradeId !== id)

    setPings(pingsCopy)
    localStorage.setItem('pings', JSON.stringify(pingsCopy))
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

  const deleteListingById = (id) => {
    const listingsCopy = listings.filter((item) => item.id !== id)

    setListings(listingsCopy)
    localStorage.setItem('listings', JSON.stringify(listingsCopy))
  }
  const handleSetRunInterval = (value) => {
    setRunInterval(value)
    localStorage.setItem('run-interval', JSON.stringify(value))
  }
  const handleSetPagesPerRun = (value) => {
    setPagesPerRun(value)
    localStorage.setItem('pages-per-run', JSON.stringify(value))
  }

  return (
    <DiabloTradePingerContext.Provider
      value={{
        showBrowser,
        setShowBrowser,

        isAddListingOpen,
        setIsAddListingOpen,

        currentPage,
        setCurrentPage,

        pagesPerRun,
        handleSetPagesPerRun,
        runInterval,
        handleSetRunInterval,

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
        deleteAllPings,
        deletePingById
      }}
    >
      {children}
    </DiabloTradePingerContext.Provider>
  )
}

export default DiabloTradePingerContextProvider
