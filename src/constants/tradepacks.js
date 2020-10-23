import { QUEST_REGIONS } from 'constants/dailies';
import { ITEM } from 'constants/items';
import {
  CONTINENT,
  ZONE,
} from 'constants/map';

export const SET_PACK_TABLE = 'SET_PACK_TABLE';
export const SET_OUTLET = 'SET_OUTLET';
export const SET_CRAFT_LARDER = 'SET_CRAFT_LARDER';
export const SET_DEGRADATION = 'SET_DEGRADATION';
export const SET_PROFIT_LEVEL = 'SET_PROFIT_LEVEL';
export const SET_INTEREST = 'SET_INTEREST';
export const SET_PERCENTAGE = 'SET_PERCENTAGE';
export const SET_PERCENTAGE_DEFAULT = 'SET_PERCENTAGE_DEFAULT';
export const SET_QUANTITY = 'SET_QUANTITY';
export const SET_SUPPLY = 'SET_SUPPLY';
export const SET_TRANSPORTATION_QUANTITY = 'SET_TRANSPORTATION_QUANTITY';
export const SET_WAR = 'SET_WAR';
export const SET_AH_CUT = 'SET_AH_CUT';
export const SET_PACK_REGION = 'SET_PACK_REGION';
export const TRADE_PACK_RESET = 'TRADE_PACK_RESET';

export const SELL_LABOR = 70;
export const BUY_CARGO_LABOR = 75;
export const SELL_CARGO_LABOR = 175;
export const LARDER_HARVEST_LABOR = 65;

export const PACK_REGIONS = QUEST_REGIONS;

export const PACK_TABLE = Object.freeze({
  NUIA: CONTINENT.NUIA,
  HARANYA: CONTINENT.HARANYA,
  CARGO: CONTINENT.SEA,
  AURORIA: CONTINENT.AURORIA,
});

export const PACK_TYPE = Object.freeze({
  NORMAL: 1,
  GILDA: 2,
  LOCAL: 3,
  FERTILIZER: 4,
  SALVE: 5,
  CHEESE: 6,
  HONEY: 7,
  BLUE_SALT: 8,
  SPECIAL: 9,
  ANTIQUITIES: 10,
  CARGO: 11,
  DISGUISED: 12,
});

export const DISGUISED_PACK_MATERIALS = Object.freeze([
  { item: 49245, quantity: 5 },
  { item: 49244, quantity: 5 },
  { item: 49243, quantity: 5 },
  { item: ITEM.TERRITORY_COIN, quantity: 3 },
]);

export const TRANSPORTATION_FUEL = Object.freeze([
  ITEM.CARROT,
  ITEM.ECO_FRIENDLY_FUEL,
  ITEM.AXLE_GREASE,
]);

const REGULAR_PACK_TYPES = Object.freeze([
  PACK_TYPE.NORMAL,
  PACK_TYPE.GILDA,
  PACK_TYPE.LOCAL,
  PACK_TYPE.FERTILIZER,
  PACK_TYPE.SALVE,
  PACK_TYPE.CHEESE,
  PACK_TYPE.HONEY,
  PACK_TYPE.BLUE_SALT,
  PACK_TYPE.SPECIAL,
  PACK_TYPE.ANTIQUITIES,
]);

export const FRESHNESS = Object.freeze({
  LUXURY: 1,
  FINE: 2,
  COMMERCIAL: 3,
  PRESERVED: 4,
  CARGO: 5,
  DISGUISED: 6,
});

export const OUTLET_ZONE = Object.freeze({
  [PACK_TABLE.AURORIA]: [
    ZONE.SUNSPECK_SEA,
  ],
  [PACK_TABLE.HARANYA]: [
    ZONE.SOLIS_HEADLANDS,
    ZONE.VILLANELLE,
    ZONE.YNYSTERE,
  ],
  [PACK_TABLE.NUIA]: [
    ZONE.TWO_CROWNS,
    ZONE.SOLZREED_PENINSULA,
    ZONE.CINDERSTONE_MOOR,
  ],
  [PACK_TABLE.CARGO]: [],
});

export const CARGO_OUTLET = Object.freeze([
  ZONE.SOLIS_HEADLANDS,
  ZONE.TWO_CROWNS,
  ZONE.DIAMOND_SHORES,
  ZONE.SUNSPECK_SEA,
]);

export const CONTINENT_PACKS = {
  [PACK_TABLE.NUIA]: REGULAR_PACK_TYPES,
  [PACK_TABLE.HARANYA]: REGULAR_PACK_TYPES,
  [PACK_TABLE.CARGO]: CARGO_OUTLET,
  [PACK_TABLE.AURORIA]: [
    PACK_TYPE.DISGUISED,
  ],
};
