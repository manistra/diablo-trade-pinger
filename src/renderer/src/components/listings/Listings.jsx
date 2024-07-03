import { useContext, Fragment } from 'react'
import DiabloTradePingerContext from '../../context'
import { formatNumber } from '../../utils/formatNumber'
import { TrashIcon } from '@heroicons/react/24/outline'

const Listings = () => {
  const { listings, deleteListingById, isSnooping } = useContext(DiabloTradePingerContext)

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

          <button
            className="group hover:scale-110 hover:text-diablo transition text-diablo-dark duration-300 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
            onClick={() => deleteListingById(listing.id)}
            disabled={isSnooping}
          >
            <TrashIcon className="size-8" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Listings
