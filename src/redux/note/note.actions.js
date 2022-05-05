import { NoteActionTypes } from './note.types';

export const addNote = (bookId, note) => (dispatch) => {
  dispatch({
    type: NoteActionTypes.ADD_NOTE,
    payload: {
      bookId: bookId,
      note: note,
    },
  });
};

export const removeNote = (noteId) => (dispatch) => {
  dispatch({
    type: NoteActionTypes.REMOVE_NOTE,
    payload: noteId,
  });
};

export const removeBookNotes = (bookId) => (dispatch) => {
  dispatch({
    type: NoteActionTypes.REMOVE_BOOK_NOTES,
    payload: bookId,
  });
};
