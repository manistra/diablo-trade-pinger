import { Fragment } from 'react'
import PropTypes from 'prop-types'
import ga from '../assets/ga.png'
const Ping = ({ ping }) => {
  const openInBrowser = (url) => {
    window.open(url, '_blank')
  }
  return (
    <div className="flex items-center flex-col  w-[274px] h-[479px]">
      <div className="bg-black bg-opacity-30 border border-diablo-bg text-gray-400 border-b-0 rounded rounded-b-none p-2 pb-4 w-full -mb-1 h-[100px] overflow-y-scroll">
        <h2 className="text-sm">{ping.listing.equipmentType}</h2>
        <ul>
          {ping.listing.affixes.map((affix, index) => (
            <Fragment key={index}>
              {!!affix?.name && (
                <li className="flex flex-row gap-3 items-center pl-4 text-xs">
                  <span className="h-1 w-1 rotate-45 border bg-white"></span>
                  <p>{affix.name}</p>
                  <p className="font-exo text-diablo">{affix.minValue}</p>
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

          <div className="flex flex-col gap-3">
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
          className="flex flex-col items-center bg-black bg-opacity-40 p-2 border-diablo-bg border-t"
          href={`https://diablo.trade/listings/items/${ping.diabloTradeId}`}
          onClick={(e) => {
            e.preventDefault()
            openInBrowser(e.currentTarget.href)
          }}
        >
          <span className="uppercase text-sm text-gray-400">{ping.item.offerState}</span>
          <span className="text-diablo-yellow text-lg">{ping.item.price}</span>
        </a>
      </div>
    </div>
  )
}

Ping.propTypes = {
  ping: PropTypes.shape({
    diabloTradeId: PropTypes.string,
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
