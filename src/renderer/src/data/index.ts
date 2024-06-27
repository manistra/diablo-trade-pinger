import { helmAffixOptions } from './helmAffixOptions'
import { gloveAffixOptions } from './gloveAffixOptions'

const EQUIPMENT_TYPES = {
  HELM: 'Helm',
  GLOVE: 'Glove'
}

export const equipmentOptions = Object.values(EQUIPMENT_TYPES).map((type) => ({
  value: type,
  label: type
}))

export const AFFIX_OPTIONS = {
  [EQUIPMENT_TYPES.HELM]: helmAffixOptions,
  [EQUIPMENT_TYPES.GLOVE]: gloveAffixOptions
}
