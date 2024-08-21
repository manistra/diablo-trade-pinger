import { useContext, useEffect, useState } from 'react'
import DiabloTradePingerContext from '../../context'
import useSnoop from '../../hooks/useSnoop'
import Ping from './Ping'
import CTAButton from '../CTAButton'

const PingsTab = () => {
  const [runCount, setRunCount] = useState(0)
  const [startButtonDisabledTime, setStartButtonDisabledTime] = useState(null)
  const { deleteAllPings, isSnooping, pings, currentPage, runInterval, pagesPerRun, listings } =
    useContext(DiabloTradePingerContext)
  const { startSnooping, stopSnooping, ongoingSnoops, countdown } = useSnoop()

  const getLoadingBarWidth = () => {
    const width = (Number(currentPage) / Number(pagesPerRun)) * 100
    return `${width}%`
  }

  const handleStartSnooping = () => {
    setStartButtonDisabledTime(Number(runInterval))
    startSnooping()

    const countdownInterval = setInterval(() => {
      setStartButtonDisabledTime((prevTimeLeft) => prevTimeLeft - 1)
    }, 1000)

    setTimeout(() => {
      clearInterval(countdownInterval)
      setStartButtonDisabledTime(null)
    }, runInterval * 1000)
  }

  useEffect(() => {
    if (!isSnooping) return setRunCount(0)
    if (Number(currentPage) === Number(pagesPerRun)) setRunCount(runCount + 1)
  }, [currentPage, pagesPerRun, isSnooping])

  return (
    <div className="w-2/3 border-diablo-dark border rounded p-6 bg-black-blur">
      <div className="w-full flex flex-row border-diablo-dark justify-between border-b pb-6 items-center h-20">
        <h1 className="font-exo uppercase text-4xl">Pings</h1>

        {(isSnooping || !!ongoingSnoops.length) && (
          <div>
            <div className="flex flex-row gap-3 items-center text-[10px] text-diablo mb-[2px]">
              <p>
                <span className="text-gray-500">Completed Runs:</span> {runCount}
              </p>

              <p>
                <span className="text-gray-500">Listing Page:</span> [{currentPage}/{pagesPerRun}]
              </p>
              {Number(currentPage) === Number(pagesPerRun) &&
                countdown &&
                countdown !== runInterval && (
                  <p className="flex flex-row items-center text-[10px] justify-center text-diablo">
                    <span className="text-gray-500">Seconds until next run: </span>
                    {countdown}
                  </p>
                )}
            </div>
            <div className="w-[400px] h-[15px] border border-diablo-dark">
              <div
                className="h-full bg-gradient-to-r from-red-900 to-diablo transition-all duration-500 shadow-orange-900 shadow-lg ease-out flex items-center justify-center"
                style={{ width: getLoadingBarWidth() }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex flex-row gap-5 items-center">
          <button
            disabled={pings.length < 1}
            className="btn-secondary"
            onClick={() => {
              if (confirm('Are you sure you want to delete all pings?')) deleteAllPings()
            }}
          >
            Clear Pings
          </button>
          {isSnooping || !!ongoingSnoops.length ? (
            <CTAButton
              className="w-40"
              onClick={() => stopSnooping()}
              disabled={!isSnooping && !!ongoingSnoops.length}
            >
              {!isSnooping && !!ongoingSnoops.length ? 'Stopping' : 'Stop'}
            </CTAButton>
          ) : (
            <div className="relative">
              <CTAButton
                disabled={isSnooping || listings.length < 1 || !!startButtonDisabledTime}
                className="w-40"
                onClick={handleStartSnooping}
              >
                Start
              </CTAButton>

              {startButtonDisabledTime && (
                <p className="absolute bottom-0 left-0 translate-y-full text-xs text-gray-500">
                  Please wait {startButtonDisabledTime} more seconds
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-5 overflow-y-scroll scrollbar h-[88%] py-6 p-1">
        {pings.map((ping) => (
          <Ping ping={ping} key={ping.diabloTradeId} />
        ))}
      </div>
    </div>
  )
}
export default PingsTab
