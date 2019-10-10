import {
  ATTACK,
  BUFF,
  COMBO_TYPE,
  ELEMENT,
  GLOBAL_CD,
} from 'constants/skills';
import TripleSlashIcon from 'images/skill/battlerage/Triple_Slash.png';
import ChargeIcon from 'images/skill/battlerage/Charge.png';
import BattleFocusIcon from 'images/skill/battlerage/Battle_Focus.png';
import WhirlwindSlashIcon from 'images/skill/battlerage/Whirlwind_Slash.png';
import SunderEarthIcon from 'images/skill/battlerage/Sunder_Earth.png';
import FrenzyIcon from 'images/skill/battlerage/Frenzy.png';
import PrecisionStrikeIcon from 'images/skill/battlerage/Precision_Strike.png';
import TigerStrikeIcon from 'images/skill/battlerage/Tiger_Strike.png';
import BondbreakerIcon from 'images/skill/battlerage/Bondbreaker.png';
import TerrifyingRoarIcon from 'images/skill/battlerage/Terrifying_Roar.png';
import HammerTossIcon from 'images/skill/battlerage/Hammer_Toss.png';
import BehindEnemyLinesIcon from 'images/skill/battlerage/Behind_Enemy_Lines.png';
import DeflectAndRetaliateIcon from 'images/skill/battlerage/Deflect_and_Retaliate.png';
import RecklessChargeIcon from 'images/skill/battlerage/Reckless_Charge.png';
import PunctureIcon from 'images/skill/battlerage/Puncture.png';
import AttackSpeedTrainingIcon from 'images/skill/battlerage/Attack_Speed_Training.png';
import WeaponsMasteryIcon from 'images/skill/battlerage/Weapons_Mastery.png';
import DeadlyDuelistIcon from 'images/skill/battlerage/Deadly_Duelist.png';
import TripleSlashLightning from 'images/skill/battlerage/Triple_Slash_Lightning.png';
import TripleSlashQuake from 'images/skill/battlerage/Triple_Slash_Quake.png';
import PrecisionStrikeGale from 'images/skill/battlerage/Precision_Strike_Gale.png';
import PrecisionStrikeWave from 'images/skill/battlerage/Precision_Strike_Wave.png';
import TigerStrikeLife from 'images/skill/battlerage/Tiger_Strike_Life.png';
import TigerStrikeLightning from 'images/skill/battlerage/Tiger_Strike_Lightning.png';
import BehindEnemyLinesGale from 'images/skill/battlerage/Behind_Enemy_Lines_Gale.png';
import BehindEnemyLinesStone from 'images/skill/battlerage/Behind_Enemy_Lines_Stone.png';
import SunderEarthMist from 'images/skill/battlerage/Sunder_Earth_Mist.png';
import SunderEarthQuake from 'images/skill/battlerage/Sunder_Earth_Quake.png';
import { getSkillIdByName } from 'utils/skillsets';

