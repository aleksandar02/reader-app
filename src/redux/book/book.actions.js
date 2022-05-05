import {
  addBookToCollection,
  addBookToCollections,
  removeBookFromCollection,
  removeBookFromCollections,
} from '../bookCollection/bookCollection.actions';
import { removeBookNotes } from '../note/note.actions';
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
  dispatch({
    type: BookActionTypes.SAVE_BOOK,
    payload: book,
  });
  if (collectionIds.length > 0) {
    dispatch(addBookToCollections(book.id, collectionIds));
  }
};

export const deleteBook = (bookId, navigate) => (dispatch) => {
  dispatch({
    type: BookActionTypes.DELETE_BOOK,
    payload: bookId,
  });
  dispatch(removeBookFromCollections(bookId));
  dispatch(removeBookNotes(bookId));
  navigate('/');
};
