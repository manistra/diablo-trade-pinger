import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../form/Dropdown'
import { equipmentOptions, AFFIX_OPTIONS } from '../../data'
import Modal from '../modal/Modal'
import Input from '../form/Input'
import GaCheckbox from '../form/GaCheckbox'
import DiabloTradePingerContext from '../../context'
import { openInBrowser } from '../../utils/openInBrowser'
const AddListing = ({ close }) => {
  AddListing.propTypes = {
    close: PropTypes.func.isRequired
  }

  const { hanldeAddListing } = useContext(DiabloTradePingerContext)

  const [equipmentType, setEquipmentType] = useState(null)
  const [maxPrice, setMaxPrice] = useState(0)
  const [affixes, setAffixes] = useState([
    { name: '', isGreaterAffix: false },
    { name: '', isGreaterAffix: false },
    { name: '', isGreaterAffix: false }
  ])

  const handleSetAffixName = (index, value) => {
    const affixesCopy = [...affixes]
    affixesCopy[index] = { name: value, isGreaterAffix: affixesCopy[index].isGreaterAffix }
    setAffixes(affixesCopy)
  }

  const handleSetAffixGreaterAffix = (index, value) => {
    const affixesCopy = [...affixes]
    affixesCopy[index] = { name: affixesCopy[index].name, isGreaterAffix: value }
    setAffixes(affixesCopy)
  }

  const handleCreate = () => {
    if (equipmentType && (affixes[0]?.name || affixes[1]?.name || affixes[2]?.name))
      hanldeAddListing({
        id: 'id' + Math.random().toString(16).slice(2),
        equipmentType: equipmentType,
        maxPrice: maxPrice,
        affixes: affixes.filter((affix) => affix.name !== '')
      })

    close()
  }

  return (
    <Modal closeModal={close} title="New Listing">
      <div className="flex flex-col min-h-[500px] justify-between">
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-diablo text-lg">Note: </span>
            <p className="text-sm text-gray-300 p-3 border-diablo-bg border rounded bg-opacity-50">
              Affixes in this app may not be entirely accurate. If you find an affix here with
              different wording than on the site, it may affect the item search accuracy. Refrain
              from using such affixes at the moment and report them on our{' '}
              <a
                className="text-white p-[2px] bg-discord border border-white rounded items-center w-[75px] inline-block"
                href="https://discord.gg/QVDgUQMSqB"
                onClick={(e) => {
                  e.preventDefault()
                  openInBrowser(e.currentTarget.href)
                }}
              >
                <svg
                  className="inline-block mr-1"
                  width="15px"
                  height="15px"
                  viewBox="0 -28.5 256 256"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  preserveAspectRatio="xMidYMid"
                >
                  <g>
                    <path
                      d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                      fill="currentColor"
                      fillRule="nonzero"
                    ></path>
                  </g>
                </svg>
                Discord
              </a>{' '}
              to be fixed immedaitely.
            </p>
          </div>

          <Dropdown
            label="Equipment Type:"
            value={{ label: equipmentType, value: equipmentType }}
            onChange={(value) => setEquipmentType(value.value)}
            options={equipmentOptions}
          />

          {equipmentType && (
            <>
              <div className="flex flex-row justify-between gap-5">
                <Dropdown
                  className="w-full"
                  label="Affix 1"
                  value={{ label: affixes[0].name, value: affixes[0].name }}
                  onChange={(value) => handleSetAffixName(0, value.value)}
                  options={AFFIX_OPTIONS[equipmentType]}
                />

                <GaCheckbox
                  value={affixes[0].isGreaterAffix}
                  setValue={(value) => handleSetAffixGreaterAffix(0, value)}
                />
              </div>

              <div className="flex flex-row justify-between gap-5">
                <Dropdown
                  className="w-full"
                  label="Affix 2"
                  value={{ label: affixes[1].name, value: affixes[1].name }}
                  onChange={(value) => handleSetAffixName(1, value.value)}
                  options={AFFIX_OPTIONS[equipmentType]}
                />
                <GaCheckbox
                  value={affixes[1].isGreaterAffix}
                  setValue={(value) => handleSetAffixGreaterAffix(1, value)}
                />
              </div>
              <div className="flex flex-row justify-between gap-5">
                <Dropdown
                  className="w-full"
                  label="Affix 3"
                  value={{ label: affixes[2].name, value: affixes[2].name }}
                  onChange={(value) => handleSetAffixName(2, value.value)}
                  options={AFFIX_OPTIONS[equipmentType]}
                />
                <GaCheckbox
                  value={affixes[2].isGreaterAffix}
                  setValue={(value) => handleSetAffixGreaterAffix(2, value)}
                />
              </div>

              <Input
                type="number"
                label="Max Price"
                className="self-start"
                value={maxPrice}
                setValue={(value) => setMaxPrice(value)}
              />
            </>
          )}
        </div>

        <div className="flex flex-row justify-end gap-4">
          <button className="btn-secondary" onClick={close}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleCreate}>
            Create Listing
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default AddListing
