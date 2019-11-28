import { QUALITY } from 'constants/dailies';

export const HOUSING_TYPES = Object.freeze({
  WORKBENCH: {
    name: 'Workbenches',
    size: '8x8',
    base: 5,
    properties: [
      'Private Leatherworking Table',
      'Private Loom',
      'Private Masonry Table',
      'Private Sawmill',
      'Private Smelter',
    ],
  },
  SMALL_FARM: {
    name: 'Small Farms',
    size: '8x8',
    base: 5,
    properties: [
      'Scarecrow Garden',
    ],
  },
  MEDIUM_FARM: {
    name: 'Medium Farms',
    size: '16x16',
    base: 10,
    properties: [
      'Scarecrow Farm',
      'Aquafarm',
    ],
  },
  LARGE_FARM: {
    name: 'Large Farms',
    size: '24x24',
    base: 15,
    properties: [
      'Gazebo Farm',
      'Thatched Farmhouse',
    ],
  },
  FARMHOUSE_UPGRADED: {
    name: 'Upgraded Farmhouses',
    size: '24x24',
    base: 25,
    properties: [
      'Harvester\'s Farmhouse',
      'Miner\'s Farmhouse',
      'Rancher\'s Farmhouse',
    ],
  },
  SMALL_HOUSE: {
    name: 'Small Houses',
    size: '16x16',
    base: 10,
    properties: [
      'Cottages',
      'Swept-Roof Villa',
    ],
  },
  SMALL_HOUSE_UPGRADED: {
    name: 'Raised Houses',
    size: '16x16',
    base: 15,
    properties: [
      'Raised:',
      'Cottages',
      'Swept-Roof Villa',
    ],
  },
  MEDIUM_HOUSE: {
    name: 'Medium Houses',
    size: '24x24',
    base: 15,
    properties: [
      'Breezy Bungalow',
      'Manors',
      'Townhouses',
      'Swept-Roof Chalet',
    ],
  },
  MEDIUM_HOUSE_UPGRADED: {
    name: 'Medium House (Upgraded)',
    size: '24x24',
    base: 25,
    properties: [
      'Apothecary\'s, Armorer\'s, Tradesman\'s:',
      'Manors',
      'Townhouses',
    ],
  },
  LARGE_HOUSE: {
    name: 'Large Houses',
    size: '28x28',
    base: 25,
    properties: [
      'Chalets',
      // 'Deserted Cottage',
      // 'Solariums',
      'Swept-Roof Manor',
      'Tidal Bungalow',
      'Treehouses',
      'Villas',
    ],
  },
  LARGE_HOUSE_UPGRADED: {
    name: 'Large Houses (Upgraded)',
    size: '28x28',
    base: 40,
    properties: [
      'Apothecary\'s, Armorer\'s, Tradesman\'s:',
      'Chalets',
      'Villas',
    ],
  },
  PUBLIC_BUILDING: {
    name: 'Public Buildings',
    size: '28x28',
    base: 25,
    properties: [
      'Fellowship Plaza',
    ],
  },
  MANSION: {
    name: 'Mansions',
    size: '44x44',
    base: 50,
    properties: [
      'Mansions',
      'Spired Chateau',
    ],
  },
});

export const TAX_BURDEN = Object.freeze([
  0,
  0,
  0,
  100,
  150,
  200,
  250,
  400,
  500,
  500,
  500,
]);

export const PROFICIENCY = Object.freeze([
  {
    name: 'Basic',
    quality: QUALITY.BASIC,
    maxRank: 10000,
    cost: 1,
  },
  {
    name: 'Novice',
    quality: QUALITY.GRAND,
    maxRank: 20000,
    cost: 1,
  },
  {
    name: 'Veteran',
    quality: QUALITY.RARE,
    maxRank: 30000,
    cost: 1,
  },
  {
    name: 'Expert',
    quality: QUALITY.ARCANE,
    maxRank: 40000,
    cost: 0.95,
  },
  {
    name: 'Master',
    quality: QUALITY.HEROIC,
    maxRank: 50000,
    cost: 0.9,
  },
  {
    name: 'Authority',
    quality: QUALITY.UNIQUE,
    maxRank: 70000,
    cost: 0.85,
  },
  {
    name: 'Champion',
    quality: QUALITY.UNIQUE,
    maxRank: 90000,
    cost: 0.8,
  },
  {
    name: 'Adept',
    quality: QUALITY.UNIQUE,
    maxRank: 110000,
    cost: 0.8,
  },
  {
    name: 'Herald',
    quality: QUALITY.UNIQUE,
    maxRank: 130000,
    cost: 0.8,
  },
  {
    name: 'Virtuoso',
    quality: QUALITY.UNIQUE,
    maxRank: 150000,
    cost: 0.75,
  },
  {
    name: 'Celebrity',
    quality: QUALITY.CELESTIAL,
    maxRank: 180000,
    cost: 0.7,
  },
  {
    name: 'Famed',
    quality: QUALITY.DIVINE,
    maxRank: 230000,
    cost: 0.6,
  },
]);
