import { v4 as uuid } from 'uuid';
import { removeCollectionFromBookCollections } from '../bookCollection/bookCollection.actions';
import { CollectionActionTypes } from './collection.types';

// Action Creator that adds new Collection
export const addCollection =
  (collectionName, description = '') =>
  (dispatch) => {
    const newCollection = {
      id: uuid(),
      name: collectionName,
      description: description,
    };

    dispatch({
      type: CollectionActionTypes.ADD_COLLECTION,
      payload: newCollection,
    });
  };

// Action Creator that deletes the Collection completely
export const removeCollection = (collectionId, navigate) => (dispatch) => {
  dispatch({
    type: CollectionActionTypes.REMOVE_COLLECTION,
    payload: collectionId,
  });
  dispatch(removeCollectionFromBookCollections(collectionId));
  navigate('/');
};
