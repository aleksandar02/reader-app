import { v4 as uuid } from 'uuid';
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

      // save to local storage

      dispatch({
        type: CollectionActionTypes.ADD_COLLECTION,
        payload: newCollection,
      });
    } catch (err) {
      console.log(err);
    }
  };
