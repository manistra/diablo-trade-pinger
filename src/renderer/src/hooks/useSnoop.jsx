import { useContext, useState, useEffect } from 'react'
import DiabloTradePingerContext from '../context'
import { snoopForItems } from '../pupeteer'
import { withTimeout } from '../utils/withTimeout'

const useSnoop = () => {
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

  const [ongoingSnoops, setOngoingSnoops] = useState([])
  const [countdown, setCountdown] = useState(runInterval)

  const handleAddSnoopId = (id) => {
    setOngoingSnoops((prev) => [...prev, id])
  }

  const handleRemoveSnoopId = (id) => {
    setOngoingSnoops((prev) => prev.filter((snoopId) => snoopId !== id))
  }

  const stopSnooping = () => {
    setIsSnooping(false)
  }

  const startSnooping = () => {
    setIsSnooping(true)
  }

  const snoop = async () => {
    const operationId = Date.now()
    handleAddSnoopId(operationId)
    try {
      await snoopForItems({
        executablePath: executablePath,
        handleAddPings: handleAddPings,
        listings: listings,
        showBrowser: !showBrowser,
        pagesPerRun: pagesPerRun > 6 ? 6 : pagesPerRun,
        setCurrentPage: (value) => setCurrentPage(value)
      })
    } finally {
      handleRemoveSnoopId(operationId)
    }
  }

  useEffect(() => {
    let isCancelled = false

    const runTask = async () => {
      while (isSnooping && !isCancelled) {
        setCountdown(runInterval)
        await withTimeout(snoop(), 30000, 'Waiting for snoop() timed out')
        if (!isCancelled) {
          for (let i = runInterval; i > 0; i--) {
            setCountdown(i)
            await new Promise((resolve) => setTimeout(resolve, 1000)) // Update countdown every second
          }
        }
      }
    }

    if (isSnooping) {
      runTask()
    }

    return () => {
      isCancelled = true
    }
  }, [isSnooping])

  return { startSnooping, stopSnooping, ongoingSnoops, countdown }
}

export default useSnoop
