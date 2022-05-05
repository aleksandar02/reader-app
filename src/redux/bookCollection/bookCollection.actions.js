import { BookCollectionTypes } from '../bookCollection/bookCollection.types';
import { v4 as uuid } from 'uuid';
import { toggleModal } from '../modal/modal.actions';

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

export const addBooksToCollection = (collectionId, bookIds) => (dispatch) => {
  dispatch({
    type: BookCollectionTypes.ADD_BOOKS_TO_COLLECTION,
    payload: {
      collectionId: collectionId,
      bookIds: bookIds,
    },
  });
};

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

export const removeBookFromCollections = (bookId) => (dispatch) => {
  dispatch({
    type: BookCollectionTypes.REMOVE_BOOK_FROM_COLLECTIONS,
    payload: bookId,
  });
};

// remove collection
export const removeCollectionFromBookCollections =
  (collectionId) => (dispatch) => {
    dispatch({
      type: BookCollectionTypes.REMOVE_COLLECTION_FROM_BOOK_COLLECTIONS,
      payload: collectionId,
    });
  };
