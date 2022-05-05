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

    case NoteActionTypes.REMOVE_NOTE: {
      let filteredNotes = {};

      // Filter Notes by id
      Object.values(state.byId).forEach((note) => {
        if (note.id != action.payload) {
          filteredNotes = { ...filteredNotes, [note.id]: { ...note } };
        }
      });

      return {
        ...state,
        byId: { ...filteredNotes },
      };
    }

    case NoteActionTypes.REMOVE_BOOK_NOTES: {
      let filteredNotes = {};

      // Filter Notes by book id
      // i.e. Remove all Book Notes for certain Book
      Object.values(state.byId).forEach((note) => {
        if (note.bookId != action.payload) {
          filteredNotes = { ...filteredNotes, [note.id]: { ...note } };
        }
      });

      return {
        ...state,
        byId: { ...filteredNotes },
      };
    }

    default:
      return state;
  }
};

const selectNotes = (state) => state;

// Select all Notes for certain Book
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
