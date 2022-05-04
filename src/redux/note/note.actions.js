import { NoteActionTypes } from './note.types';

export const addNote = (bookId, note) => (dispatch) => {
  try {
    dispatch({
      type: NoteActionTypes.ADD_NOTE,
      payload: {
        bookId: bookId,
        note: note,
      },
    });
  } catch (err) {}
};
