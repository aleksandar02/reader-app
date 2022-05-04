import { useDispatch } from 'react-redux';
import { addBookToCollections } from '../../redux/bookCollection/bookCollection.actions';
import { toggleModal } from '../../redux/modal/modal.actions';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import CollectionList from './CollectionList';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectModalData } from '../../redux/modal/modal.reducer';
import {
  selectAllCollectionIds,
  selectCollectionsByIds,
} from '../../redux/collection/collection.reducer';
import { selectCollectionIdsByBookId } from '../../redux/bookCollection/bookCollection.reducer';

const CollectionListModal = () => {
  const dispatch = useDispatch();

  const book = useSelector((state) => selectModalData(state));
  const [selectedIds, setSelectedIds] = useState([]);

  // Select All collection Ids
  const allCollectionIds = useSelector((state) =>
    selectAllCollectionIds(state.collection)
  );

  // Select collection ids that have bookId
  const collectionIdsByBookId = useSelector((state) =>
    selectCollectionIdsByBookId(state.bookCollection, book.id)
  );

  // Calculate ids that do not exist
  const collectionIdsToShow = allCollectionIds.filter(function (obj) {
    return (
      collectionIdsByBookId.indexOf(obj) == -1 && obj != 'completedCollection'
    );
  });

  // * Select collections that do not have this book
  const collectionsToShow = useSelector((state) =>
    selectCollectionsByIds(state.collection, collectionIdsToShow)
  );

  const handleOnChange = (id) => {
    const exists = selectedIds.find((collectionId) => collectionId == id);

    if (exists) {
      const filteredCollectionIds = selectedIds.filter(
        (collectionId) => collectionId != id
      );

      setSelectedIds([...filteredCollectionIds]);
    } else {
      setSelectedIds((currentState) => [...currentState, id]);
    }
  };

  const saveToCollections = (bookId) => {
    dispatch(addBookToCollections(bookId, selectedIds));
  };

  return (
    <Modal
      title='Collections'
      subtitle='Select the collections to which you want to add the book.'
      closeModal={() => dispatch(toggleModal(false, ''))}
    >
      <CollectionList
        collectionsToShow={collectionsToShow}
        handleOnChange={handleOnChange}
        selectedIds={selectedIds}
      />
      <div className='align-right'>
        <Button
          type='button'
          handleOnClick={() => saveToCollections(book.id)}
          cssStyle={`btn btn-blue ${
            selectedIds.length == 0 ? 'btn-disabled' : ''
          }`}
          buttonText='Save'
        />
      </div>
    </Modal>
  );
};

export default CollectionListModal;
