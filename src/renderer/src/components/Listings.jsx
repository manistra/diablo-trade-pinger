import { useContext, Fragment } from 'react'
import DiabloTradePingerContext from '../context'

const Listings = () => {
  const { listings, deleteListingById } = useContext(DiabloTradePingerContext)

  return (
    <div className="flex flex-col gap-5 overflow-y-scroll h-[92%]">
      {listings.map((listing, index) => (
        <div
          key={index}
          className="bg-diablo-bg p-6 rounded border bg-opacity-85 border-diablo-dark flex items-center flex-row justify-between"
        >
          <div>
            <h2 className="font-exo text-2xl text-diablo mb-2">{listing.equipmentType}</h2>

            <ul>
              {listing.affixes.map((affix, subIndex) => (
                <Fragment key={`${index}-${subIndex}`}>
                  {!!affix?.name && (
                    <li className="flex flex-row gap-4 items-center pl-4">
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

          <button onClick={() => deleteListingById(listing.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-10 text-red-800 hover:text-red-600"
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
