import Collection from '../components/collection/Collection';
import SearchBar from '../components/searchBar/SearchBar';
import Header from '../components/header/Header';
import Button from '../components/button/Button';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { selectBooksByIds } from '../redux/book/book.reducer';
import { selectBookIdsByCollectionId } from '../redux/bookCollection/bookCollection.reducer';
import { selectCollectionById } from '../redux/collection/collection.reducer';
import { useState } from 'react';
import { removeCollection } from '../redux/collection/collection.actions';

const BookCollectionPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { collectionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select current collection
  const collection = useSelector((state) =>
    selectCollectionById(state.collection, collectionId)
  );

  // Select book ids in current collection
  const bookIds = useSelector((state) =>
    selectBookIdsByCollectionId(state.bookCollection, collection.id)
  );

  // Select books in current collection by book ids
  const books = useSelector((state) => selectBooksByIds(state.book, bookIds));

  const filteredBooks = books.filter((book) => {
    if (searchValue == '') {
      return book;
    } else if (book.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return book;
    }
  });

  // If collection does not exist navigate to default collection
  if (!collection) {
    return navigate('/');
  }

  let deleteCollectionButton = null;

  // Show deleteCollectionButton only on custom collections
  if (
    collection.id != 'defaultCollection' &&
    collection.id != 'completedCollection'
  ) {
    deleteCollectionButton = (
      <Button
        cssStyle='btn btn-red'
        buttonText='Delete Collection'
        handleOnClick={() =>
          dispatch(removeCollection(collection.id, navigate))
        }
      />
    );
  }

  return (
    <div className='main-section'>
      <Header
        title={collection.name}
        subtitle={
          collection.description ? collection.description : 'No description'
        }
      >
        <Link to='/add-book' className='btn btn-blue'>
          Create Book
        </Link>
        {deleteCollectionButton}
      </Header>
      <div className='collection-table-actions'>
        <SearchBar
          placeholderText='Search collection...'
          handleChange={setSearchValue}
        />
        {collection.id == 'defaultCollection' ||
        collection.id == 'completedCollection' ? null : (
          <Link to={`add-books/${collection.id}`} className='btn btn-default'>
            Add Books to Collection
          </Link>
        )}
      </div>

      <Collection books={filteredBooks} collection={collection} />
    </div>
  );
};

export default BookCollectionPage;
