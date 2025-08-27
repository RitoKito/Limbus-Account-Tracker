import { BASE_IMAGE_PATH } from "@/constants/ImagePaths";
import { DAMAGE_TYPE_ICONS, RARITY_ICONS, SIN_ICONS } from "../../constants/ImagePaths";

export const RARITY_IMAGE_URL = [
  { rarity: 0, tooltipText: "0", icon: RARITY_ICONS + "rarity_1.png" },
  { rarity: 1, tooltipText: "00", icon: RARITY_ICONS + "rarity_2.png" },
  { rarity: 2, tooltipText: "000", icon: RARITY_ICONS + "rarity_3.png" },
]

export const DAMAGE_TYPE_URL = [
	{ type: "Blunt", icon: DAMAGE_TYPE_ICONS + "Blunt.png" },
  { type: "Slash", icon: DAMAGE_TYPE_ICONS + "Slash.png" },
  { type: "Pierce", icon: DAMAGE_TYPE_ICONS + "Pierce.png" },
]

export const SIN_TYPE_URL = [
	{type: "Wrath", icon: SIN_ICONS + "Wrath.png"},
  {type: "Lust", icon: SIN_ICONS + "Lust.png"},
  {type: "Sloth", icon: SIN_ICONS + "Sloth.png"},
  {type: "Gluttony", icon: SIN_ICONS + "Gluttony.png"},
  {type: "Gloom", icon: SIN_ICONS + "Gloom.png"},
  {type: "Pride", icon: SIN_ICONS + "Pride.png"},
  {type: "Envy", icon: SIN_ICONS + "Envy.png"},
]

export const getFilterPanelConfigs = ({ filters, sinners, toggleRarity, toggleDamageType, toggleSin, toggleSinner }) => [
	{
		className: 'rarity-panel',
		panelName: 'Rarity',
		data: RARITY_IMAGE_URL,
		valueKey: 'rarity',
		tooltipKey: 'tooltipText',
		iconKey: 'icon',
		onClick: toggleRarity,
		selected: filters.rarities,
	},
	{
		className: 'damage-type-panel',
		panelName: 'Damage Type',
		data: DAMAGE_TYPE_URL,
		valueKey: 'type',
		tooltipKey: 'type',
		iconKey: 'icon',
		onClick: toggleDamageType,
		selected: filters.damageTypes,
	},
	{
		className: 'sin-type-panel',
		panelName: 'Sin',
		data: SIN_TYPE_URL,
		valueKey: 'type',
		tooltipKey: 'type',
		iconKey: 'icon',
		onClick: toggleSin,
		selected: filters.sinTypes,
	},
	{
		className: 'sinner-panel',
		panelName: 'Sinner',
		data: sinners,
		valueKey: 'name',
		tooltipKey: 'name',
		iconKey: 'icon',
		onClick: toggleSinner,
		selected: filters.sinnerNames,
	},
];