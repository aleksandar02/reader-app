import { createSelector } from 'reselect';
import { v4 as uuid } from 'uuid';
import { NoteActionTypes } from './note.types';

const initialState = {
  byId: {},
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case NoteActionTypes.ADD_NOTE: {
      const newNote = {
        id: uuid(),
        bookId: action.payload.bookId,
        noteText: action.payload.note,
        createdAt: new Date(),
      };

      return {
        ...state,
        byId: { ...state.byId, [newNote.id]: { ...newNote } },
      };
    }

    default:
      return state;
  }
};

const selectNotes = (state) => state;

export const selectAllNotes = createSelector(
  [selectNotes, (state, bookId) => bookId],
  (note, bookId) => {
    let notes = [];

    Object.values(note.byId).forEach((note) => {
      if (note.bookId == bookId) {
        notes = [...notes, note];
      }
    });

    return notes;
  }
);
