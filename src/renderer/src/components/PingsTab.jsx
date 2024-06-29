import { useContext, Fragment } from 'react'
import DiabloTradePingerContext from '../context'
import useSnoop from '../hooks/useSnoop'

const PingsTab = () => {
  const { deleteAllPings, isSnooping, pings } = useContext(DiabloTradePingerContext)
  const { startSnooping } = useSnoop()

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
            Delete All Pings
          </button>
          <button disabled={isSnooping} className="btn" onClick={() => startSnooping()}>
            Start snooping
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 overflow-y-scroll h-[92%]">
        {pings.map((ping, index) => (
          <a
            href={`https://diablo.trade/listings/items/${ping.diabloTradeId}`}
            key={index}
            className="bg-diablo-bg p-6 rounded border bg-opacity-85 border-diablo-dark flex items-center flex-row justify-between"
          >
            <div>
              <h2 className="font-exo text-xl text-diablo mb-2">{ping.equipmentType}</h2>

              <ul>
                {ping.affixes.map((affix, subIndex) => (
                  <Fragment key={`${index}-${subIndex}`}>
                    {!!affix?.name && (
                      <li className="flex flex-row gap-2 text-sm items-center pl-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="text-diablo size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>

                        <p>{affix.name}</p>
                        <p className="font-exo text-xl text-diablo">{affix.minValue}</p>
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default PingsTab
