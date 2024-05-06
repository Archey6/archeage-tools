import { setNotification } from 'actions/notification';
import config from 'config';
import {
  DATA_BONDS,
  DATA_BUILDINGS,
  DATA_CARGO_TIMER,
  DATA_CATEGORIES,
  DATA_CLIMATES,
  DATA_CONTINENTS,
  DATA_CROP,
  DATA_DOODAD,
  DATA_EVENT_REPLACE,
  DATA_EVENT_TYPES,
  DATA_EVENTS,
  DATA_FESTIVALS,
  DATA_INSTANCES,
  DATA_ITEM,
  DATA_MOUNTS,
  DATA_NPC,
  DATA_QUEST,
  DATA_QUEST_DAILIES,
  DATA_QUESTCAT,
  DATA_QUESTREF,
  DATA_RECIPE,
  DATA_SERVERS,
  DATA_SKILL,
  DATA_SKILLSETS,
  DATA_TITLE,
  DATA_TRADE_PACKS,
  DATA_VOCATION,
  DATA_VOCATION_RECIPE,
} from 'constants/gameData';
import { ITEM } from 'constants/items';
import { NOTIFICATION_TYPE } from 'constants/notification';
import debounce from 'lodash.debounce';
import { pathOr } from 'ramda';
import {
  arrayToMap,
  mapValue,
  reduceMounts,
} from 'utils/array';
import {
  hasProperty,
  objectHasProperties,
} from 'utils/object';
import { substitute } from 'utils/string';
import xhr from 'utils/xhr';
import store from '../store';

const { dispatch } = store;

/** Item Batching **/
let itemQueue = new Set();

const fetchItemQueue = debounce(() => {
  dispatch(fetchItems(Array.from(itemQueue)));
  itemQueue = new Set();
}, 50);

export const fetchItem = (itemId) => {
  if (!itemId || itemId === 'undefined' || typeof itemId !== 'number') return;
  itemQueue.add(itemId);

  fetchItemQueue();
};

export const fetchItems = (...items) => (dispatch, getState) => {
  const { items: storedItems } = getState().gameData;

  let itemIds = Array.isArray(items[0]) ? new Set(items[0]) : new Set(items);
  // filter out already fetched items
  itemIds = Array.from(itemIds).filter(id => !storedItems[id]);
  const chunk = 100;
  for (let i = 0, j = itemIds.length; i < j; i += chunk) {
    const itemIdStr = itemIds.slice(i, i + chunk).join(',');
	
	console.log(substitute(config.endpoints.service.item, { itemIds: itemIdStr }));
    xhr.get(substitute(config.endpoints.service.item, { itemIds: itemIdStr }))
    .then(({ data }) => {
	  console.log({data});
      dispatch({ type: DATA_ITEM, data: arrayToMap(data) });
    })
    .catch(() => {
      dispatch(setNotification('Failed to fetch item data.', NOTIFICATION_TYPE.WARNING));
    });
  }
};

export const searchItems = (query, searchType) => (dispatch) => new Promise((resolve, reject) => {
  const endpoint = (searchType === 'product') ? config.endpoints.service.searchByProduct
    : config.endpoints.service.searchByMaterial;

  xhr.get(`${endpoint}?query=${encodeURI(query)}`)
  .then(({ data }) => {
    dispatch({ type: DATA_ITEM, data: arrayToMap(data) });
    resolve(data);
  })
  .catch(() => reject());
});

export const fetchCropItems = () => (dispatch, getState) => {
  const { crops } = getState().gameData;

  // do not fetch again
  if (crops.length > 0) return;

  xhr.get(config.endpoints.service.itemCrops)
  .then(({ data: cropIds }) => {
    const modifiedIds = [...cropIds, ITEM.MINERS_FARMHOUSE];
    dispatch(fetchItems(modifiedIds));
    dispatch({ type: DATA_CROP, crops: modifiedIds });
  });
};

