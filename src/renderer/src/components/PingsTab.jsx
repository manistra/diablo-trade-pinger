import { useContext } from 'react'
import DiabloTradePingerContext from '../context'
import useSnoop from '../hooks/useSnoop'
import Ping from './Ping'
import CTAButton from './CTAButton'

const PingsTab = () => {
  const { deleteAllPings, isSnooping, pings } = useContext(DiabloTradePingerContext)
  const { startSnooping, stopSnooping } = useSnoop()

  return (
    <div className="w-2/3 border-diablo-dark border rounded-xl p-6 backdrop-blur bg-black bg-opacity-10">
      <div className="w-full flex flex-row border-diablo-dark justify-between border-b pb-6 items-center h-20">
        <h1 className="font-exo uppercase text-4xl">Pings</h1>

        <div className="flex flex-row gap-5 items-center">
          {isSnooping && (
            <img
              className="w-56 h-56 mb-16"
              src="https://media2.giphy.com/media/Z8AjrStWlMS0WIQqKf/giphy.gif?cid=6c09b952b2x7rnpcvrsksopbkhvtv20xwy0d8qcp0me3zsz8&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
              alt="enter image description here"
            />
          )}

          <button
            className="btn-secondary"
            onClick={() => {
              if (confirm('Are you sure you want to delete all pings?')) deleteAllPings()
            }}
          >
            Clear Pings
          </button>
          {isSnooping ? (
            <CTAButton
              className="w-40 text-nowrap text-3xl uppercase font-bold"
              onClick={() => stopSnooping()}
            >
              Stop
            </CTAButton>
          ) : (
            <CTAButton
              disabled={isSnooping}
              className="w-40 text-nowrap capitalize"
              onClick={() => startSnooping()}
            >
              Start snooping
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
