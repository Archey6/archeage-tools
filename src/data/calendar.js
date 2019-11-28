import AbyssalAttackIcon from 'images/event/abyssal_attack.png';
import BossMonsterIcon from 'images/event/boss_monster.png';
import CrimsonRiftIcon from 'images/event/crimson_rift.png';
import DailyResetIcon from 'images/event/daily_reset.png';
import DGSIcon from 'images/event/delphinad_ghost_ships.png';
import DragonBlackIcon from 'images/event/dragon_black.png';
import DragonRedIcon from 'images/event/dragon_red.png';
import FallOfHiramIcon from 'images/event/fall_of_hiram.png';
import FishFestIcon from 'images/event/fish_fest.png';
import GoldenPlainsIcon from 'images/event/goldplain.png';
import GrimghastRiftIcon from 'images/event/grimghast_rift.png';
import LeviathanIcon from 'images/event/leviathan.png';
import LuscaAwakeningIcon from 'images/event/lusca_awakening.png';
import KadumIcon from 'images/event/kadum.png';
import SeaOfChaosIcon from 'images/event/sea_of_chaos.png';
import CastleSiegeIcon from 'images/event/castle_siege.png';
import {
  DAY,
  EVENT_TYPE,
} from 'constants/calendar';

export const REAL_TIME_EVENTS = Object.freeze([
  {
    icon: AbyssalAttackIcon,
    name: 'Abyssal Attack',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    days: {
      NA: [DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY],
      EU: [DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY],
    },
    times: {
      NA: [
        { time: '22:30:00', duration: '02:00:00' },
      ],
      EU: [
        { time: '17:30:00', duration: '02:00:00' },
      ],
    },
  },
  // Temporarily hide ArchePass reset
  // {
  //   icon: DailyResetIcon,
  //   name: 'ArchePass Reset',
  //   type: EVENT_TYPE.REAL_TIME_EVENT,
  //   days: {
  //     NA: [DAY.MONDAY],
  //     EU: [DAY.MONDAY],
  //   },
  //   times: {
  //     NA: [
  //       { time: '00:00:00' },
  //     ],
  //     EU: [
  //       { time: '00:00:00' },
  //     ],
  //   },
  // },
  // Hiding Ayanad Merchant for now
  // {
  //   icon: AyanadMerchantIcon,
  //   name: 'Ayanad Merchant',
  //   type: EVENT_TYPE.REAL_TIME_EVENT,
  //   times: {
  //     NA: [
  //       { time: '18:00:00', duration: '06:00:00' },
  //     ],
  //     EU: [],
  //   },
  // },
  {
    icon: DragonBlackIcon,
    name: 'Black Dragon',
    type: EVENT_TYPE.WORLD_BOSSES,
    days: {
      NA: [DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY],
      EU: [DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY],
    },
    times: {
      NA: [
        { time: '02:30:00', duration: '02:00:00' },
      ],
      EU: [
        { time: '21:30:00', duration: '02:00:00' },
      ],
    },
  },
  {
    icon: CastleSiegeIcon,
    name: 'Castle Siege',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    days: {
      NA: [DAY.THURSDAY],
      EU: [DAY.WEDNESDAY],
    },
    times: {
      NA: [
        { time: '01:00:00', duration: '01:00:00', name: 'Claim' },
        // { time: '01:00:00', duration: '01:00:00', name: 'Preparation' },
        // { time: '02:00:00', duration: '01:00:00', name: 'Siege' },
      ],
      EU: [
        // { time: '20:00:00', duration: '01:00:00', name: 'Claim' },
        { time: '20:00:00', duration: '01:00:00', name: 'Preparation' },
        { time: '21:00:00', duration: '01:00:00', name: 'Siege' },
      ],
    },
  },
  {
    icon: DailyResetIcon,
    name: 'Daily Reset',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    times: {
      NA: [
        { time: '00:00:00' },
      ],
      EU: [
        { time: '00:00:00' },
      ],
    },
  },
  {
    icon: DGSIcon,
    name: 'Delphinad Ghost Ships',
    type: EVENT_TYPE.WORLD_BOSSES,
    times: {
      NA: [
        { time: '01:15:00', duration: '01:00:00' },
      ],
      EU: [],
    },
  },
  {
    icon: FallOfHiramIcon,
    name: 'The Fall of Hiram City (Instance)',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    times: {
      NA: [
        { time: '00:00:00', duration: '04:00:00' },
        { time: '14:00:00', duration: '02:00:00' },
      ],
      EU: [
        { time: '09:00:00', duration: '02:00:00' },
        { time: '19:00:00', duration: '04:00:00' },
      ],
    },
  },
  {
    icon: GoldenPlainsIcon,
    name: 'Golden Plains Battle (Instance)',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    times: {
      NA: [
        { time: '01:30:00', duration: '01:00:00' },
        { time: '16:00:00', duration: '01:30:00' },
      ],
      EU: [
        { time: '11:00:00', duration: '01:30:00' },
        { time: '20:30:00', duration: '01:00:00' },
      ],
    },
  },
  {
    icon: KadumIcon,
    name: 'Kadum (Instance)',
    type: EVENT_TYPE.WORLD_BOSSES,
    days: {
      NA: [],
      EU: [DAY.SUNDAY, DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY],
    },
    times: {
      NA: [
        { time: '01:00:00', duration: '01:00:00', days: [DAY.SUNDAY, DAY.MONDAY, DAY.WEDNESDAY, DAY.FRIDAY] },
        { time: '15:30:00', duration: '01:00:00', days: [DAY.SUNDAY, DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY] },
      ],
      EU: [
        { time: '10:30:00', duration: '01:00:00' },
        { time: '20:00:00', duration: '01:00:00' },
      ],
    },
  },
  {
    icon: AbyssalAttackIcon,
    name: 'Kraken',
    type: EVENT_TYPE.WORLD_BOSSES,
    days: {
      NA: [DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY],
      EU: [],
    },
    times: {
      NA: [
        { time: '00:05:00', duration: '02:00:00' },
      ],
      EU: [],
    },
  },
  {
    icon: LeviathanIcon,
    name: 'Leviathan',
    type: EVENT_TYPE.WORLD_BOSSES,
    days: {
      NA: [DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY],
      EU: [],
    },
    times: {
      NA: [
        { time: '02:00:00', duration: '02:00:00' },
      ],
      EU: [],
    },
  },
  {
    icon: LuscaAwakeningIcon,
    name: 'Lusca Awakening',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    times: {
      NA: [
        { time: '23:00:00', duration: '01:00:00' },
      ],
      EU: [
        { time: '18:00:00', duration: '01:00:00' },
      ],
    },
  },
  {
    icon: FishFestIcon,
    name: 'Mirage Isle Fish Fest',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    days: {
      NA: [DAY.SATURDAY],
      EU: [DAY.SATURDAY],
    },
    times: {
      NA: [
        { time: '17:00:00', duration: '12:00:00' },
      ],
      EU: [
        { time: '12:00:00', duration: '12:00:00' },
      ],
    },
  },
  {
    icon: DragonRedIcon,
    name: 'Red Dragon\'s Keep (Instance)',
    link: '/guides/red-dragons-keep',
    type: EVENT_TYPE.WORLD_BOSSES,
    days: {
      NA: [],
      EU: [DAY.SUNDAY, DAY.MONDAY, DAY.WEDNESDAY, DAY.FRIDAY],
    },
    times: {
      NA: [
        { time: '01:00:00', duration: '01:00:00', days: [DAY.MONDAY, DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY] },
        { time: '15:30:00', duration: '01:00:00', days: [DAY.SUNDAY, DAY.MONDAY, DAY.WEDNESDAY, DAY.FRIDAY] },
      ],
      EU: [
        { time: '10:30:00', duration: '01:00:00' },
        { time: '20:00:00', duration: '01:00:00' },
      ],
    },
  },
  {
    icon: SeaOfChaosIcon,
    name: 'Stillwater Gulf (Arena)',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    times: {
      NA: [
        { time: '00:00:00', duration: '01:00:00' },
        { time: '13:00:00', duration: '01:00:00' },
        { time: '20:00:00', duration: '01:00:00' },
      ],
      EU: [
        { time: '08:00:00', duration: '01:00:00' },
        { time: '15:00:00', duration: '01:00:00' },
        { time: '19:00:00', duration: '01:00:00' },
      ],
    },
  },
]);

