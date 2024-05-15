export default [
  {
    name: 'Schedule',
    path: '/schedule',
  },
   {
     name: 'Calculators',
     children: [
  //     { name: 'Skill Calculator', path: '/skills' },
       { name: 'Crafting Folio', path: '/folio' },
       { name: 'Trade Packs', path: '/trade-packs' },
       { name: 'Land Tax', path: '/taxes' },
  //     { name: 'Blue Salt Bonds', path: '/bonds' },
     ]
  // },
  // {
  //   name: 'Mounts',
  //   path: '/mounts',
  // },
  // {
  //   name: 'My Farm',
  //   path: '/my-farm',
  // },
  // {
  //   name: 'Dailies',
  //   path: '/dailies',
   },
  {
    name: 'Guides',
    path: '/guides',
    // Temporarily hide dropdown menu until guides rework
    // mobileName: 'All Guides',
     children: [
    //   { name: 'Gameplay', path: '/guides/gameplay' },
      { name: 'Daily Quests', path: '/dailies' },
    //   { name: 'Classes', path: '/guides/classes' },
    //   { name: 'Mounts', path: '/mounts' },
    //   { name: 'Dungeons', path: '/guides/dungeons' },
    //   { name: 'World Bosses', path: '/guides/world-bosses' },
    //   { name: 'Instances', path: '/guides/instances' },
     ],
  },
];

export const banners = [
  { name: 'Event Schedule', info: 'Timers and schedule for daily events.', path: '/schedule' },
  { name: 'Crafting Folio', info: 'View the crafting folio and plan out recipes.', path: '/folio' },
  { name: 'Trade Pack Calculator', info: 'Calculate that sweet pack run money.', path: '/trade-packs' },
  { name: 'Daily Checklist', info: 'Keep track of your daily quests.', path: '/dailies' },
  // { name: 'Skill Builder', info: 'Build and share skillset setups.', path: '/skills' },
  // { name: 'Helper Gallery', info: 'See some sheet with infor', path: '/mounts' },
  // { name: 'My Farm Timers', info: 'Keep time of your planted crops, trees, and livestock.', path: '/my-farm' },
  { name: 'Tax Calculator', info: 'Calculate the cost of property tax.', path: '/taxes' },
];
