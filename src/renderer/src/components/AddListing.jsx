import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Dropdown from './form/Dropdown'
import { equipmentOptions } from '../data'
import { AFFIX_OPTIONS } from '../data'
import Input from './form/Input'
import DiabloTradePingerContext from '../context'

const AddListing = ({ close }) => {
  AddListing.propTypes = {
    close: PropTypes.func.isRequired
  }

  const { hanldeAddListing } = useContext(DiabloTradePingerContext)

  const [equipmentType, setEquipmentType] = useState(null)
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
        affixes: affixes.filter((affix) => affix.name !== '')
      })

    close()
  }

  return (
    <div className="border-diablo-dark min-w-[800px] max-w-[800px] border p-8 rounded flex flex-col gap-4 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-diablo-bg">
      <h1 className="font-exo uppercase text-diablo mx-auto text-3xl">New Listing</h1>

      <Dropdown
        label="Equipment Type:"
        value={{ label: equipmentType, value: equipmentType }}
        onChange={(value) => setEquipmentType(value.value)}
        options={equipmentOptions}
      />

      {equipmentType && (
        <>
          <div className="grid grid-cols-4 gap-5">
            <Dropdown
              className="col-span-3"
              label="Affix 1"
              value={{ label: affixes[0].name, value: affixes[0].name }}
              onChange={(value) => handleSetAffixName(0, value.value)}
              options={AFFIX_OPTIONS[equipmentType]}
            />

            <Input
              type="number"
              label="Min Value"
              value={affixes[0].minValue}
              setValue={(value) => handleSetAffixMinValue(0, value)}
            />
          </div>

          <div className="grid grid-cols-4 gap-5">
            <Dropdown
              className="col-span-3"
              label="Affix 2"
              value={{ label: affixes[1].name, value: affixes[1].name }}
              onChange={(value) => handleSetAffixName(1, value.value)}
              options={AFFIX_OPTIONS[equipmentType]}
            />
            <Input
              type="number"
              label="Min Value"
              value={affixes[1].minValue}
              setValue={(value) => handleSetAffixMinValue(1, value)}
            />
          </div>
          <div className="grid grid-cols-4 gap-5">
            <Dropdown
              className="col-span-3"
              label="Affix 3"
              value={{ label: affixes[2].name, value: affixes[2].name }}
              onChange={(value) => handleSetAffixName(2, value.value)}
              options={AFFIX_OPTIONS[equipmentType]}
            />
            <Input
              type="number"
              label="Min Value"
              value={affixes[2].minValue}
              setValue={(value) => handleSetAffixMinValue(2, value)}
            />
          </div>
        </>
      )}

      <div className="flex flex-row justify-end gap-4">
        <button className="btn border-diablo text-diablo" onClick={close}>
          Cancel
        </button>
        <button
          className="btn border-none text-diablo-bg font-bold bg-diablo"
          onClick={handleCreate}
        >
          Create Listing
        </button>
      </div>
    </div>
  )
}

export default AddListing
