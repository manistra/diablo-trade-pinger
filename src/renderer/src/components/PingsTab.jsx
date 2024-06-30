import { useContext, useEffect, useState } from 'react'
import DiabloTradePingerContext from '../context'
import useSnoop from '../hooks/useSnoop'
import Ping from './Ping'
import CTAButton from './CTAButton'

const PingsTab = () => {
  const [runCount, setRunCount] = useState(1)
  const { deleteAllPings, isSnooping, pings, currentPage, pagesPerRun } =
    useContext(DiabloTradePingerContext)
  const { startSnooping, stopSnooping } = useSnoop()

  const getLoadingBarWidth = () => {
    const width = (Number(currentPage) / Number(pagesPerRun)) * 100
    return `${width}%`
  }

  useEffect(() => {
    if (!isSnooping) return setRunCount(1)
    if (Number(currentPage) === Number(pagesPerRun)) setRunCount(runCount + 1)
  }, [currentPage, pagesPerRun, isSnooping])

  return (
    <div className="w-2/3 border-diablo-dark border rounded p-6 backdrop-blur bg-black bg-opacity-10">
      <div className="w-full flex flex-row border-diablo-dark justify-between border-b pb-6 items-center h-20">
        <h1 className="font-exo uppercase text-4xl">Pings</h1>

        {isSnooping && (
          <div>
            <div className="flex flex-row gap-5 items-center text-[10px] justify-center text-diablo">
              <span>
                <span className="text-gray-500">Runs:</span> {runCount}
              </span>
              <span>
                <span className="text-gray-500">Listings Page:</span> [{currentPage}/{pagesPerRun}]
              </span>
            </div>
            <div className="w-[400px] h-[15px] border border-diablo-bg">
              <div
                className="h-full bg-gradient-to-r from-red-900 to-diablo transition-all duration-500 shadow-orange-900 shadow-lg ease-out flex items-center justify-center"
                style={{ width: getLoadingBarWidth() }}
              >
                {Number(currentPage) === Number(pagesPerRun) && (
                  <p className="text-black text-[10px] font-bold uppercase">Waiting for next run</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-row gap-5 items-center">
          <button
            className="btn-secondary"
            onClick={() => {
              if (confirm('Are you sure you want to delete all pings?')) deleteAllPings()
            }}
          >
            Clear Pings
          </button>
          {isSnooping ? (
            <CTAButton className="w-40" onClick={() => stopSnooping()}>
              Stop
            </CTAButton>
          ) : (
            <CTAButton disabled={isSnooping} className="w-40" onClick={() => startSnooping()}>
              Start
            </CTAButton>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-5 overflow-y-scroll scrollbar h-[88%] py-6">
        {pings.map((ping) => (
          <Ping ping={ping} key={ping.diabloTradeId} />
        ))}
      </div>
    </div>
  )
}
export default PingsTab
