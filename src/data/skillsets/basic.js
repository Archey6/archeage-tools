import { BUFF } from 'constants/skills';
import Beastsense from 'images/skill/shadowplay/Bloodthirst_Intensified.png';
import Snipe from 'images/skill/shadowplay/Ruthless_Assault.png';
import OwnersEscape from 'images/skill/auramancy/Teleportation.png';
import * as Icon from '../../images/skill/basic/';

export default Object.freeze([
  {
    id: 'Run',
    icon: Icon.Run,
    name: 'Run!',
    cooldown: 30,
    description: 'Increases Pet Move Speed #+50%# for #10sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.MountedArrowshot,
    name: 'Mounted Arrowshot',
    range: [0, 30],
    description: 'Fires an arrow at an enemy, dealing Physical Damage equal to #80%# of the rider\'s ranged attack.',
  },
  {
    icon: Icon.Overrun,
    name: 'Overrun',
    range: [0, 15],
    cooldown: 24,
    description: 'Triggers a charge that can Stun a distant enemy for #2sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Anabolica,
    name: 'Anabolica',
    cooldown: 60,
    description: 'Increases the pet\'s and rider\'s Attack +#30%# for #30sec#.\r' +
      'Canceled if you dismount.',
  },
  {
    icon: Icon.Dash,
    name: 'Dash',
    cooldown: 30,
    description: 'Triggers a forward charge for #3sec# that makes you invincible. Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.MountedAttack,
    name: 'Mounted Attack',
    cooldown: 2,
    description: 'Deals #350%# of Melee Attack as Physical Damage with a chance of Tripping targets while mounted.',
  },
  {
    icon: Icon.DropBack,
    name: 'Drop Back',
    cooldown: 18,
    description: 'Triggers a #12 m# backwards leap to escape danger.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    id: 'Drop Back Gallant',
    icon: Icon.DropBack,
    name: 'Drop Back',
    cooldown: 20,
    description: 'A clever Leomorph can jump farther than other Leomorphs.\r' +
      'Triggers a #15 m# backwards leap to escape danger.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: OwnersEscape,
    name: 'Owner\'s Escape',
    cooldown: 30,
    description: 'Teleports the rider #18 meters# forward, out of the saddle.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: OwnersEscape,
    name: 'Enhanced Owner\'s Escape',
    cooldown: 30,
    description: 'Teleports the rider forward #18m# and increases rider\'s Move Speed.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.StealthMove,
    name: 'Stealth Move',
    cooldown: 180,
    description: 'Stealths both mount and rider for #30sec#.\r' +
      'Decreases Move Speed #-30%#.\r' +
      'Stealth ends if you attack or are attacked.\r' +
      'Can\'t be used in combat.',
  },
  {
    icon: Icon.StealthMove,
    name: 'Improved Stealth Move',
    cooldown: 90,
    description: 'Stealths both mount and rider for #30sec#.\r' +
      'Decreases Move Speed #-15%#.\r' +
      'Stealth ends if you attack or are attacked.\r' +
      'Can\'t be used in combat.',
  },
  {
    icon: Icon.Slam,
    name: 'Slam',
    cooldown: 18,
    description: 'Instructs the pangolin to wind up, then smash the ground to create an earthquake. Damages all enemies within 3m and decreases their Move Speed -30% for 3 seconds.',
  },
  {
    icon: Icon.Pangocharge,
    name: 'Pangocharge',
    range: [0, 15],
    cooldown: 24,
    description: 'Triggers a pounce that inflicts damage on a distant target and knocks it packwards (Trips for 2 seconds instead if it\'s Slowed).\r' +
      'This skill counts as a Push effect.\r' +
      'Can\'t be used while carrying a trade pack.',
    combos: [
      {
        buff: BUFF.SLOWED,
        causes: BUFF.TRIPPED,
        text: 'Trips targets that are ${b}.',
      },
    ],
  },
  {
    icon: Icon.StubbornDash,
    name: 'Stubborn Dash',
    cooldown: 60,
    description: 'Triggers a 3 second forward roll.\r' +
      'Increases the pangolin and rider\'s Defense and Magic Defense #+5000#, and grants immunity to Fear and Slow.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Patience,
    name: 'Patience',
    effectRange: 32,
    cooldown: 30,
    description: 'Grants defense buffs to allies within 16m for 5 seconds. Effect ends early if you dismount.',
  },
  {
    icon: Icon.BackKick,
    name: 'Back Kick',
    effectRange: 4,
    castTime: 0.3,
    cooldown: 18,
    effects: [BUFF.TRIPPED],
    description: 'Strengthens the mount\'s rearward kick, dealing Physical Damage and Tripping the enemy.',
  },
  {
    icon: Icon.MountedDefense,
    name: 'Mounted Defense',
    cooldown: 60,
    description: 'Grants mount and rider immunity to Ranged Damage, Knockback, and Stun for #5sec#.',
  },
  {
    icon: Icon.Breakthrough,
    name: 'Breakthrough',
    cooldown: 30,
    description: 'Charges forward for #3sec#, breaking through enemy lines. Inflicts Knockback and Trip on affected enemies.\r' +
      'This skill counts as a Push effect.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.MountedFireArrow,
    name: 'Mounted Fire Arrow',
    range: [0, 30],
    cooldown: 12,
    effects: [BUFF.BURNING],
    description: 'Fires a burning arrow to deal +#500%# of Ranged Attack as Physical Damage; also deals +#200%# of Ranged Attack as damage over #5 seconds#.',
  },
  {
    id: 'Mounted Fire Arrow Gallant',
    icon: Icon.MountedFireArrow,
    name: 'Mounted Fire Arrow',
    range: [0, 30],
    cooldown: 8,
    effects: [BUFF.BURNING],
    description: 'Fires a burning arrow to deal +#300%# of Ranged Attack as Physical Damage; also deals +#200%# of Ranged Attack as damage over #5 seconds#.',
  },
  {
    icon: Snipe,
    name: 'Snipe',
    range: [0, 35],
    cooldown: 24,
    description: 'Shoots an arrow a great distance and deals damage equal to #700%# of your Ranged Attack.',
    combos: [
      {
        buff: BUFF.BURNING,
        text: 'Inflicts additional +50% damage on ${b} targets.',
      },
    ],
  },
  {
    icon: Snipe,
    name: 'Precise Shot',
    range: [0, 35],
    cooldown: 24,
    description: 'Fires arrows that deal damage equal to #700%# Ranged Attack.\r' +
      'Places a Ranged Attack tag on the target.',
  },
  {
    icon: Icon.ElegantLeap,
    name: 'Elegant Leap',
    cooldown: 15,
    description: 'Triggers a long, elegant leap #25 m# forward.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Bite,
    name: 'Gnaw',
    range: [0, 5],
    cooldown: 18,
    description: 'Sharpens caster\'s bite, dealing Physical Damage and additional damage over #14sec#.',
  },
  {
    icon: Icon.Bite,
    name: 'Gnaw',
    id: 'GnawBleed',
    range: [0, 5],
    cooldown: 18,
    effects: [BUFF.BLEEDING],
    description: 'Sharpens caster\'s bite, dealing Physical Damage and additional damage over #14sec#.',
    combos: [
      {
        buff: BUFF.BLEEDING,
        causes: BUFF.BLEEDING,
        text: 'Increases severity of Bleed effects on targets.',
      },
    ],
  },
  {
    icon: Icon.Bite,
    name: 'Vicious Bite',
    range: [0, 5],
    cooldown: 18,
    effects: [BUFF.BLEEDING],
    description: 'Sharpens caster\'s bite, dealing Physical Damage and additional damage over #14sec#.',
  },
  {
    icon: Icon.BoarsBore,
    name: 'Boar\'s Bore',
    range: [0, 15],
    cooldown: 24,
    description: 'Triggers a charge to a distant enemy, dealing Physical Damage, and inflicting Stun for #2sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.UnstoppableRace,
    name: 'Unstoppable Race',
    cooldown: 60,
    description: 'Charges forward for #3sec#.\r' +
      'Immediately cancels Snared and grants immunity to the effect during the charge.\r' +
      'Cannot be used while carrying a trade pack.',
  },
  {
    icon: Icon.WarCry,
    name: 'War Cry',
    effectRange: 32,
    cooldown: 30,
    description: 'Grants offensive buffs to allies within 16m for 5 seconds. Effect ends early if you dismount.',
  },
  {
    icon: Icon.HealthRegen,
    name: 'Health Regen',
    cooldown: 15,
    description: 'Healths pet\'s health.',
  },
  {
    icon: Icon.JoustingLanceCharge,
    name: 'Jousting Lance Charge',
    cooldown: 30,
    description: 'Triggers a charge with a Jousting Lance toward a target for #3sec#, dealing damage.\r' +
      'Removes Imprison and grants immunity to Fear while Charging.\r' +
      'Consumes one #Jousting Lance#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Run,
    name: 'Ghostly Steps',
    cooldown: 30,
    description: 'Increases Move Speed #+80%#, then gradually decreases it over #10sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Breakthrough,
    name: 'Hereafter Dash',
    cooldown: 60,
    description: 'Dashes into the otherworld for #3sec#, then reappears.\r' +
      'Slightly increases Move Speed. Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.StealthMove,
    name: 'Nui\'s Veil',
    cooldown: 30,
    description: 'Stealths both mount and rider for #30sec#.\r' +
      'Stealth ends if you move, attack, or are attacked.\r' +
      'Can\'t be used in combat.',
  },
  {
    icon: Icon.Run,
    name: 'Keep Running!',
    cooldown: 30,
    description: 'Increases Pet Move Speed #+20%# for #15sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Run,
    name: 'Cloudstrike Dash',
    cooldown: 30,
    description: 'Increases Move Speed #+70%#, then gradually decreases it over #10sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.ElectricDash,
    name: 'Electric Dash',
    cooldown: 30,
    description: 'Darts forward #12 meters#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.StandStrong,
    name: 'Stand Strong',
    cooldown: 60,
    description: 'Grants Stun Immunity to a mount and rider for #5sec# and reduces received damage #-50%#.',
  },
  {
    icon: Icon.WindStrike,
    name: 'Wind Strike',
    cooldown: 24,
    description: 'Leaps into the sky and sends gusts of wind towards the land. Slows enemies in the target area and deals Magic Damage.',
  },
  {
    icon: Icon.Glide,
    name: 'Glide',
    cooldown: 60,
    description: 'Glide through the skies with your mount for #5min#. Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Skydash,
    name: 'Skydash',
    cooldown: 60,
    description: 'Increases glide speed +#50%# for #5sec#. Can only be used while gliding.',
  },
  {
    icon: Icon.FleeingYata,
    name: 'Hippity Hop',
    cooldown: 2,
    description: 'Triggers a jump. Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.DropBack,
    name: 'Hop Back',
    cooldown: 18,
    description: 'Triggers a #12 m# backwards leap to escape danger. Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.CarrotCare,
    name: 'Carrot Care',
    cooldown: 60,
    channeled: true,
    description: 'Allows the rabbit to munch on a carrot for 10 seconds, restoring health and mana.\r' +
      'Movement cancels the skill.',
  },
  {
    icon: Icon.Run,
    name: 'Warmfuzzy Dash',
    cooldown: 30,
    description: 'Instructs the bear to pick up its master and run for #5sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.MountedDefense,
    name: 'I Am the Bear!',
    cooldown: 60,
    description: 'Absorbs mount\'s and rider\'s received Magic Damage and grants immunity to Trip, Snare, and Impale for #5sec#.',
  },
  {
    icon: Icon.Roll,
    name: 'Roll',
    cooldown: 30,
    description: 'Roll forward for #3sec#, pushing targets out of your path and decreasing their Move Speeds -10% for 3 seconds.\r' +
      'This skill counts as a Push effect.\r' +
      'You cannot use this skill while carrying trade packs.',
  },
  {
    icon: Icon.CarryAndRun,
    name: 'Carry and Run',
    cooldown: 60,
    description: 'Instructs the bear to pick up its master and run for #4sec#. Its master becomes invincible, but the bear receives 2x damage.\r' +
      'Can\'t be triggered if the master is wearing a trade pack.',
  },
  {
    icon: Icon.JoustingLanceCharge,
    name: 'Reckless Charge',
    range: [0, 15],
    cooldown: 24,
    description: 'Triggers a ferocious charge into a target. Deals damage and knocks the target back. Can inflict more damage with #Dash# active.\r' +
      'This skill counts as a Push effect.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Beastsense,
    name: 'Beastsense',
    cooldown: 60,
    description: 'Widens rider\'s Stealth detection range #+50%#.',
  },
  {
    id: 'Dash Gallant',
    icon: Icon.Dash,
    name: 'Dash',
    cooldown: 30,
    description: 'Triggers an invincible forward run for #3sec#.\r' +
      'Shares a cooldown with Leader of the Pack.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Anabolica,
    name: 'Leader of the Pack',
    effectRange: 15,
    cooldown: 30,
    description: 'Triggers a roar to gather all raid members\' mounts within 15m into a pack for 10 seconds.\r' +
      'Increases pack\'s Move Speed #+20%#.\r' +
      'Increases the pack leader\'s speed as more mounts join the pack.\r' +
      'Shares a cooldown with Dash.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Run,
    name: 'Thunder Dash',
    cooldown: 30,
    description: 'Increases Move Sped #+80%#, then gradually decreases it over #10sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Breakthrough,
    name: 'Ram',
    cooldown: 30,
    description: 'Charges forward, breaking through enemy lines for #3sec#. Rammed enemies receive damage and are knocked back.\r' +
      'This skill counts as a Push effect.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.TerrifyingRoar,
    name: 'Terrifying Roar',
    channeled: true,
    cooldown: 60,
    description: 'Lets out a great roar, inflicting Fear on charging enemy mounts for 8 seconds.\r' +
      'Canceled by movement.',
  },
  {
    icon: Icon.FleeingYata,
    name: 'Fleeing Yata',
    cooldown: 2,
    description: 'Triggers a jump. Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.ScanShips,
    name: 'Scan Ships',
    cooldown: 60,
    description: 'Displays all ships and drydocks within #100m# for #10sec#.',
  },
  {
    icon: Icon.DolphinDash,
    name: 'Dolphin Dash',
    cooldown: 25,
    description: 'Triggers a forward dash with powerful tailfin strokes.\r' +
      'Increases Move Speed +#50%# for #10# seconds.\r' +
      'Can\'t be used while doing tricks.',
  },
  {
    icon: Icon.ProduceUltrasonicWaves,
    name: 'Produce ultrasonic waves',
    cooldown: 3,
    description: 'Send ultrasonic waves forward.',
  },
  {
    icon: Icon.Acrobatics,
    name: 'Acrobatics',
    cooldown: 10,
    description: 'Utilizes the fins to launch a powerful leap. May trigger different tricks depending on the dolphin\'s mood.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
]);
