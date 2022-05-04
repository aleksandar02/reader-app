import {
  addBookToCollection,
  addBookToCollections,
  removeBookFromCollection,
} from '../bookCollection/bookCollection.actions';
import { BookActionTypes } from './book.types';

export const changeBookStatus = (bookId, status) => (dispatch) => {
  try {
    dispatch({
      type: BookActionTypes.CHANGE_BOOK_STATUS,
      payload: {
        bookId: bookId,
        status: status,
      },
    });

    if (status == 3) {
      dispatch(addBookToCollection('completedCollection', bookId));
    } else {
      dispatch(removeBookFromCollection('completedCollection', bookId));
    }
  } catch (err) {
    console.log(err);
  }
};

export const saveBook = (book, collectionIds) => (dispatch) => {
  try {
    dispatch({
      type: BookActionTypes.SAVE_BOOK,
      payload: book,
    });
    if (collectionIds.length > 0) {
      dispatch(addBookToCollections(book.id, collectionIds));
    }
  } catch (err) {
    console.log(err);
  }
};
