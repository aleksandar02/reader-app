import { BookCollectionTypes } from '../bookCollection/bookCollection.types';
import { v4 as uuid } from 'uuid';
import { toggleModal } from '../modal/modal.actions';

export const addBookToCollection = (collectionId, bookId) => (dispatch) => {
  try {
    // to local storage
    const id = uuid();

    dispatch({
      type: BookCollectionTypes.ADD_BOOK_TO_COLLECTION,
      payload: {
        collectionId: collectionId,
        bookId: bookId,
        bookCollectionId: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const addBooksToCollection = (collectionId, bookIds) => (dispatch) => {
  try {
    dispatch({
      type: BookCollectionTypes.ADD_BOOKS_TO_COLLECTION,
      payload: {
        collectionId: collectionId,
        bookIds: bookIds,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const addBookToCollections = (bookId, collectionIds) => (dispatch) => {
  try {
    dispatch({
      type: BookCollectionTypes.ADD_BOOK_TO_COLLECTIONS,
      payload: {
        bookId: bookId,
        collectionIds: collectionIds,
      },
    });
    dispatch(toggleModal(false, null));
  } catch (err) {
    console.log(err);
  }
};

export const removeBookFromCollection =
  (collectionId, bookId) => (dispatch) => {
    try {
      // to local storage
      dispatch({
        type: BookCollectionTypes.REMOVE_BOOK_FROM_COLLECTION,
        payload: {
          collectionId: collectionId,
          bookId: bookId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
