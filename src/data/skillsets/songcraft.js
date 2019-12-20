import {
  ATTACK,
  BUFF,
  ELEMENT,
  GLOBAL_CD,
  SKILLMOD,
} from 'constants/skills';
import { getSkillIdByName } from 'utils/skillsets';
import * as Icon from '../../images/skill/songcraft/';

const skills = Object.freeze([
  {
    icon: Icon.CriticalDiscord,
    name: 'Critical Discord',
    rank: 10,
    mana: 94,
    range: [0, 20],
    damage: { base: 691, attack: ATTACK.MAGIC, ratio: 130 },
    cooldown: 16,
    effects: [BUFF.DISCORD],
    description: 'Deals ${damage} Magic Damage. Inflicts #${effects[0]}# on hit, decreasing affected enemies\' Physical and Magic Defense #-15%# for #5sec.#',
    combos: [
      {
        buff: BUFF.DISSONANCE,
        text: 'Increases the duration of Discord +50% when cast on targets under the effects of ${b}.',
      },
    ],
  },
  {
    icon: Icon.StartlingStrain,
    name: 'Startling Strain',
    mana: 11,
    range: [0, 15],
    cooldown: 18,
    effects: [BUFF.SNARED, BUFF.CHARMED],
    description: '#Roots# an enemy with a special performance, stopping them from moving or turning for #1sec.#\r' +
      'When the Root expires the enemy is #${effects[1]},# making them more susceptible to other Songcraft skill effects from #28 sec.#',
    descriptionNote: '\rThis skill does not stop ongoing Perform skills.',
    combos: [
      {
        buff: BUFF.DISSONANCE,
        text: 'Increases the duration of Charmed +50% when cast on targets under the effects of ${b}.',
      },
    ],
  },
  {
    icon: Icon.Quickstep,
    name: '[Perform] Quickstep',
    rank: 5,
    mana: 162,
    cooldown: 2,
    duration: 15,
    performRange: 10,
    description: 'Plays a lighthearted song that affects the caster and up to #30 allies# for #${duration}sec#, which counts as an ongoing spell.\r' +
      'Increases Move Speed #+20-28%# for you and all allies within #${performRange}m# radius.\r' +
      'Can only stack with other Perform skills, and shares a cooldown with them.',
    descriptionNote: 'The effects from Perform skills grow and fade as the song cycle repeats.',
    combos: [
      {
        buff: BUFF.CHARMED,
        causes: BUFF.SLOWED,
        text: 'Slows ${b} targets.',
      },
      {
        buff: BUFF.DISSONANCE,
        text: '${b}: Decreases enemies\' Attack Speed -100.',
      },
    ],
  },
  {
    icon: Icon.Dissonance,
    name: 'Dissonance',
    rank: 14,
    mana: 155,
    damage: { base: 1161, attack: ATTACK.MAGIC, ratio: 140 },
    cooldown: 30,
    effects: [BUFF.DISSONANCE],
    description: 'Plays clashing sounds to weaken an enemy and lower their combat effectiveness.\r' +
      'Inflicts #${effects[0]},# decreasing affected enemies\' Skill Damage #-30%# and disarming their left-hand weapon for #9sec.#\r' +
      'Deals ${damage} Magic Damage upon expiration.',
    descriptionNote: '\rDoes not stop ongoing Perform skills.',
    combos: [
      {
        buff: BUFF.DISCORD,
        text: 'Disables the target\'s Left-Hand Weapon for #3sec#',
      },
    ],
  },
  {
    icon: Icon.DoubleTime,
    name: 'Double-Time',
    mana: 29,
    cooldown: 28,
    description: 'Dramatically increases the caster\'s Move Speed for a short time, growing up to #+200%# Move Speed over #2sec.#',
    globalCooldown: GLOBAL_CD.REDUCED,
  },
  {
    icon: Icon.OdeToRecovery,
    name: '[Perform] Ode to Recovery',
    rank: 3,
    mana: 176,
    cooldown: 2,
    duration: 15,
    performRange: 10,
    description: 'Plays a healing song that affects the caster and up to #30 allies# for #${duration}sec#, which counts as an ongoing spell. Restores +#430# health #every 3 seconds# to allies within #${performRange}m#.',
    descriptionNote: '\rMultiple casters can use this skill to heal the same ally.\r' +
      'Can only stack with other Perform skills, and shares a cooldown with them. The effects from Perform skills grow and fade as the song cycle repeats.',
    combos: [
      {
        buff: BUFF.CHARMED,
        text: 'Inflicts &(#372 - 379# + 72% Magic Attack)& continuous Magic Damage per second on ${b} targets.',
      },
      {
        buff: BUFF.DISSONANCE,
        text: 'Decreases the ${b} target\'s Max Health -10%',
      },
    ],
  },
  {
    icon: Icon.HealingHymn,
    name: 'Healing Hymn',
    rank: 6,
    range: [0, 30],
    healing: { base: 1440, attack: ATTACK.HEALING, ratio: 0 },
    cooldown: 15,
    description: 'Plays a healing song that instantly restores ${healing} Health to the caster or an ally.\r' +
      'The effect can travel to another 2 allies within #10m#.\r' +
      'Can continue to be transferred up to #3 times#.',
    descriptionNote: '\rThis skill does not stop ongoing Perform skills.',
  },
  {
    icon: Icon.DeadlyRefrain,
    name: 'Deadly Refrain',
    mana: 52,
    cooldown: 8,
    description: 'Grants the caster 1 stack of #Rhythm,# increasing Critical Damage and Crit Heal Bonus #+2%%# and decreasing all Songcraft Cooldowns #-0.4 sec# per stack.\r' +
      'Stacks up to 15 times.',
  },
  {
    icon: Icon.BulwarkBallad,
    name: '[Perform] Bulwark Ballad',
    rank: 2,
    mana: 151,
    cooldown: 2,
    duration: 15,
    performRange: 10,
    description: 'Plays a song of the earth that affects the caster and up to #30 allies# for #${duration} sec#, which counts as an ongoing spell.\r' +
      'Increases Physical and Magic Defense #+2800-3600# for you and all allies within a #${performRange}m# radius.\r' +
      'Can only stack with other Perform skills, and shares a cooldown with them.',
    descriptionNote: 'The effects from Perform skills grow and fade as the song cycle repeats.',
    combos: [
      {
        buff: BUFF.CHARMED,
        text: 'Decreases Physical and Magic Defense -50% on ${b} targets',
      },
      {
        buff: BUFF.DISSONANCE,
        text: '${b}: Reduces enemies\' Defense Penetration -10%.',
      },
    ],
  },
  {
    icon: Icon.SonicWave,
    name: 'Sonic Wave',
    mana: 170,
    cooldown: 45,
    description: 'Unleash a magically-enhanced wave of sound, inflicting #Sonic Wave# on all enemies in a wide corridor extending #15m# in front of you.\r' +
      'Affected enemies lose their current targets, and can\'t select new targets again for #3sec.#\r' +
      'Only applies in PvP.',
    globalCooldown: GLOBAL_CD.REDUCED,
  },
  {
    icon: Icon.BloodyChantey,
    name: '[Perform] Bloody Chantey',
    rank: 2,
    mana: 228,
    cooldown: 2,
    duration: 15,
    performRange: 10,
    description: 'Plays a lively song that affects the caster and up to #30 allies# for #${duration} sec#, which counts as an ongoing spell.\r' +
      'Increases damage dealt #+18-26%# and Attack Speed #+282# for you an allies within a #${performRange}m# radius.\r' +
      'Can only stack with other Perform skills, and shares a cooldown with them.',
    descriptionNote: 'The effects from Perform skills grow and fade as the song cycle repeats.',
    combos: [
      {
        buff: BUFF.CHARMED,
        text: 'Decreases all Skill Damage -20% on ${b} targets',
      },
      {
        buff: BUFF.DISSONANCE,
        text: '${b}: Decreases all accuracy -10%.',
      },
    ],
  },
  {
    icon: Icon.BattleHymn,
    name: 'Battle Hymn',
    mana: 355,
    range: [0, 50],
    effectRange: 30,
    castTime: 4,
    cooldown: 120,
    description: 'Performs an inspirational song to prepare all allies in the target area for battle. Grants affected allies #+350# Attack Speed and #+30%# Move Speed for #30sec.#',
  },
]);

