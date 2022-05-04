import { createSelector } from 'reselect';
import { BookCollectionTypes } from './bookCollection.types';
import {
  filterBookCollectionById,
  getRemoveBookCollectionId,
} from './bookCollection.utils';
import { v4 as uuid } from 'uuid';

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
    case BookCollectionTypes.ADD_BOOK_TO_COLLECTION: {
      const newBookCollectionItem = {
        id: action.payload.bookCollectionId,
        bookId: action.payload.bookId,
        collectionId: action.payload.collectionId,
      };

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.bookCollectionId]: { ...newBookCollectionItem },
        },
      };
    }

    case BookCollectionTypes.ADD_BOOKS_TO_COLLECTION: {
      let bookCollections = {};
      const { collectionId, bookIds } = action.payload;

      bookIds.forEach((bookId) => {
        const newBookCollection = {
          id: uuid(),
          bookId: bookId,
          collectionId: collectionId,
        };

        bookCollections = {
          ...bookCollections,
          [newBookCollection.id]: { ...newBookCollection },
        };
      });

      return {
        ...state,
        byId: { ...state.byId, ...bookCollections },
      };
    }
    case BookCollectionTypes.ADD_BOOK_TO_COLLECTIONS: {
      let bookCollections = {};
      const { bookId, collectionIds } = action.payload;

      collectionIds.forEach((collectionId) => {
        const newBookCollection = {
          id: uuid(),
          bookId: bookId,
          collectionId: collectionId,
        };

        bookCollections = {
          ...bookCollections,
          [newBookCollection.id]: { ...newBookCollection },
        };
      });

      return {
        ...state,
        byId: { ...state.byId, ...bookCollections },
      };
    }

    case BookCollectionTypes.REMOVE_BOOK_FROM_COLLECTION: {
      let removeBookCollectionId = getRemoveBookCollectionId(
        state.byId,
        action.payload.collectionId,
        action.payload.bookId
      );

      let newBookCollection = filterBookCollectionById(
        state.byId,
        removeBookCollectionId
      );

      return {
        ...state,
        byId: { ...newBookCollection },
      };
    }

    default:
      return state;
  }
};

const selectBookCollections = (state) => state;

export const selectBookIdsByCollectionId = createSelector(
  [selectBookCollections, (state, collectionId) => collectionId],
  (bookCollection, collectionId) => {
    const filteredCollections = Object.values(bookCollection.byId).filter(
      (bookCollection) => bookCollection.collectionId == collectionId
    );

    const bookIds = filteredCollections.map((collection) => collection.bookId);

    return bookIds;
  }
);

export const selectBookIdsInCollection = createSelector(
  [selectBookCollections, (state, collectionId) => collectionId],
  (bookCollection, collectionId) => {
    let bookIds = [];

    Object.values(bookCollection.byId).forEach((bookCollection) => {
      if (bookCollection.collectionId == collectionId) {
        bookIds = [...bookIds, bookCollection.bookId];
      }
    });

    return bookIds;
  }
);

export const selectCollectionIdsByBookId = createSelector(
  [selectBookCollections, (state, bookId) => bookId],
  (bookCollection, bookId) => {
    let collectionIds = [];

    Object.values(bookCollection.byId).forEach((bookCollection) => {
      if (bookCollection.bookId == bookId) {
        collectionIds = [...collectionIds, bookCollection.collectionId];
      }
    });

    return collectionIds;
  }
);

export default bookCollectionReducer;
