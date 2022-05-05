import { createSelector } from 'reselect';
import { BookCollectionTypes } from './bookCollection.types';
import {
  filterBookCollectionsById,
  getBookCollectionIdToRemove,
} from './bookCollection.utils';
import { v4 as uuid } from 'uuid';

// Initial/Default state
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
          [newBookCollectionItem.id]: { ...newBookCollectionItem },
        },
      };
    }

    case BookCollectionTypes.ADD_BOOKS_TO_COLLECTION: {
      let bookCollections = {};
      const { collectionId, bookIds } = action.payload;

      // Foreach Book Id create new Book Collection
      bookIds.forEach((bookId) => {
        const newBookCollection = {
          id: uuid(),
          bookId: bookId,
          collectionId: collectionId,
        };

        // Add New Book Collection to Book Collections
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

      // Foreach Collection Id create new Book Collection
      collectionIds.forEach((collectionId) => {
        const newBookCollection = {
          id: uuid(),
          bookId: bookId,
          collectionId: collectionId,
        };

        // Add New Book Collection to Book Collections
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
      let bookCollectionIdToRemove = getBookCollectionIdToRemove(
        state.byId,
        action.payload.collectionId,
        action.payload.bookId
      );

      // Filter Book Collections by id
      // i.e. Remove Book Collection by id
      let newBookCollections = filterBookCollectionsById(
        state.byId,
        bookCollectionIdToRemove
      );

      return {
        ...state,
        byId: { ...newBookCollections },
      };
    }

    case BookCollectionTypes.REMOVE_COLLECTION_FROM_BOOK_COLLECTIONS: {
      let filteredBookCollections = {};

      // Remove All Certain Collection Instances from Book Collections (by collection id)
      Object.values(state.byId).forEach((bookCollection) => {
        if (bookCollection.collectionId != action.payload) {
          filteredBookCollections = {
            ...filteredBookCollections,
            [bookCollection.id]: { ...bookCollection },
          };
        }
      });

      return {
        ...state,
        byId: { ...filteredBookCollections },
      };
    }

    case BookCollectionTypes.REMOVE_BOOK_FROM_COLLECTIONS: {
      let filteredBookCollections = {};

      // Remove All Book Instances from Book Collections (by book id)
      // i.e. Remove Book from All Collections
      Object.values(state.byId).forEach((bookCollection) => {
        if (bookCollection.bookId != action.payload) {
          filteredBookCollections = {
            ...filteredBookCollections,
            [bookCollection.id]: { ...bookCollection },
          };
        }
      });

      return {
        ...state,
        byId: { ...filteredBookCollections },
      };
    }

    default:
      return state;
  }
};

const selectBookCollections = (state) => state;

// Selector that gets Book ids that belong to certain Collection
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

// Selector that gets All Collection Ids that have certain Book
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
