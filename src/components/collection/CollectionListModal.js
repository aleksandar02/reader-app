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
import CreateCollectionForm from '../collection/CreateCollectionForm';
import { BiPlus } from 'react-icons/bi';
import { BiMinus } from 'react-icons/bi';

const CollectionListModal = () => {
  const dispatch = useDispatch();

  const book = useSelector((state) => selectModalData(state));
  const [selectedIds, setSelectedIds] = useState([]);
  const [toggleAddCollection, setToggleAddCollection] = useState(false);

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
        handleOnChange={handleOnChange}
        selectedIds={selectedIds}
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
            selectedIds.length == 0 ? 'btn-disabled' : ''
          }`}
          buttonText='Save'
        />
      </div>
    </Modal>
  );
};

export default CollectionListModal;
