import { v4 as uuid } from 'uuid';
import {
  addBookToCollection,
  removeBookFromCollection,
} from '../bookCollection/bookCollection.actions';
import { BookActionTypes } from './book.types';

export const markBookAsDone = (bookId) => (dispatch) => {
  try {
    dispatch({
      type: BookActionTypes.MARK_BOOK_AS_DONE,
      payload: bookId,
    });
    dispatch(addBookToCollection('completedCollection', bookId));
  } catch (err) {
    console.log(err);
  }
};

export const markBookAsUndone = (bookId) => (dispatch) => {
  try {
    dispatch({
      type: BookActionTypes.MARK_BOOK_AS_UNDONE,
      payload: bookId,
    });
    dispatch(removeBookFromCollection('completedCollection', bookId));
  } catch (err) {
    console.log(err);
  }
};