export const GAME_TIME_EVENTS = Object.freeze([
  {
    icon: CrimsonRiftIcon,
    name: 'Crimson Rift',
    link: '/guides/gilda-dailies#miscellaneous-quests',
    inGameTime: '12:00',
    times: [
      { time: '00:20:00', duration: '00:10:00', name: 'Mainland' },
      { time: '01:20:00', duration: '00:10:00', name: 'Auroria', inGameTime: '18:00' },
      { time: '04:20:00', duration: '00:10:00', name: 'Mainland' },
      { time: '05:20:00', duration: '00:10:00', name: 'Auroria', inGameTime: '18:00' },
      { time: '08:20:00', duration: '00:10:00', name: 'Mainland' },
      { time: '09:20:00', duration: '00:10:00', name: 'Auroria', inGameTime: '18:00' },
      { time: '12:20:00', duration: '00:10:00', name: 'Mainland' },
      { time: '13:20:00', duration: '00:10:00', name: 'Auroria', inGameTime: '18:00' },
      { time: '16:20:00', duration: '00:10:00', name: 'Mainland' },
      { time: '17:20:00', duration: '00:10:00', name: 'Auroria', inGameTime: '18:00' },
      { time: '20:20:00', duration: '00:10:00', name: 'Mainland' },
      { time: '21:20:00', duration: '00:10:00', name: 'Auroria', inGameTime: '18:00' },
    ],
  },
  {
    icon: GrimghastRiftIcon,
    name: 'Grimghast Rift',
    link: '/guides/gilda-dailies#miscellaneous-quests',
    inGameTime: '00:00',
    times: [
      { time: '02:20:00', duration: '00:10:00' },
      { time: '06:20:00', duration: '00:10:00' },
      { time: '10:20:00', duration: '00:10:00' },
      { time: '14:20:00', duration: '00:10:00' },
      { time: '18:20:00', duration: '00:10:00' },
      { time: '22:20:00', duration: '00:10:00' },
    ],
  },
  {
    icon: BossMonsterIcon,
    name: 'Jola',
    inGameTime: '06:00',
    times: [
      { time: '03:20:00', duration: '01:00:00' },
      { time: '07:20:00', duration: '01:00:00' },
      { time: '11:20:00', duration: '01:00:00' },
      { time: '15:20:00', duration: '01:00:00' },
      { time: '19:20:00', duration: '01:00:00' },
      { time: '23:20:00', duration: '01:00:00' },
    ],
  },
  {
    icon: BossMonsterIcon,
    name: 'Meina & Glenn',
    link: '/guides/meina-and-glenn',
    inGameTime: '06:00',
    times: [
      { time: '03:20:00', duration: '01:00:00' },
      { time: '07:20:00', duration: '01:00:00' },
      { time: '11:20:00', duration: '01:00:00' },
      { time: '15:20:00', duration: '01:00:00' },
      { time: '19:20:00', duration: '01:00:00' },
      { time: '23:20:00', duration: '01:00:00' },
    ],
  },
]);
