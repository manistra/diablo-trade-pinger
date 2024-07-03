import { Fragment, useContext, useState, useEffect } from 'react'
import DiabloTradePingerContext from '../../context'
import PropTypes from 'prop-types'
import ga from '../../assets/ga.png'
import { getTimeDifferenceText } from '../../utils/getTimeDifferenceText'
import { openInBrowser } from '../../utils/openInBrowser'
const Ping = ({ ping }) => {
  const { deletePingById } = useContext(DiabloTradePingerContext)
  const [isClicked, setIsClicked] = useState(false)
  const [timeText, setTimeText] = useState(getTimeDifferenceText(ping.createdAt))

  const updateText = (text) => {
    setTimeText(getTimeDifferenceText(text))
  }

  useEffect(() => {
    updateText(ping.createdAt)
    const intervalId = setInterval(() => updateText(ping.createdAt), 60000)
    return () => clearInterval(intervalId)
  }, [ping.createdAt])

  return (
    <div
      className="flex items-center flex-col w-[274px] h-[450px] border border-diablo-bg"
      style={{ opacity: isClicked ? '60%' : '100%' }}
    >
      <div className="bg-black bg-opacity-30 border border-diablo-bg text-gray-400 border-b-0 rounded rounded-b-none p-2 pb-4 w-full -mb-1 h-[100px] overflow-y-scroll scrollbar relative">
        <button
          className="group absolute top-1 right-1 p-1"
          onClick={() => deletePingById(ping.diabloTradeId)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-5  group-hover:scale-110 group-hover:rotate-90 duration-300 group-hover:text-white transition text-gray-400 cursor-pointer"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-sm">{ping.listing.equipmentType}</h2>
        <ul>
          {ping.listing.affixes.map((affix, index) => (
            <Fragment key={index}>
              {!!affix?.name && (
                <li className="flex flex-row gap-3 items-center pl-4 text-xs capitalize">
                  <span className="h-1 w-1 rotate-45 border bg-white"></span>
                  <p>{affix.name}</p>
                  <p className="font-exo text-diablo"> {'>= ' + affix.minValue}</p>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </div>

      <div className="text-xs whitespace-pre-line break-words flex justify-between flex-col item-bg w-full h-[379px]">
        <div className="flex flex-col gap-4 px-7 pt-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              {ping.item.affixes.map((affix, index) => (
                <Fragment key={index}>
                  {affix.isGreaterAffix && <img alt="ga" className="w-5 h-5" src={ga} />}
                </Fragment>
              ))}
            </div>

            <h2 className="capitalize text-[15px] text-diablo font-bold">
              Ancestral Lengedary {ping.listing.equipmentType}
            </h2>
          </div>

          <hr className="border-diablo-dark" />

          <div className="flex flex-col gap-3 capitalize text-[11px]">
            {ping.item.affixes.map((affix, subIndex) => (
              <div key={subIndex} className="flex flex-row items-center gap-2">
                <div className="w-5 -ml-4 flex items-center justify-center">
                  {affix.isGreaterAffix ? (
                    <img alt="ga" className="w-4 h-4" src={ga} />
                  ) : (
                    <span className="h-1.5 w-1.5 rotate-45 border bg-gray-500"></span>
                  )}
                </div>

                <span>{affix.value}</span>
              </div>
            ))}
          </div>
        </div>

        <a
          className={`flex flex-col items-center bg-black bg-opacity-40 p-5 border-diablo-bg border-t hover:bg-opacity-60 ease-linear transition duration-800${timeText.includes('Less than') && ' glow'}`}
          href={`https://diablo.trade/listings/items/${ping.diabloTradeId}`}
          onClick={(e) => {
            setIsClicked(true)
            e.preventDefault()
            openInBrowser(e.currentTarget.href)
          }}
        >
          <span className="uppercase text-sm text-gray-400">{ping.item.offerState}</span>
          <span className="text-diablo-yellow text-lg">{ping.item.price}</span>
          <span className="text-gray-600 text-xs">{timeText}</span>
        </a>
      </div>
    </div>
  )
}

Ping.propTypes = {
  ping: PropTypes.shape({
    diabloTradeId: PropTypes.string,
    createdAt: PropTypes.string,
    listing: PropTypes.shape({
      equipmentType: PropTypes.string,
      affixes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          minValue: PropTypes.number
        })
      )
    }),
    item: PropTypes.shape({
      offerState: PropTypes.string,
      listedTime: PropTypes.string,
      price: PropTypes.string,
      affixes: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string
        })
      )
    })
  })
}

export default Ping
