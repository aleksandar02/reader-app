import { BookCollectionTypes } from '../bookCollection/bookCollection.types';
import { v4 as uuid } from 'uuid';
import { toggleModal } from '../modal/modal.actions';

// Action Creator that adds Book to Collection
export const addBookToCollection = (collectionId, bookId) => (dispatch) => {
  const id = uuid();

  dispatch({
    type: BookCollectionTypes.ADD_BOOK_TO_COLLECTION,
    payload: {
      collectionId: collectionId,
      bookId: bookId,
      bookCollectionId: id,
    },
  });
};

// Action Creator that adds multiple books to certain Collection
export const addBooksToCollection = (collectionId, bookIds) => (dispatch) => {
  dispatch({
    type: BookCollectionTypes.ADD_BOOKS_TO_COLLECTION,
    payload: {
      collectionId: collectionId,
      bookIds: bookIds,
    },
  });
};

// Action Creator that adds Book to multiple Collections
export const addBookToCollections = (bookId, collectionIds) => (dispatch) => {
  dispatch({
    type: BookCollectionTypes.ADD_BOOK_TO_COLLECTIONS,
    payload: {
      bookId: bookId,
      collectionIds: collectionIds,
    },
  });
  dispatch(toggleModal(false, null));
};

// Action Creator that removes Book from Certain Collection
export const removeBookFromCollection =
  (collectionId, bookId) => (dispatch) => {
    dispatch({
      type: BookCollectionTypes.REMOVE_BOOK_FROM_COLLECTION,
      payload: {
        collectionId: collectionId,
        bookId: bookId,
      },
    });
  };

// Action Creator that removes Book from All Collections
export const removeBookFromCollections = (bookId) => (dispatch) => {
  dispatch({
    type: BookCollectionTypes.REMOVE_BOOK_FROM_COLLECTIONS,
    payload: bookId,
  });
};

// Remove Collection from Book Collections
// When deleting a Collection remove all Book Collections
// by collection id
export const removeCollectionFromBookCollections =
  (collectionId) => (dispatch) => {
    dispatch({
      type: BookCollectionTypes.REMOVE_COLLECTION_FROM_BOOK_COLLECTIONS,
      payload: collectionId,
    });
  };
