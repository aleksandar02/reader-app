import {
  addBookToCollection,
  addBookToCollections,
  removeBookFromCollection,
  removeBookFromCollections,
} from '../bookCollection/bookCollection.actions';
import { removeBookNotes } from '../note/note.actions';
import { BookActionTypes } from './book.types';

// Action Creator that changes the book status (To read, Reading, Done)
export const changeBookStatus = (bookId, status) => (dispatch) => {
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
};

// Action Creator that saves new book
export const saveBook = (book, collectionIds) => (dispatch) => {
  dispatch({
    type: BookActionTypes.SAVE_BOOK,
    payload: book,
  });
  if (collectionIds.length > 0) {
    dispatch(addBookToCollections(book.id, collectionIds));
  }
};

// Action Creator that deletes the book completely
// i.e. Removes from all collections and deletes all book notes
export const deleteBook = (bookId, navigate) => (dispatch) => {
  dispatch({
    type: BookActionTypes.DELETE_BOOK,
    payload: bookId,
  });
  dispatch(removeBookFromCollections(bookId));
  dispatch(removeBookNotes(bookId));
  navigate('/');
};
