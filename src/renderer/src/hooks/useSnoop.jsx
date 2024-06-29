import { useContext } from 'react'
import DiabloTradePingerContext from '../context'
import { snoopForItems } from '../pupeteer'

const useSnoop = () => {
  const { executablePath, handleAddPings, setIsSnooping, listings } =
    useContext(DiabloTradePingerContext)

  const startSnooping = async () => {
    setIsSnooping(true)
    snoopForItems({
      executablePath: executablePath,
      handleAddPings: handleAddPings,
      setIsSnooping: setIsSnooping,
      listings: listings
    })
  }

  return { startSnooping }
}

export default useSnoop
