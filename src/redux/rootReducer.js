import { combineReducers } from 'redux';
import collectionReducer from './collection/collection.reducer';
import bookReducer from './book/book.reducer';
import bookCollectionReducer from './bookCollection/bookCollection.reducer';
import modalReducer from './modal/modal.reducer';
import { noteReducer } from './note/note.reducer';

export default combineReducers({
  collection: collectionReducer,
  book: bookReducer,
  bookCollection: bookCollectionReducer,
  modal: modalReducer,
  note: noteReducer,
});
