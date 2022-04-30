import { createSelector } from 'reselect';
import { BookActionTypes } from './book.types';

const initialState = {
  byId: {
    'book1': {
      id: 'book1',
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      isbn: 'SDCVXFDF12',
      status: 1,
    },
    'book2': {
      id: 'book2',
      title: 'The Great Gatsby',
      author: 'F. Skot Fitzgerald',
      isbn: 'VTYVGFFDF2',
      status: 2,
    },
    'book3': {
      id: 'book3',
      title: 'Harry Potter: Prisoner of Azkaban',
      author: 'J.K. Rowling',
      isbn: 'VCDFFFDF2D',
      status: 1,
    },
    'book4': {
      id: 'book4',
      title: 'Atomic Habits',
      author: 'James Clear',
      isbn: 'JVDVGASCF2',
      status: 2,
    },
    'book5': {
      id: 'book5',
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      isbn: 'ACXZVKDI45',
      status: 1,
    },
  },
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case BookActionTypes.MARK_BOOK_AS_DONE: {
      let updatedBook = {};

      Object.values(state.byId).forEach((book) => {
        if (book.id == action.payload) {
          updatedBook = { ...book, status: 2 };
        }
      });

      return {
        ...state,
        byId: { ...state.byId, [action.payload]: { ...updatedBook } },
      };
    }

    case BookActionTypes.MARK_BOOK_AS_UNDONE: {
      let updatedBook = {};

      Object.values(state.byId).forEach((book) => {
        if (book.id == action.payload) {
          updatedBook = { ...book, status: 1 };
        }
      });

      return {
        ...state,
        byId: { ...state.byId, [action.payload]: { ...updatedBook } },
      };
    }

    default:
      return state;
  }
};

const selectBooks = (state) => state;

export const selectBookById = createSelector(
  [selectBooks, (state, id) => id],
  (book, id) => book.byId[id]
);

export const selectBooksByIds = createSelector(
  [selectBooks, (state, ids) => ids],
  (book, ids) => {
    let selectedBooks = [];

    ids.forEach((id) => {
      selectedBooks = [...selectedBooks, book.byId[id]];
    });

    return selectedBooks;
  }
);

export default bookReducer;
