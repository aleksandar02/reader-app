import Button from '../button/Button';
import Modal from '../modal/Modal';
import CollectionList from './CollectionList';
import CreateCollectionForm from '../collection/CreateCollectionForm';

import { useDispatch } from 'react-redux';
import { addBookToCollections } from '../../redux/bookCollection/bookCollection.actions';
import { toggleModal } from '../../redux/modal/modal.actions';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectModalData } from '../../redux/modal/modal.reducer';
import {
  selectAllCollectionIds,
  selectCollectionsByIds,
} from '../../redux/collection/collection.reducer';
import { selectCollectionIdsByBookId } from '../../redux/bookCollection/bookCollection.reducer';
import { BiPlus } from 'react-icons/bi';
import { BiMinus } from 'react-icons/bi';

const CollectionListModal = () => {
  const dispatch = useDispatch();

  const [selectedCollectionIds, setSelectedCollectionIds] = useState([]);
  const [toggleAddCollection, setToggleAddCollection] = useState(false);

  // Select Book
  const book = useSelector((state) => selectModalData(state));

  // Select all Collection Ids
  const allCollectionIds = useSelector((state) =>
    selectAllCollectionIds(state.collection)
  );

  // Select Collection Ids that have certain book
  const collectionIdsByBookId = useSelector((state) =>
    selectCollectionIdsByBookId(state.bookCollection, book.id)
  );

  // Filter Collection Ids that do not have certain book
  const filteredCollectionIds = allCollectionIds.filter(function (obj) {
    return (
      collectionIdsByBookId.indexOf(obj) == -1 && obj != 'completedCollection'
    );
  });

  // Select Collections that do not have this book (by )
  const collectionsToShow = useSelector((state) =>
    selectCollectionsByIds(state.collection, filteredCollectionIds)
  );

  const saveSelectedCollectionId = (id) => {
    const exists = selectedCollectionIds.find(
      (collectionId) => collectionId == id
    );

    if (exists) {
      const filteredCollectionIds = selectedCollectionIds.filter(
        (collectionId) => collectionId != id
      );

      setSelectedCollectionIds([...filteredCollectionIds]);
    } else {
      setSelectedCollectionIds((currentState) => [...currentState, id]);
    }
  };

  // Save Book to selected Collections
  const saveToCollections = (bookId) => {
    dispatch(addBookToCollections(bookId, selectedCollectionIds));
  };

  let toggleAddCollectionText = (
    <span>
      <BiPlus />
      Add collection
    </span>
  );

  if (toggleAddCollection) {
    toggleAddCollectionText = (
      <span>
        <BiMinus />
        Close form
      </span>
    );
  }

  return (
    <Modal
      title='Collections'
      subtitle='Select the collections to which you want to add the book.'
      closeModal={() => dispatch(toggleModal(false, ''))}
    >
      <CollectionList
        collectionsToShow={collectionsToShow}
        saveSelectedCollectionId={saveSelectedCollectionId}
        selectedIds={selectedCollectionIds}
      />
      <p
        className='toggleAddCollection'
        onClick={() => setToggleAddCollection(!toggleAddCollection)}
      >
        {toggleAddCollectionText}
      </p>
      {toggleAddCollection && (
        <div className='modal-add-collection'>
          <h3>Add New Collection</h3>
          <CreateCollectionForm
            setToggleAddCollection={setToggleAddCollection}
          />
        </div>
      )}
      <div className='align-right'>
        <Button
          type='button'
          handleOnClick={() => saveToCollections(book.id)}
          cssStyle={`btn btn-blue ${
            selectedCollectionIds.length == 0 ? 'btn-disabled' : ''
          }`}
          buttonText='Save'
        />
      </div>
    </Modal>
  );
};

export default CollectionListModal;