const skills = Object.freeze([
  {
    icon: TripleSlashIcon,
    name: 'Triple Slash',
    rank: 1,
    mana: 12,
    range: [0, 4],
    effectRange: 0,
    damage: { base: 0, scaling: { attack: ATTACK.MELEE, ratio: 174 } },
    castTime: 0,
    cooldown: 0,
    description: 'A constant pattern of #3 distinct strikes#, each dealing ${damage} Physical Damage.\n' +
      'On each 3rd attack, this skill deals #+20%# more damage and affects all enemies with in a #3m# radius of the primary target.',
    globalCooldown: GLOBAL_CD.REDUCED,
    continuousHold: true,
    unblockable: false,
    movement: false,
    combos: [
      {
        type: COMBO_TYPE.CAUSES,
        cause: BUFF.SNARED,
        result: BUFF.SHAKEN,
        text: 'First attack: ${c} targets are ${r} for #3 sec.#',
      },
      {
        type: COMBO_TYPE.EMPOWERS,
        buff: BUFF.TRIPPED,
        text: 'Second attack: deals +48% additional damage to ${b} targets.',
      },
      {
        type: COMBO_TYPE.EMPOWERS,
        buff: BUFF.TOUGHEN,
        text: 'Increases Aggro +300% if used while under the effects of Toughen.',
      },
    ],
  },
  {
    icon: ChargeIcon,
    name: 'Charge',
  },
  {
    icon: BattleFocusIcon,
    name: 'Battle Focus',
  },
  {
    icon: WhirlwindSlashIcon,
    name: 'Whirlwind Slash',
  },
  {
    icon: SunderEarthIcon,
    name: 'Sunder Earth',
  },
  {
    icon: FrenzyIcon,
    name: 'Frenzy',
  },
  {
    icon: PrecisionStrikeIcon,
    name: 'Precision Strike',
  },
  {
    icon: TigerStrikeIcon,
    name: 'Tiger Strike',
  },
  {
    icon: BondbreakerIcon,
    name: 'Bondbreaker',
  },
  {
    icon: TerrifyingRoarIcon,
    name: 'Terrifying Roar',
  },
  {
    icon: HammerTossIcon,
    name: 'Hammer Toss',
  },
  {
    icon: BehindEnemyLinesIcon,
    name: 'Behind Enemy Lines',
  },
]);

export const passives = Object.freeze([
  {
    icon: DeflectAndRetaliateIcon,
    name: 'Deflect and Retaliate',
  },
  {
    icon: RecklessChargeIcon,
    name: 'Reckless Charge',
  },
  {
    icon: PunctureIcon,
    name: 'Puncture',
  },
  {
    icon: AttackSpeedTrainingIcon,
    name: 'Attack Speed Training',
  },
  {
    icon: WeaponsMasteryIcon,
    name: 'Weapons Mastery',
  },
  {
    icon: DeadlyDuelistIcon,
    name: 'Deadly Duelist',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Triple Slash'),
    variants: [
      {
        element: ELEMENT.LIGHTNING,
        icon: TripleSlashLightning,
        mana: 9,
        damage: { base: 0, scaling: { attack: ATTACK.MELEE, ratio: 136 } },
        description: 'A constant pattern of #3 distinct strikes#, each dealing ${damage} Physical Damage.\n' +
          'On each 3rd attack, this skill deals #+20%# more damage and affects all enemies with in a #3m# radius of the primary target.\n' +
          'This skill attacks faster than basic Triple Slash, but deals less damage.',
      },
      {
        element: ELEMENT.QUAKE,
        icon: TripleSlashQuake,
        range: [0],
        effectRange: 5,
        damage: { base: 0, scaling: { attack: ATTACK.MELEE, ratio: 312 } },
        description: 'A constant pattern of #3 distinct strikes#, each dealing ${damage} Melee Damage to all enemies within #${effectRange}m# of the primary target..\n' +
          'On each 3rd attack, this skill deals #+20%# more damage up to 20 enemies within #${effectRange}#.\n' +
          'This skill attacks slower than Basic Triple Slash, but can deal damage to multiple enemies with each attack.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Precision Strike'),
    variants: [
      {
        element: ELEMENT.GALE,
        icon: PrecisionStrikeGale,
      },
      {
        element: ELEMENT.WAVE,
        icon: PrecisionStrikeWave,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Tiger Strike'),
    variants: [
      {
        element: ELEMENT.LIFE,
        icon: TigerStrikeLife,
      },
      {
        element: ELEMENT.LIGHTNING,
        icon: TigerStrikeLightning,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Behind Enemy Lines'),
    variants: [
      {
        element: ELEMENT.GALE,
        icon: BehindEnemyLinesGale,
      },
      {
        element: ELEMENT.STONE,
        icon: BehindEnemyLinesStone,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Sunder Earth'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: SunderEarthMist,
      },
      {
        element: ELEMENT.QUAKE,
        icon: SunderEarthQuake,
      },
    ],
  },
]);

export default skills;