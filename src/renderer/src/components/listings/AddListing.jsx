import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../form/Dropdown'
import { equipmentOptions, AFFIX_OPTIONS } from '../../data'
import Modal from '../modal/Modal'
import Input from '../form/Input'
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
    { name: '', minValue: 0 },
    { name: '', minValue: 0 },
    { name: '', minValue: 0 }
  ])

  const handleSetAffixName = (index, value) => {
    const affixesCopy = [...affixes]
    affixesCopy[index] = { name: value, minValue: affixesCopy[index].minValue }
    setAffixes(affixesCopy)
  }

  const handleSetAffixMinValue = (index, value) => {
    const affixesCopy = [...affixes]
    affixesCopy[index] = { name: affixesCopy[index].name, minValue: value }
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
          <p className="text-sm text-gray-300">
            <span className="text-diablo">Note: </span>
            Affixes in this app may not be entirely accurate. If you find an affix here with
            different wording than on the site, it may affect the item search accuracy. Refrain from
            using such affixes at the moment and report them on our{' '}
            <a
              className="underline text-blue-500"
              href="https://discord.gg/QVDgUQMSqB"
              onClick={(e) => {
                e.preventDefault()
                openInBrowser(e.currentTarget.href)
              }}
            >
              Discord
            </a>{' '}
            to be fixed immedaitely.
          </p>

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

                <Input
                  type="number"
                  className="w-28"
                  label="Min Value"
                  value={affixes[0].minValue}
                  setValue={(value) => handleSetAffixMinValue(0, value)}
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
                <Input
                  type="number"
                  className="w-28"
                  label="Min Value"
                  value={affixes[1].minValue}
                  setValue={(value) => handleSetAffixMinValue(1, value)}
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
                <Input
                  type="number"
                  className="w-28"
                  label="Min Value"
                  value={affixes[2].minValue}
                  setValue={(value) => handleSetAffixMinValue(2, value)}
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
