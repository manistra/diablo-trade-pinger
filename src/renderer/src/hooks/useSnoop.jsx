import { useContext, useState, useEffect, useRef, useCallback } from 'react'
import DiabloTradePingerContext from '../context'
import { snoopForItems } from '../pupeteer'

const useSnoop = () => {
  const [intervalId, setIntervalId] = useState(null)
  const [ongoingSnoops, setOngoingSnoops] = useState([])
  const [timeLeft, setTimeLeft] = useState(null)

  const timeoutRef = useRef(null)
  const lastExecutionRef = useRef(Date.now())

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

  const handleAddSnoopId = (id) => {
    setOngoingSnoops((prev) => [...prev, id])
  }

  const handleRemoveSnoopId = (id) => {
    setOngoingSnoops((prev) => prev.filter((snoopId) => snoopId !== id))
  }

  const snoop = async () => {
    const operationId = Date.now()
    handleAddSnoopId(operationId)
    try {
      await snoopForItems({
        executablePath: executablePath,
        handleAddPings: handleAddPings,
        listings: listings,
        showBrowser: showBrowser,
        pagesPerRun: pagesPerRun > 6 ? 6 : pagesPerRun,
        setCurrentPage: (value) => setCurrentPage(value)
      })
    } finally {
      handleRemoveSnoopId(operationId)
    }
  }

  const getRunInterval = () => {
    if (!runInterval) return 30000

    let runIntervalToSet = runInterval

    if (Number(runInterval) < 40) runIntervalToSet = 40

    return runIntervalToSet * 1000
  }

  const startSnooping = async () => {
    if (!isSnooping) {
      setIsSnooping(true)
      await snoop()
      const id = setInterval(() => {
        snoop()
        lastExecutionRef.current = Date.now()
      }, getRunInterval(runInterval))
      setIntervalId(id)
      lastExecutionRef.current = Date.now()

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(
        updateTimeLeft,
        getRunInterval(runInterval) - (Date.now() - lastExecutionRef.current)
      )
    }
  }

  const stopSnooping = () => {
    if (isSnooping) {
      clearInterval(intervalId)
      setIntervalId(null)
      setIsSnooping(false)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setTimeLeft(null)
    }
  }

  const updateTimeLeft = useCallback(() => {
    if (!intervalId) return
    const timePassed = Date.now() - lastExecutionRef.current
    const interval = getRunInterval(runInterval)
    const timeLeftUntilNextExecution = interval - timePassed
    setTimeLeft(
      timeLeftUntilNextExecution > 0
        ? Math.round(timeLeftUntilNextExecution / 1000)
        : Math.round(interval / 1000)
    )

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(updateTimeLeft, 1000)
  }, [intervalId, runInterval])

  useEffect(() => {
    if (intervalId) {
      updateTimeLeft()
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [intervalId, updateTimeLeft])

  return { startSnooping, stopSnooping, ongoingSnoops, timeLeft }
}

export default useSnoop
