import { useState } from 'react'
import { getRunIntervalMinimum } from '../../utils/getRunIntervalMinimum'
import { getPagesPerRunMaximum } from '../../utils/getPagesPerRunMaximum'

const useSettings = () => {
  const exisingPagesPerRun = JSON.parse(localStorage.getItem('pages-per-run'))
  const exisingRunInterval = JSON.parse(localStorage.getItem('run-interval'))
  const executablePathLocalStorage = JSON.parse(localStorage.getItem('executablePath'))

  const [pagesPerRun, setPagesPerRun] = useState(Number(exisingPagesPerRun) || 4)
  const [runInterval, setRunInterval] = useState(Number(exisingRunInterval) || 60)
  const [executablePath, setExecutablePath] = useState(executablePathLocalStorage)

  const handleSetExecutablePath = (value) => {
    setExecutablePath(value.replace(/"/g, ''))
    localStorage.setItem('executablePath', JSON.stringify(value))
  }

  const handleSetRunInterval = (value) => {
    const runIntervalMin = getRunIntervalMinimum()
    if (value < runIntervalMin) value = runIntervalMin

    setRunInterval(value)
    localStorage.setItem('run-interval', JSON.stringify(value))
  }
  const handleSetPagesPerRun = (value) => {
    const pagesPerRunMax = getPagesPerRunMaximum()

    if (value > pagesPerRunMax) value = pagesPerRunMax
    setPagesPerRun(value)
    localStorage.setItem('pages-per-run', JSON.stringify(value))
  }

  return {
    pagesPerRun,
    handleSetPagesPerRun,

    runInterval,
    handleSetRunInterval,

    executablePath,
    handleSetExecutablePath
  }
}

export default useSettings
