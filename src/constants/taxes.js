export const TAX_ADD = 'TAX_ADD';
export const TAX_DELETE = 'TAX_DELETE';
export const TAX_SORT = 'TAX_SORT';
export const TAX_HOSTILE = 'TAX_HOSTILE';

export const BUILDING_NAME_REGEX = /^(?:(?:Bound )?Design: )?(?:Full[ -]Kit: )?((?:(?! Design| Kit).)*)/;
export const BUILDING_SIZE_REGEX = /(\d+) ?m x \d+ ?m/;
export const BUILDING_TYPE_REGEX = /(?:Classification|Category): ([\w ]+\w)/;
export const BUILDING_DEPOSIT_REGEX = /Security Deposit:[^\d]+(\d+)/;
export const BUILDING_TAXES_REGEX = /Taxes:[^\d]+(\d+)/;

export const HEAVY_TAX_RATE = Object.freeze([
  0,
  0,
  0,
  1,
  1.5,
  2,
  2.5,
  4,
  5,
]);

export const HOSTILE_FACTION_TAX = 3;

