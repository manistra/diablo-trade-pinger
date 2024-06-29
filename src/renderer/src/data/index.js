import { helmAffixOptions } from './helm'
import { gloveAffixOptions } from './glove'
import { pantsAffixOptions } from './pants'
import { ringAffixOptions } from './ring'
import { oneHandAffixOptions } from './oneHanded'
import { twoHandedAffixOptions } from './twoHanded'
import { staffAffixOptions } from './staff'
import { totemAffixOptions } from './totem'
import { shieldAffixOptions } from './shield'
import { bootsAffixOptions } from './boots'
import { amuletAffixOptions } from './amulet'
import { chestAffixOptions } from './chest'

const EQUIPMENT_TYPES = {
  AMULET: 'Amulet',
  BOOTS: 'Boots',
  CHESTARMOR: 'Chest Armor',
  GLOVES: 'Gloves',
  HELM: 'Helm',
  PANTS: 'Pants',
  RING: 'Ring',

  AXE: 'Axe',
  DAGGER: 'Dagger',
  MACE: 'Mace',
  SWORD: 'Sword',
  FOCUS: 'Focus',
  SCYTHE: 'Scythe',

  POLEARM: 'Polearm',
  SHIELD: 'Shield',
  STAFF: 'Staff',
  TOTEM: 'Totem',

  CROSSBOW: 'Crossbow',
  BOW: 'Bow',
  TWOHANDEDAXE: 'Two-Handed Axe',
  TWOHANDEDMACE: 'Two-Handed Mace',
  TWOHANDEDSCYTHE: 'Two-Handed Scythe',
  TWOHANDEDSWORD: 'Two-Handed Sword',
  WAND: 'Wand'
}

export const equipmentOptions = Object.values(EQUIPMENT_TYPES).map((type) => ({
  value: type,
  label: type
}))

export const AFFIX_OPTIONS = {
  [EQUIPMENT_TYPES.AMULET]: amuletAffixOptions,
  [EQUIPMENT_TYPES.BOOTS]: bootsAffixOptions,
  [EQUIPMENT_TYPES.CHESTARMOR]: chestAffixOptions,
  [EQUIPMENT_TYPES.GLOVES]: gloveAffixOptions,
  [EQUIPMENT_TYPES.HELM]: helmAffixOptions,
  [EQUIPMENT_TYPES.PANTS]: pantsAffixOptions,
  [EQUIPMENT_TYPES.RING]: ringAffixOptions,

  [EQUIPMENT_TYPES.WAND]: oneHandAffixOptions,
  [EQUIPMENT_TYPES.AXE]: oneHandAffixOptions,
  [EQUIPMENT_TYPES.DAGGER]: oneHandAffixOptions,
  [EQUIPMENT_TYPES.MACE]: oneHandAffixOptions,
  [EQUIPMENT_TYPES.SWORD]: oneHandAffixOptions,
  [EQUIPMENT_TYPES.FOCUS]: oneHandAffixOptions,
  [EQUIPMENT_TYPES.SCYTHE]: oneHandAffixOptions,

  [EQUIPMENT_TYPES.SHIELD]: shieldAffixOptions,
  [EQUIPMENT_TYPES.STAFF]: staffAffixOptions,
  [EQUIPMENT_TYPES.TOTEM]: totemAffixOptions,

  [EQUIPMENT_TYPES.BOW]: twoHandedAffixOptions,
  [EQUIPMENT_TYPES.CROSSBOW]: twoHandedAffixOptions,
  [EQUIPMENT_TYPES.POLEARM]: twoHandedAffixOptions,
  [EQUIPMENT_TYPES.TWOHANDEDAXE]: twoHandedAffixOptions,
  [EQUIPMENT_TYPES.TWOHANDEDMACE]: twoHandedAffixOptions,
  [EQUIPMENT_TYPES.TWOHANDEDSCYTHE]: twoHandedAffixOptions,
  [EQUIPMENT_TYPES.TWOHANDEDSWORD]: twoHandedAffixOptions
}
