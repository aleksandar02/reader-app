import { combineReducers } from 'redux';
import collectionReducer from './collection/collection.reducer';
import bookReducer from './book/book.reducer';
import bookCollectionReducer from './bookCollection/bookCollection.reducer';

export default combineReducers({
  collection: collectionReducer,
  book: bookReducer,
  bookCollection: bookCollectionReducer,
});
