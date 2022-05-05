import { NoteActionTypes } from './note.types';

// Action Creator that adds Note on certain Book
export const addNote = (bookId, note) => (dispatch) => {
  dispatch({
    type: NoteActionTypes.ADD_NOTE,
    payload: {
      bookId: bookId,
      note: note,
    },
  });
};

// Action Creator that removes Note on certain Book
export const removeNote = (noteId) => (dispatch) => {
  dispatch({
    type: NoteActionTypes.REMOVE_NOTE,
    payload: noteId,
  });
};

// Action Creator that removes all Book Notes
// When deleting a Book -> Delete all Book Notes
export const removeBookNotes = (bookId) => (dispatch) => {
  dispatch({
    type: NoteActionTypes.REMOVE_BOOK_NOTES,
    payload: bookId,
  });
};
