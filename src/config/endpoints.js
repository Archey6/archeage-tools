export default {
  session: {
    authenticate: '/session/authenticate',
    createAccount: '/session/register',
    me: '/session/me',
  },
  service: {
    me: '/service/me',
    newsCreate: '/service/news',
    newsPage: '/service/news?page=${page}',
    newsPost: '/service/news/${postId}',
    newComment: '/service/comment',
    comment: '/service/comment/${commentId}',
    comments: '/service/comment/byPost/${postId}',
    item: 'https://qkpjfbkv29.execute-api.us-east-2.amazonaws.com/dev/api/item?ids=${itemIds}',
    itemCrops: '/service/items/crops',
    itemBuildings: 'https://qkpjfbkv29.execute-api.us-east-2.amazonaws.com/dev/api/items/buildings',
    recipeByProduct: '/service/recipe/product/${itemId}',
    recipeSearchByProduct: '/service/recipe/product',
    recipeByMaterial: '/service/recipe/material/${itemId}',
    recipeSearchByMaterial: '/service/recipe/material',
    recipeByVocation: '/service/recipe/vocation/${vocation}',
    recipe: '/service/recipe?ids=${recipeIds}',
    recipeCategories: '/service/recipe/categories',
    recipeByCategory: '/service/recipe/categories/${category}?cat1=${subCat1}&cat2=${subCat2}',
    vocations: '/service/vocations',
    searchByProduct: '/service/search/product',
    searchByMaterial: '/service/search/material',
    event: '/service/events/${eventId}',
    events: 'https://raw.githubusercontent.com/Archey6/archeage-tools/test-data/static/service/events.json',
    eventTypes: 'https://raw.githubusercontent.com/Archey6/archeage-tools/data/static/service/types.json',
    users: '/service/users?usernames=${names}',
    skills: '/service/skills?ids=${skillIds}',
    skillsets: '/service/skills/skillsets',
    classes: '/service/skills/classes',
    mounts: '/service/npcs/mounts',
    mountTypes: '/service/npcs/mounts/types',
    mountObtainTypes: '/service/npcs/mounts/obtainTypes',
    quest: '/service/quests?ids=${questIds}',
    questCategories: '/service/quests/categories',
    questDailies: '/service/quests/dailies',
    questRefData: '/service/quests/reference',
    title: '/service/titles?ids=${titleIds}',
    festivals: '/service/festivals',
    instances: '/service/instances',
    npc: '/service/npcs?ids=${npcIds}',
    doodad: '/service/doodads?ids=${doodadIds}',
    climates: '/service/zones/climates',
    continents: '/service/zones/continents',
    tradePacks: '/service/trade-packs',
    tradePackRef: '/service/trade-packs/reference',
    servers: 'https://raw.githubusercontent.com/fernandogfo/archeage-tools/data/static/service/servers.json',
    bluesaltBonds: '/service/blue-salt-bonds',
    cargoTimer: 'https://raw.githubusercontent.com/fernandogfo/archeage-tools/data/static/service/cargo-ship.json',
  },
};
