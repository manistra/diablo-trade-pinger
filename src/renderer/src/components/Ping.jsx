import { Fragment } from 'react'
import PropTypes from 'prop-types'

const Ping = ({ key, ping }) => {
  const openInBrowser = (url) => {
    window.open(url, '_blank')
  }
  return (
    <a
      href={`https://diablo.trade/listings/items/${ping.diabloTradeId}`}
      key={key}
      className="bg-diablo-bg p-6 rounded border bg-opacity-85 border-diablo-dark flex items-center flex-row justify-between item-bg w-[274px] h-[290px]"
      onClick={(e) => {
        e.preventDefault()
        openInBrowser(e.currentTarget.href)
      }}
    >
      <div>
        <h2 className="font-exo text-xl text-diablo mb-2">{ping.equipmentType}</h2>

        <ul>
          {ping.affixes.map((affix, subIndex) => (
            <Fragment key={`${key}-${subIndex}`}>
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
  )
}

Ping.propTypes = {
  key: PropTypes.number.isRequired,
  ping: PropTypes.shape({
    diabloTradeId: PropTypes.string.isRequired,
    equipmentType: PropTypes.string.isRequired,
    affixes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        minValue: PropTypes.number
      })
    )
  }).isRequired
}

export default Ping
