import { useState } from 'react'
import Dropdown from './form/Dropdown'
import { equipmentOptions } from '../data'
import { AFFIX_OPTIONS } from '../data'
import Input from './form/Input'

const AddListing = () => {
  const [equipmentType, setEquipmentType] = useState(null)
  const [affixes, setAffixes] = useState([
    { name: '', minValue: 0 },
    { name: '', minValue: 0 },
    { name: '', minValue: 0 }
  ])

  const handleSetAffixName = (index, value) => {
    confirm('dada')
    const affixesCopy = [...affixes]
    affixesCopy[index] = { name: value, minValue: affixesCopy[index].minValue }
    setAffixes(affixesCopy)
  }

  const handleSetAffixMinValue = (index, value) => {
    const affixesCopy = [...affixes]
    affixesCopy[index] = { name: affixesCopy[index].name, minValue: value }
    setAffixes(affixesCopy)
  }

  return (
    <div className="border-white border p-8 rounded flex flex-col gap-4">
      <h1 className="font-exo uppercase text-2xl">New Listing</h1>

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
              label="Min Value"
              value={affixes[2].minValue}
              setValue={(value) => handleSetAffixMinValue(2, value)}
            />
          </div>
        </>
      )}

      <button className="btn self-end">Create Listing</button>
    </div>
  )
}

export default AddListing
