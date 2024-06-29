import { useContext } from 'react'
import DiabloTradePingerContext from '../context'
import useSnoop from '../hooks/useSnoop'
import Ping from './Ping'

const PingsTab = () => {
  const { deleteAllPings, isSnooping, pings } = useContext(DiabloTradePingerContext)
  const { startSnooping, stopSnooping } = useSnoop()

  return (
    <div className="w-2/3 border-diablo-dark border rounded-xl p-6 backdrop-blur bg-black bg-opacity-10">
      <div className="w-full flex flex-row border-diablo-dark justify-between border-b pb-6">
        <h1 className="font-exo uppercase text-4xl">Pings</h1>

        <div className="flex flex-row gap-5">
          <button
            className="btn border-red-800 text-red-800 hover:text-red-600 hover:border-red-600"
            onClick={() => {
              if (confirm('Are you sure you want to delete all pings?')) deleteAllPings()
            }}
          >
            Clear
          </button>
          {isSnooping ? (
            <button disabled={!isSnooping} className="btn" onClick={() => stopSnooping()}>
              Stop
            </button>
          ) : (
            <button disabled={isSnooping} className="btn" onClick={() => startSnooping()}>
              Start snooping
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-5 overflow-y-scroll h-[92%] py-6">
        {pings.map((ping, index) => (
          <Ping ping={ping} key={index} />
        ))}
      </div>
    </div>
  )
}
export default PingsTab