export const fetchBuildingItems = () => (dispatch, getState) => {
  const { buildings } = getState().gameData;

  // do not fetch again
  if (buildings.length > 0) return;
  //console.log(config.endpoints.service.itemBuildings);
  //console.log('1----');
  xhr.get(config.endpoints.service.itemBuildings)
  .then(({ data: buildingIds }) => {
	//console.log({ data: buildingIds });
    dispatch(fetchItems(buildingIds));
    dispatch({ type: DATA_BUILDINGS, buildings: buildingIds });
  });
};

/** Recipe Batching **/
let recipeQueue = new Set();

const fetchRecipeQueue = debounce(() => {
  dispatch(fetchRecipes(Array.from(recipeQueue)));
  recipeQueue = new Set();
}, 50);

export const fetchRecipe = (recipeId) => {
  if (!recipeId || recipeId === 'undefined') return;
  recipeQueue.add(recipeId);

  fetchRecipeQueue();
};

export const fetchRecipes = (...recipes) => (dispatch, getState) => {
  const { recipes: storedRecipes } = getState().gameData;

  let recipeIds = Array.isArray(recipes[0]) ? new Set(recipes[0]) : new Set(recipes);
  // filter out already fetched recipes
  recipeIds = Array.from(recipeIds).filter(id => !storedRecipes[id]);
  const chunk = 100;
  for (let i = 0, j = recipeIds.length; i < j; i += chunk) {
    const recipeIdStr = recipeIds.slice(i, i + chunk).join(',');

    xhr.get(substitute(config.endpoints.service.recipe, { recipeIds: recipeIdStr }))
    .then(({ data }) => {
      dispatch({ type: DATA_RECIPE, data: arrayToMap(data) });
    })
    .catch(() => {
      dispatch(setNotification('Failed to fetch recipe data.', NOTIFICATION_TYPE.WARNING));
    });
  }
};

export const searchRecipes = (query, searchType) => (dispatch, getState) => {
  const endpoint = (searchType === 'product') ? config.endpoints.service.recipeSearchByProduct
    : config.endpoints.service.recipeSearchByMaterial;

  const key = `${searchType}-${query}`;
  if (hasProperty(getState().gameData.vocationRecipes, key)) {
    return;
  }

  xhr.get(`${endpoint}?query=${encodeURI(query)}`)
  .then(({ data }) => {
    dispatch({ type: DATA_VOCATION_RECIPE, vocation: key, recipes: data });
    dispatch(fetchRecipes(data));
  })
  .catch(() => {
  });
};

export const fetchRecipeByVocation = (vocation) => (dispatch, getState) => {
  if (hasProperty(getState().gameData.vocationRecipes, vocation)) {
    return;
  }

  xhr.get(substitute(config.endpoints.service.recipeByVocation, { vocation }))
  .then(({ data }) => {
    dispatch({ type: DATA_VOCATION_RECIPE, vocation, recipes: data });
    dispatch(fetchRecipes(data));
  })
  .catch(() => {
  });
};

export const fetchRecipeByProduct = (itemId) => (dispatch, getState) => {
  const key = `product-${itemId}`;
  if (hasProperty(getState().gameData.vocationRecipes, key)) {
    return;
  }

  xhr.get(substitute(config.endpoints.service.recipeByProduct, { itemId }))
  .then(({ data }) => {
    dispatch({ type: DATA_VOCATION_RECIPE, vocation: key, recipes: data });
    dispatch(fetchRecipes(data));
  })
  .catch(() => {
  });
};

export const fetchRecipeByMaterial = (itemId) => (dispatch, getState) => {
  const key = `material-${itemId}`;
  if (hasProperty(getState().gameData.vocationRecipes, key)) {
    return;
  }

  xhr.get(substitute(config.endpoints.service.recipeByMaterial, { itemId }))
  .then(({ data }) => {
    dispatch({ type: DATA_VOCATION_RECIPE, vocation: key, recipes: data });
    dispatch(fetchRecipes(data));
  })
  .catch(() => {
  });
};

export const fetchRecipeByCategory = (category, subCat1, subCat2) => (dispatch, getState) => {
  const key = `category-${category}-${subCat1}-${subCat2}`;
  if (hasProperty(getState().gameData.vocationRecipes, key)) {
    return;
  }

  xhr.get(substitute(config.endpoints.service.recipeByCategory, { category, subCat1, subCat2 }))
  .then(({ data }) => {
    dispatch({ type: DATA_VOCATION_RECIPE, vocation: key, recipes: data });
    dispatch(fetchRecipes(data));
  })
  .catch(() => {
  });
};

