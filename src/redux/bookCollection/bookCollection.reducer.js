import { createSelector } from 'reselect';
import { BookCollectionTypes } from './bookCollection.types';

const initialState = {
  byId: {
    'bookCollections1': {
      id: 'bookCollections1',
      bookId: 'book1',
      collectionId: 'defaultCollection',
    },
    'bookCollections2': {
      id: 'bookCollections2',
      bookId: 'book2',
      collectionId: 'completedCollection',
    },
    'bookCollections3': {
      id: 'bookCollections3',
      bookId: 'book3',
      collectionId: 'defaultCollection',
    },
    'bookCollections4': {
      id: 'bookCollections4',
      bookId: 'book4',
      collectionId: 'defaultCollection',
    },
    'bookCollections5': {
      id: 'bookCollections5',
      bookId: 'book5',
      collectionId: 'defaultCollection',
    },
    'bookCollections6': {
      id: 'bookCollections6',
      bookId: 'book2',
      collectionId: 'defaultCollection',
    },
    'bookCollections7': {
      id: 'bookCollections7',
      bookId: 'book4',
      collectionId: 'completedCollection',
    },
  },
};

const bookCollectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case BookCollectionTypes.ADD_BOOK_TO_COLLECTION:
      return state;

    default:
      return state;
  }
};

const selectBookCollections = (state) => state;

export const selectBookIdsByCollectionId = createSelector(
  [selectBookCollections, (state, collectionId) => collectionId],
  (bookCollections, collectionId) => {
    const filteredCollections = Object.values(bookCollections.byId).filter(
      (bookCollection) => bookCollection.collectionId == collectionId
    );

    const bookIds = filteredCollections.map((collection) => collection.bookId);

    return bookIds;
  }
);

export default bookCollectionReducer;
