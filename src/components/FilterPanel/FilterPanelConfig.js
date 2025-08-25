import { WIKI_BASE_IMAGE_URL } from "@/constants/ImagePaths";

export const RARITY_IMAGE_URL = [
  { rarity: 0, tooltipText: "0", icon: WIKI_BASE_IMAGE_URL + "IDNumber1.png" },
  { rarity: 1, tooltipText: "00", icon: WIKI_BASE_IMAGE_URL + "IDNumber2.png" },
  { rarity: 2, tooltipText: "000", icon: WIKI_BASE_IMAGE_URL + "IDNumber3.png" },
]

export const DAMAGE_TYPE_URL = [
	{ type: "Blunt", icon: WIKI_BASE_IMAGE_URL + "Blunt.png" },
  { type: "Slash", icon: WIKI_BASE_IMAGE_URL + "Slash.png" },
  { type: "Pierce", icon: WIKI_BASE_IMAGE_URL + "Pierce.png" },
]

export const SIN_TYPE_URL = [
	{type: "Wrath", icon: WIKI_BASE_IMAGE_URL + "LcbSinWrath.png"},
  {type: "Lust", icon: WIKI_BASE_IMAGE_URL + "LcbSinLust.png"},
  {type: "Sloth", icon: WIKI_BASE_IMAGE_URL + "LcbSinSloth.png"},
  {type: "Glut", icon: WIKI_BASE_IMAGE_URL + "LcbSinGluttony.png"},
  {type: "Gloom", icon: WIKI_BASE_IMAGE_URL + "LcbSinGloom.png"},
  {type: "Pride", icon: WIKI_BASE_IMAGE_URL + "LcbSinPride.png"},
  {type: "Envy", icon: WIKI_BASE_IMAGE_URL + "LcbSinEnvy.png"},
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