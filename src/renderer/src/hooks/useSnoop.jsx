import { useContext, useState } from 'react'
import DiabloTradePingerContext from '../context'
import { snoopForItems } from '../pupeteer'

const useSnoop = () => {
  const [intervalId, setIntervalId] = useState(null)

  const { executablePath, handleAddPings, setIsSnooping, isSnooping, listings } =
    useContext(DiabloTradePingerContext)

  const snoop = async () =>
    snoopForItems({
      executablePath: executablePath,
      handleAddPings: handleAddPings,
      listings: listings
    })

  const startSnooping = async () => {
    if (!isSnooping) {
      const id = setInterval(snoop, 15000) // Set your desired interval in milliseconds
      setIntervalId(id)
      setIsSnooping(true)
      setIsSnooping(true)
    }
  }

  const stopSnooping = () => {
    if (isSnooping) {
      clearInterval(intervalId)
      setIntervalId(null)
      setIsSnooping(false)
    }
  }

  return { startSnooping, stopSnooping }
}

export default useSnoop
