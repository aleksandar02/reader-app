import { createSelector } from 'reselect';
import { BookActionTypes } from './book.types';

const initialState = {
  byId: {
    'book1': {
      id: 'book1',
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      isbn: 'SDCVXFDF12',
      cover_i: 10521270,
      status: 1,
    },
    'book2': {
      id: 'book2',
      title: 'The Great Gatsby',
      author: 'F. Skot Fitzgerald',
      isbn: 'VTYVGFFDF2',
      cover_i: 8432047,
      status: 3,
    },
    'book3': {
      id: 'book3',
      title: 'Harry Potter: Prisoner of Azkaban',
      author: 'J.K. Rowling',
      isbn: 'VCDFFFDF2D',
      cover_i: 10580435,
      status: 1,
    },
    'book4': {
      id: 'book4',
      title: 'Alchemist',
      author: 'Ben Jonson',
      isbn: 'JVDVGASCF2',
      cover_i: 7463992,
      status: 3,
    },
    'book5': {
      id: 'book5',
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      isbn: 'ACXZVKDI45',
      cover_i: 8315302,
      status: 1,
    },
  },
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case BookActionTypes.SAVE_BOOK:
      return {
        ...state,
        byId: { ...state.byId, [action.payload.id]: { ...action.payload } },
      };

    case BookActionTypes.DELETE_BOOK: {
      let filteredBooks = {};

      Object.values(state.byId).forEach((book) => {
        if (book.id != action.payload) {
          filteredBooks = {
            ...filteredBooks,
            [book.id]: { ...book },
          };
        }
      });

      return {
        ...state,
        byId: { ...filteredBooks },
      };
    }

    case BookActionTypes.CHANGE_BOOK_STATUS: {
      let updatedBook = {};

      Object.values(state.byId).forEach((book) => {
        if (book.id == action.payload.bookId) {
          updatedBook = { ...book, status: action.payload.status };
        }
      });

      return {
        ...state,
        byId: { ...state.byId, [action.payload.bookId]: { ...updatedBook } },
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

export const selectAllBookIds = createSelector([selectBooks], (book) => {
  let allBookIds = [];

  Object.values(book.byId).forEach((book) => {
    allBookIds = [...allBookIds, book.id];
  });

  return allBookIds;
});

export default bookReducer;
