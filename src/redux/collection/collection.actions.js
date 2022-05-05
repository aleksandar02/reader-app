import { v4 as uuid } from 'uuid';
import { removeCollectionFromBookCollections } from '../bookCollection/bookCollection.actions';
import { CollectionActionTypes } from './collection.types';

export const addCollection =
  (collectionName, description = '') =>
  (dispatch) => {
    try {
      const newCollection = {
        id: uuid(),
        name: collectionName,
        description: description,
      };

      dispatch({
        type: CollectionActionTypes.ADD_COLLECTION,
        payload: newCollection,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const removeCollection = (collectionId, navigate) => (dispatch) => {
  dispatch({
    type: CollectionActionTypes.REMOVE_COLLECTION,
    payload: collectionId,
  });
  dispatch(removeCollectionFromBookCollections(collectionId));
  navigate('/');
};
