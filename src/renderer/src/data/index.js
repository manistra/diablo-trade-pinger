import { helmAffixOptions } from './helm'
import { gloveAffixOptions } from './glove'
import { pantsAffixOptions } from './pants'
import { ringAffixOptions } from './ring'
import { shieldAffixOptions } from './shield'
import { bootsAffixOptions } from './boots'
import { amuletAffixOptions } from './amulet'
import { chestAffixOptions } from './chest'
import { weaponAffixOptions } from './weapon'
import { offhandAffixOptions } from './offhand'

const EQUIPMENT_TYPES = {
  HELM: 'Helm',
  CHESTARMOR: 'Chest Armor',
  GLOVES: 'Gloves',
  PANTS: 'Pants',
  BOOTS: 'Boots',

  AMULET: 'Amulet',
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
  WAND: 'Wand',

  CROSSBOW: 'Crossbow',
  BOW: 'Bow',
  TWOHANDEDAXE: 'Two-Handed Axe',
  TWOHANDEDMACE: 'Two-Handed Mace',
  TWOHANDEDSCYTHE: 'Two-Handed Scythe',
  TWOHANDEDSWORD: 'Two-Handed Sword'
}

export const equipmentOptions = Object.values(EQUIPMENT_TYPES).map((type) => ({
  value: type,
  label: type
}))

export const AFFIX_OPTIONS = {
  [EQUIPMENT_TYPES.HELM]: helmAffixOptions,
  [EQUIPMENT_TYPES.CHESTARMOR]: chestAffixOptions,
  [EQUIPMENT_TYPES.GLOVES]: gloveAffixOptions,
  [EQUIPMENT_TYPES.PANTS]: pantsAffixOptions,
  [EQUIPMENT_TYPES.BOOTS]: bootsAffixOptions,

  [EQUIPMENT_TYPES.AMULET]: amuletAffixOptions,
  [EQUIPMENT_TYPES.RING]: ringAffixOptions,

  [EQUIPMENT_TYPES.SHIELD]: shieldAffixOptions,

  [EQUIPMENT_TYPES.FOCUS]: offhandAffixOptions,
  [EQUIPMENT_TYPES.TOTEM]: offhandAffixOptions,

  [EQUIPMENT_TYPES.WAND]: weaponAffixOptions,
  [EQUIPMENT_TYPES.AXE]: weaponAffixOptions,
  [EQUIPMENT_TYPES.DAGGER]: weaponAffixOptions,
  [EQUIPMENT_TYPES.MACE]: weaponAffixOptions,
  [EQUIPMENT_TYPES.SWORD]: weaponAffixOptions,
  [EQUIPMENT_TYPES.SCYTHE]: weaponAffixOptions,

  [EQUIPMENT_TYPES.STAFF]: weaponAffixOptions,
  [EQUIPMENT_TYPES.BOW]: weaponAffixOptions,
  [EQUIPMENT_TYPES.CROSSBOW]: weaponAffixOptions,
  [EQUIPMENT_TYPES.POLEARM]: weaponAffixOptions,
  [EQUIPMENT_TYPES.TWOHANDEDAXE]: weaponAffixOptions,
  [EQUIPMENT_TYPES.TWOHANDEDMACE]: weaponAffixOptions,
  [EQUIPMENT_TYPES.TWOHANDEDSCYTHE]: weaponAffixOptions,
  [EQUIPMENT_TYPES.TWOHANDEDSWORD]: weaponAffixOptions
}
