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
      snoop()
      const id = setInterval(snoop, 25000)
      setIntervalId(id)
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
