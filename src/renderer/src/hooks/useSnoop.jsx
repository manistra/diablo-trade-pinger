import { useContext, useState } from 'react'
import DiabloTradePingerContext from '../context'
import { snoopForItems } from '../pupeteer'

const useSnoop = () => {
  const [intervalId, setIntervalId] = useState(null)

  const {
    executablePath,
    handleAddPings,
    setIsSnooping,
    isSnooping,
    listings,
    showBrowser,
    pagesPerRun,
    setCurrentPage,
    runInterval
  } = useContext(DiabloTradePingerContext)

  const snoop = async () => {
    snoopForItems({
      executablePath: executablePath,
      handleAddPings: handleAddPings,
      listings: listings,
      showBrowser: showBrowser,
      pagesPerRun: pagesPerRun,
      setCurrentPage: (value) => setCurrentPage(value)
    })
  }

  const startSnooping = async () => {
    if (!isSnooping) {
      await snoop()
      const id = setInterval(snoop, runInterval ? Number(runInterval) * 1000 : 30000)
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