export const passives = Object.freeze([
  {
    icon: Icon.PiercingMelody,
    name: 'Piercing Melody',
    description: '#Discord# and #Dissonance# effects always hit.',
  },
  {
    icon: Icon.HoldTheNote,
    name: 'Hold the Note',
    description: 'Increases the performance time of Quickstep, Ode to Recovery, Bloody Chantey, and Bulwark Ballad #+15 sec.#',
    skillMod: [
      {
        type: SKILLMOD.FLAT,
        vars: { duration: 15 },
        skills: [2, 5, 8, 10],
      },
    ],
  },
  {
    icon: Icon.Zeal,
    name: 'Zeal',
    description: 'Whenever you inflict a Critical Hit or Critical Heal, gain #+30%# increased Critical Rate and Critical Heal Rate for #5 sec.#\r\r' +
      'This ability has a #12 sec# Cooldown once triggered.',
  },
  {
    icon: Icon.DisciplinedPerformance,
    name: 'Disciplined Performance',
    description: 'When casting #Deadly Refrain,# gain #2# additional stacks of Rhythm.\r' +
      'Gain an additional stack of #Rhythm# for every 3 seconds a Perform skill is maintained.\r' +
      'At #15# stacks of Rhythm, gain #Sustained Rhythm# instead.\r\r' +
      '#Sustained Rhythm:#\r' +
      '- Increases all Critical Damage #+30%.#\r' +
      '- Decreases Songcraft Skill Cooldowns#-6 sec.#\r' +
      '- Lasts #20 seconds,# and is refresh whenever you would gain a stack of Rhythm.',
  },
  {
    icon: Icon.LingeringImpact,
    name: 'Lingering Impact',
    description: 'Increases the duration of Perform skills #+2 sec#',
  },
  {
    icon: Icon.Loudspeaker,
    name: 'Loudspeaker',
    description: 'Increases the range for Quickstep, Ode to Recovery, Bloody Chantey, and Bulwark Ballad to #25m.#',
    skillMod: [
      {
        type: SKILLMOD.SET,
        vars: { performRange: 25 },
        skills: [2, 5, 8, 10],
      },
    ],
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Startling Strain'),
    variants: [
      {
        element: ELEMENT.LIFE,
        icon: Icon.StartlingStrainLife,
        mana: 14,
        effects: [BUFF.STARTLING_STRAIN_LIFE],
        description: 'Magically improves the beneficial effects the target receives from Perform skills #+30%# for #28sec.#\r' +
          'Can be applied to the caster or a chosen ally.',
        combos: [],
      },
      {
        element: ELEMENT.WAVE,
        icon: Icon.StartlingStrainWave,
        mana: 14,
        effects: [BUFF.CHARMED],
        description: '#Charms# an enemy, making the more susceptible to other Songcraft skill effects for #24sec.#\r' +
          'When an enemy Charmed by this skill dies, the cooldown on Startling Strain is reset.',
        combos: [
          {
            buff: BUFF.DISSONANCE,
            text: 'Increases the Duration of Charmed +50% on targets with ${b}.',
          },
        ],
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Healing Hymn'),
    variants: [
      {
        element: ELEMENT.STONE,
        icon: Icon.HealingHymnStone,
        range: [0, 20],
        healing: null,
        cooldown: 23,
        effects: [BUFF.CHARMED],
        description: 'Plays a beguiling song that Charms an enemy for #8sec,# making them more susceptible to other Songcraft skill effects.\r' +
          'The effect can travel to another #2# enemies within #10m,# excluding pets.\r' +
          'Can continue to be transferred up to #3 times.#',
      },
      {
        element: ELEMENT.WAVE,
        icon: Icon.HealingHymnWave,
        mana: 923,
        healing: null,
        description: 'Plays a revitalizing song that instantly restores a party member\'s Mana #+374.#\r' +
          'This effect can travel to another #2# allies within #10m,# excluding pets.\r' +
          'Can continue to be transferred up to #3 times.#',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Sonic Wave'),
    variants: [
      {
        element: ELEMENT.LIFE,
        icon: Icon.SonicWaveLife,
        description: 'Unleash a magically-enhanced wave, #removing 1 negative effect# from all allies in a wide corridor extending #15m# in front of you.',
      },
      {
        element: ELEMENT.MIST,
        icon: Icon.SonicWaveMist,
        description: 'Unleash a magically-enhanced wave, granting #Mist Sonic Wave# to all allies in a wide corridor extending #15m# in front of you.\r' +
          'Affected allies escape all current targeting by enemies, and can\'t be targeted by enemies again for #6sec.#\r' +
          'Only applies in PvP.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Double-Time'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.DoubleTimeFlame,
        description: 'Dramatically increases the caster\'s Move Speed for a short time, growing up to #+130%# Move Speed over #2sec#.\r' +
          'The duration resets, should the caster suffer a direct attack.',
      },
      {
        element: ELEMENT.WAVE,
        icon: Icon.DoubleTimeWave,
        cooldown: 40,
        description: 'Dramatically increases the caster\'s Move Speed for a short time, growing up to #+80%# Move Speed over #1 sec.#\r' +
          'Playing a perform skill increases the duration up to #5 sec.#',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Critical Discord'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.CriticalDiscordFlame,
        damage: { base: 345, attack: ATTACK.MAGIC, ratio: 65 },
        description: 'Deals ${damage} Magic Damage.\r' +
          'Inflicts #${effects[0]}# on hit, decreasing affected enemies\' Physical and Magic Defense #-30%# for #3sec.#',
      },
      {
        element: ELEMENT.QUAKE,
        icon: Icon.CriticalDiscordQuake,
        effectRange: 6,
        damage: { base: 345, attack: ATTACK.MAGIC, ratio: 65 },
        description: 'Deals ${damage} Magic Damage in a #${effectRange}m# area.\r' +
          'Inflicts #${effects[0]}# on hit, decreasing affected enemies\' Physical and Magic Defense #-15%# for #5sec.#',
      },
    ],
  },
]);

export default skills;
