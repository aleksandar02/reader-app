import { createSelector } from 'reselect';
import { CollectionActionTypes } from './collection.types';

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
    'thirdCollection': {
      id: 'thirdCollection',
      name: 'Favourites',
      description: '',
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

    default:
      return state;
  }
};

// Input selector
const selectCollections = (state) => state;

export const selectCollectionById = createSelector(
  [selectCollections, (state, id) => id],
  (collection, id) => {
    if (id) {
      return collection.byId[id];
    } else {
      return collection.byId['defaultCollection'];
    }
  }
);

export default collectionReducer;
