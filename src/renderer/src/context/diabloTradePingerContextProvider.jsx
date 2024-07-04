import { useState } from 'react'
import DiabloTradePingerContext from '.'
import PropTypes from 'prop-types'
import useListings from './hooks/useListings'
import usePings from './hooks/usePings'
import useSettings from './hooks/useSettings'
import useInformationModals from './hooks/useInformationModals'

const DiabloTradePingerContextProvider = ({ children }) => {
  const [isSnooping, setIsSnooping] = useState(false)
  const [showBrowser, setShowBrowser] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const {
    listings,
    isAddListingOpen,
    setIsAddListingOpen,
    hanldeAddListing,
    deleteAllListings,
    deleteListingById
  } = useListings()

  const { pings, handleAddPings, deleteAllPings, deletePingById } = usePings()
  const { patchNotesOpen, handleSetPatchNotesOpen, welcomeModalOpen, handleSetWelcomeModalOpen } =
    useInformationModals()
  const {
    pagesPerRun,
    runInterval,
    executablePath,
    handleSetPagesPerRun,
    handleSetRunInterval,
    handleSetExecutablePath
  } = useSettings()

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

        patchNotesOpen,
        handleSetPatchNotesOpen,
        welcomeModalOpen,
        handleSetWelcomeModalOpen,

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

DiabloTradePingerContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default DiabloTradePingerContextProvider
