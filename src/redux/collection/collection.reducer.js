import { createSelector } from 'reselect';
import { CollectionActionTypes } from './collection.types';

// Initial/Default state
// It has two default collections ('Default' and 'Completed' collection) that cannot be deleted
const initialState = {
  byId: {
    'defaultCollection': {
      id: 'defaultCollection',
      name: 'All books',
      description:
        'Firstly, it is free! On top of that, Google Fonts are maintained and delivered.',
    },
    'completedCollection': {
      id: 'completedCollection',
      name: 'Completed books',
      description: 'All the books that you have read.',
    },
    'favouritesCollection': {
      id: 'favouritesCollection',
      name: 'Favourites',
      description: 'My favourite books.',
    },
  },
};

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CollectionActionTypes.ADD_COLLECTION:
      return {
        ...state,
        byId: { ...state.byId, [action.payload.id]: { ...action.payload } },
      };

    case CollectionActionTypes.REMOVE_COLLECTION: {
      let filteredCollections = {};

      // Filter Collections by collection id
      Object.values(state.byId).forEach((collection) => {
        if (collection.id != action.payload) {
          filteredCollections = {
            ...filteredCollections,
            [collection.id]: { ...collection },
          };
        }
      });

      return {
        ...state,
        byId: { ...filteredCollections },
      };
    }

    default:
      return state;
  }
};

const selectCollections = (state) => state;

// Selector that gets 'custom' collections,
// i.e. All Collections besides 'Default' and 'Completed' collection
export const selectCustomCollections = createSelector(
  [selectCollections],
  (collection) => {
    let customCollections = [];

    Object.values(collection.byId).forEach((collection) => {
      if (
        collection.id != 'defaultCollection' &&
        collection.id != 'completedCollection'
      ) {
        customCollections = [...customCollections, { ...collection }];
      }
    });

    return customCollections;
  }
);

// Selector that gets Collection by collection id
export const selectCollectionById = createSelector(
  [selectCollections, (state, id) => id],
  (collection, id) => {
    if (collection.byId[id]) {
      return collection.byId[id];
    } else {
      return collection.byId['defaultCollection'];
    }
  }
);

// Selector that gets Collections by array of collection ids
export const selectCollectionsByIds = createSelector(
  [selectCollections, (state, collectionIds) => collectionIds],
  (collection, collectionIds) => {
    let selectedCollections = [];

    collectionIds.forEach((id) => {
      selectedCollections = [...selectedCollections, collection.byId[id]];
    });

    return selectedCollections;
  }
);

// Selector that gets all Collection ids
export const selectAllCollectionIds = createSelector(
  [selectCollections],
  (collection) => {
    let allCollectionIds = [];

    Object.values(collection.byId).forEach((collection) => {
      allCollectionIds = [...allCollectionIds, collection.id];
    });

    return allCollectionIds;
  }
);

export default collectionReducer;