export const fetchVocations = () => (dispatch, getState) => {
  const { vocations } = getState().gameData;

  // don't re-fetch vocation list
  if (vocations.length !== 0) return;

  xhr.get(config.endpoints.service.vocations)
  .then(({ data }) => {
    dispatch({ type: DATA_VOCATION, vocations: data });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch vocation data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const fetchCategories = () => (dispatch, getState) => {
  const { categories } = getState().gameData;

  if (objectHasProperties(categories)) return;

  xhr.get(config.endpoints.service.recipeCategories)
  .then(({ data }) => {
    dispatch({ type: DATA_CATEGORIES, categories: arrayToMap(data.categories), subCategories: arrayToMap(data.types) });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch category data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const fetchEventTypes = () => (dispatch, getState) => {
  const { eventTypes } = getState().gameData;

  if (objectHasProperties(eventTypes)) return;

  xhr.get(config.endpoints.service.eventTypes)
  .then(({ data }) => {
    dispatch({ type: DATA_EVENT_TYPES, eventTypes: arrayToMap(data) });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch event type data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const fetchEvents = () => (dispatch, getState) => {
  const { events } = getState().gameData;

  if (objectHasProperties(events)) return;

  xhr.get(config.endpoints.service.events)
  .then(({ data }) => {
    dispatch({ type: DATA_EVENTS, events: arrayToMap(data) });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch events data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const setEvent = (event) => (dispatch) => {
  dispatch({ type: DATA_EVENT_REPLACE, event });
};

/** Skill Batching **/

let skillQueue = new Set();

const fetchSkillQueue = debounce(() => {
  dispatch(fetchSkills(Array.from(skillQueue)));
  skillQueue = new Set();
}, 50);

export const fetchSkill = (skillId) => {
  if (!skillId || skillId === 'undefined') return;
  skillQueue.add(skillId);

  fetchSkillQueue();
};

export const fetchSkills = (...skills) => (dispatch, getState) => {
  const { skills: storedSkills, skillsets } = getState().gameData;

  if (!objectHasProperties(skillsets)) {
    dispatch(fetchSkillsets());
  }

  let skillIds = Array.isArray(skills[0]) ? new Set(skills[0]) : new Set(skills);
  // filter out already fetched skills
  skillIds = Array.from(skillIds).filter(id => !storedSkills[id]);
  const chunk = 100;
  for (let i = 0, j = skillIds.length; i < j; i += chunk) {
    const skillIdStr = skillIds.slice(i, i + chunk).join(',');

    xhr.get(substitute(config.endpoints.service.skills, { skillIds: skillIdStr }))
    .then(({ data }) => {
      dispatch({ type: DATA_SKILL, data: arrayToMap(data) });
    })
    .catch(() => {
      dispatch(setNotification('Failed to fetch skill data.', NOTIFICATION_TYPE.WARNING));
    });
  }
};

export const fetchSkillsets = () => (dispatch, getState) => {
  const { skillsets } = getState().gameData;

  if (objectHasProperties(skillsets)) return;

  xhr.get(config.endpoints.service.skillsets)
  .then(({ data: skillsets }) => {
    xhr.get(config.endpoints.service.classes)
    .then(({ data: classes }) => {
      dispatch({ type: DATA_SKILLSETS, skillsets: arrayToMap(skillsets), classes });
    });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch skillset data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const findClassName = (skillsetIds) => (_, getState) => {
  const { classes, skillsets } = getState().gameData;

  const classObj = classes.find(c => c.skillsetIds.every(skillSet => skillsetIds.includes(skillSet)));

  if (classObj) {
    return classObj.name;
  } else {
    console.error('Class not found for skillsets: ', skillsetIds, skillsetIds.map(ski => skillsets[ski].name));
  }
};

export const getSkillsets = () =>
  dispatch((_, getState) => {
    const { skillsets } = getState().gameData;
    return skillsets;
  });

export const fetchMounts = () => (dispatch, getState) => {
  const { mounts } = getState().gameData;

  if (mounts.mounts.length > 0) return;

  xhr.get(config.endpoints.service.mounts)
  .then(({ data: mounts }) => {
    xhr.get(config.endpoints.service.mountTypes)
    .then(({ data: mountTypes }) => {
      xhr.get(config.endpoints.service.mountObtainTypes)
      .then(({ data: obtainTypes }) => {
        dispatch({
          type: DATA_MOUNTS,
          mounts: reduceMounts(mounts),
          mountTypes: mapValue(mountTypes, 'id', 'name'),
          obtainTypes: arrayToMap(obtainTypes),
        });
      })
      .catch(() => dispatch(setNotification('Failed to fetch mount data.', NOTIFICATION_TYPE.WARNING)));
    })
    .catch(() => dispatch(setNotification('Failed to fetch mount data.', NOTIFICATION_TYPE.WARNING)));
  })
  .catch(() => dispatch(setNotification('Failed to fetch mount data.', NOTIFICATION_TYPE.WARNING)));
};

/** Quest Batching **/

let questQueue = new Set();

const fetchQuestQueue = debounce(() => {
  dispatch(fetchQuests(Array.from(questQueue)));
  questQueue = new Set();
}, 50);

export const fetchQuest = (questId) => {
  if (!questId || questId === 'undefined') return;
  questQueue.add(questId);

  fetchQuestQueue();
};

export const fetchQuests = (...quests) => (dispatch, getState) => {
  const { quests: storedQuests, questCategories, rewardTypes } = getState().gameData;

  if (!objectHasProperties(questCategories)) {
    dispatch(fetchQuestCategories());
  }

  if (!objectHasProperties(rewardTypes)) {
    dispatch(fetchQuestRefData());
  }

  let questIds = Array.isArray(quests[0]) ? new Set(quests[0]) : new Set(quests);
  // filter out already fetched quests
  questIds = Array.from(questIds).filter(id => !storedQuests[id]);
  const chunk = 100;
  for (let i = 0, j = questIds.length; i < j; i += chunk) {
    const questIdStr = questIds.slice(i, i + chunk).join(',');

    xhr.get(substitute(config.endpoints.service.quest, { questIds: questIdStr }))
    .then(({ data }) => {
      dispatch({ type: DATA_QUEST, quests: arrayToMap(data) });
    })
    .catch(() => {
      dispatch(setNotification('Failed to fetch quest data.', NOTIFICATION_TYPE.WARNING));
    });
  }
};

export const fetchQuestCategories = () => (dispatch, getState) => {
  const { questCategories } = getState().gameData;

  if (objectHasProperties(questCategories)) return;

  xhr.get(config.endpoints.service.questCategories)
  .then(({ data }) => {
    dispatch({ type: DATA_QUESTCAT, questCategories: arrayToMap(data) });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch quest category data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const fetchQuestRefData = () => (dispatch, getState) => {
  const { rewardTypes } = getState().gameData;

  if (objectHasProperties(rewardTypes)) return;

  xhr.get(config.endpoints.service.questRefData)
  .then(({ data: { rewardTypes, criteriaTypes } }) => {
    dispatch({ type: DATA_QUESTREF, rewardTypes: arrayToMap(rewardTypes), criteriaTypes: arrayToMap(criteriaTypes) });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch quest reference data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const fetchDailyQuests = () => (dispatch) => {
  xhr.get(config.endpoints.service.questDailies)
  .then(({ data: categories }) => {
    let quests = [];
    categories.forEach(cat => {
      quests = quests.concat(cat.quests);
      cat.quests = cat.quests.map(q => q.id);
    });
    dispatch({ type: DATA_QUEST, quests: arrayToMap(quests) });
    dispatch({ type: DATA_QUEST_DAILIES, dailies: categories });
  })
  .catch((e) => {
    dispatch(setNotification('Failed to fetch daily quest data.', NOTIFICATION_TYPE.WARNING));
    console.error(e);
  });
};

export const fetchInstances = () => (dispatch) => {
  xhr.get(config.endpoints.service.instances)
  .then(({ data }) => {
    dispatch({ type: DATA_INSTANCES, instances: arrayToMap(data) });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch instance data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const fetchFestivals = () => (dispatch) => {
  xhr.get(config.endpoints.service.festivals)
  .then(({ data }) => {
    dispatch({ type: DATA_FESTIVALS, festivals: arrayToMap(data) });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch festival data.', NOTIFICATION_TYPE.WARNING));
  });
};

/** Title Batching **/

let titleQueue = new Set();

const fetchTitleQueue = debounce(() => {
  dispatch(fetchTitles(Array.from(titleQueue)));
  titleQueue = new Set();
}, 50);

export const fetchTitle = (titleId) => {
  if (!titleId || titleId === 'undefined') return;
  titleQueue.add(titleId);

  fetchTitleQueue();
};

export const fetchTitles = (...titles) => (dispatch, getState) => {
  const { titles: storedTitles } = getState().gameData;

  let titleIds = Array.isArray(titles[0]) ? new Set(titles[0]) : new Set(titles);
  // filter out already fetched titles
  titleIds = Array.from(titleIds).filter(id => !storedTitles[id]);
  const chunk = 100;
  for (let i = 0, j = titleIds.length; i < j; i += chunk) {
    const titleIdStr = titleIds.slice(i, i + chunk).join(',');

    xhr.get(substitute(config.endpoints.service.title, { titleIds: titleIdStr }))
    .then(({ data }) => {
      dispatch({ type: DATA_TITLE, titles: arrayToMap(data) });
    })
    .catch(() => {
      dispatch(setNotification('Failed to fetch title data.', NOTIFICATION_TYPE.WARNING));
    });
  }
};

/** NPC Batching **/

let npcQueue = new Set();

const fetchNpcQueue = debounce(() => {
  dispatch(fetchNpcs(Array.from(npcQueue)));
  npcQueue = new Set();
}, 50);

export const fetchNpc = (npcId) => {
  if (!npcId || npcId === 'undefined') return;
  npcQueue.add(npcId);

  fetchNpcQueue();
};

export const fetchNpcs = (...npcs) => (dispatch, getState) => {
  const { npcs: storedNpcs } = getState().gameData;

  let npcIds = Array.isArray(npcs[0]) ? new Set(npcs[0]) : new Set(npcs);
  // filter out already fetched npcs
  npcIds = Array.from(npcIds).filter(id => !storedNpcs[id]);
  const chunk = 100;
  for (let i = 0, j = npcIds.length; i < j; i += chunk) {
    const npcIdStr = npcIds.slice(i, i + chunk).join(',');

    xhr.get(substitute(config.endpoints.service.npc, { npcIds: npcIdStr }))
    .then(({ data }) => {
      dispatch({ type: DATA_NPC, npcs: arrayToMap(data) });
    })
    .catch(() => {
      dispatch(setNotification('Failed to fetch npc data.', NOTIFICATION_TYPE.WARNING));
    });
  }
};

/** Doodad Batching **/

let doodadQueue = new Set();

const fetchDoodadQueue = debounce(() => {
  dispatch(fetchDoodads(Array.from(doodadQueue)));
  doodadQueue = new Set();
}, 50);

export const fetchDoodad = (doodadId) => {
  if (!doodadId || doodadId === 'undefined') return;
  doodadQueue.add(doodadId);

  fetchDoodadQueue();
};

export const fetchDoodads = (...doodads) => (dispatch, getState) => {
  const { doodads: fetchedDoodads } = getState().gameData;

  let doodadIds = Array.isArray(doodads[0]) ? new Set(doodads[0]) : new Set(doodads);
  // filter out already fetched doodads
  doodadIds = Array.from(doodadIds).filter(id => !fetchedDoodads[id]);
  const chunk = 100;
  for (let i = 0, j = doodadIds.length; i < j; i += chunk) {
    const doodadIdStr = doodadIds.slice(i, i + chunk).join(',');

    xhr.get(substitute(config.endpoints.service.doodad, { doodadIds: doodadIdStr }))
    .then(({ data }) => {
      dispatch({ type: DATA_DOODAD, doodads: arrayToMap(data) });
    })
    .catch(() => {
      dispatch(setNotification('Failed to fetch doodad data.', NOTIFICATION_TYPE.WARNING));
    });
  }
};

/** Zones **/
export const fetchContinents = () => (dispatch, getState) => {
  const { continents } = getState().gameData;

  if (objectHasProperties(continents)) return;

  xhr.get(config.endpoints.service.continents)
  .then(({ data }) => {
    let zones = [];
    data.forEach(continent => {
      zones = zones.concat(continent.zones);
      continent.zones = continent.zones.map(z => z.id);
    });
    dispatch({ type: DATA_CONTINENTS, continents: arrayToMap(data), zones: arrayToMap(zones) });
  })
  .catch((e) => {
    console.error(e);
    dispatch(setNotification('Failed to fetch continent zone data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const fetchClimates = () => (dispatch, getState) => {
  const { climates } = getState().gameData;

  if (objectHasProperties(climates)) return;

  xhr.get(config.endpoints.service.climates)
  .then(({ data }) => {
    dispatch({ type: DATA_CLIMATES, climates: arrayToMap(data) });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch climate data.', NOTIFICATION_TYPE.WARNING));
  });
};

/** Trade Packs **/
export const fetchTradePacks = () => (dispatch, getState) => {
  const { tradePacks } = getState().gameData;

  if (objectHasProperties(tradePacks)) return;

  xhr.get(config.endpoints.service.tradePackRef)
  .then(({ data: refData }) => {
    refData.types = arrayToMap(refData.types);
    refData.freshness = arrayToMap(refData.freshness);

    xhr.get(config.endpoints.service.tradePacks)
    .then(({ data }) => {
      dispatch({ type: DATA_TRADE_PACKS, data, refData });
    })
    .catch(() => {
      dispatch(setNotification('Failed to fetch trade pack data.', NOTIFICATION_TYPE.WARNING));
    });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch trade pack reference data.', NOTIFICATION_TYPE.WARNING));
  });
};

/* Servers */
export const fetchServers = () => (dispatch, getState) => {
  const { servers } = getState().gameData;

  if (objectHasProperties(servers)) return;

  xhr.get(config.endpoints.service.servers)
  .then(({ data: servers }) => {
    dispatch({ type: DATA_SERVERS, servers: arrayToMap(servers) });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch server data.', NOTIFICATION_TYPE.WARNING));
  });
};

/* Bluesalt Bonds */
export const fetchBonds = () => (dispatch) => {
  xhr.get(config.endpoints.service.bluesaltBonds)
  .then(({ data: bonds }) => {
    dispatch({ type: DATA_BONDS, bonds });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch Blue Salt Bonds data.', NOTIFICATION_TYPE.WARNING));
  });
};

export const updateBonds = (bonds) => (dispatch) => {
  xhr.post(config.endpoints.service.bluesaltBonds, bonds)
  .then(() => {
    dispatch(fetchBonds());
  })
  .catch((e) => {
    dispatch(setNotification(pathOr('Failed to update bonds.', ['data', 'errorMessage'])(e), NOTIFICATION_TYPE.ERROR));
  });
};

/* Cargo Ship Timer */
export const fetchCargoTimer = () => (dispatch) => {
  xhr.get(config.endpoints.service.cargoTimer)
  .then(({ data: cargoTimers }) => {
    dispatch({ type: DATA_CARGO_TIMER, cargoTimers: arrayToMap(cargoTimers, 'serverId') });
  })
  .catch(() => {
    dispatch(setNotification('Failed to fetch Cargo Ship timer.', NOTIFICATION_TYPE.WARNING));
  });
};

export const updateCargoTimer = (cargoTimer) => (dispatch) => {
  xhr.post(config.endpoints.service.cargoTimer, cargoTimer)
  .then(() => {
    dispatch(fetchCargoTimer());
  })
  .catch((e) => {
    dispatch(setNotification(pathOr('Failed to cargo ship timer.', ['data',
      'errorMessage'])(e), NOTIFICATION_TYPE.ERROR));
  });
};
