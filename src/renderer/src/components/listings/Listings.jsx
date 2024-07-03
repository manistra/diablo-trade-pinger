import { useContext, Fragment } from 'react'
import DiabloTradePingerContext from '../../context'
import { formatNumber } from '../../utils/formatNumber'
const Listings = () => {
  const { listings, deleteListingById } = useContext(DiabloTradePingerContext)

  return (
    <div className="flex flex-col gap-5 overflow-y-scroll scrollbar h-[92%]">
      {listings.map((listing, index) => (
        <div
          key={index}
          className="p-6 bg-black bg-opacity-50 border border-diablo-bg  flex items-center flex-row justify-between"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-xl ">{listing.equipmentType}:</h2>

            {listing.maxPrice > 0 && (
              <p className="flex flex-row gap-2 text-xs">
                Max b/o:
                <span className="text-diablo">{formatNumber(listing.maxPrice)}</span>
              </p>
            )}

            <ul>
              {listing.affixes.map((affix, subIndex) => (
                <Fragment key={`${index}-${subIndex}`}>
                  {!!affix?.name && (
                    <li className="flex flex-row gap-4 items-center pl-4">
                      <span className="h-1 w-1 rotate-45 border bg-white"></span>

                      <p>{affix.name}</p>
                      {affix.minValue > 0 && (
                        <p className="font-exo text-xl text-diablo">{'>= ' + affix.minValue}</p>
                      )}
                    </li>
                  )}
                </Fragment>
              ))}
            </ul>
          </div>

          <button className="group" onClick={() => deleteListingById(listing.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8 group-hover:scale-110 duration-300 group-hover:text-diablo transition text-diablo-dark cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Listings
