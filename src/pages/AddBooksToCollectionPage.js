import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectCollectionById } from '../redux/collection/collection.reducer';

import Header from '../components/header/Header';
import SearchBar from '../components/searchBar/SearchBar';
import Books from '../components/book/Books';
import BookItem from '../components/book/BookItem';
import Button from '../components/button/Button';
import { addBooksToCollection } from '../redux/bookCollection/bookCollection.actions';
import { selectAllBookIds, selectBooksByIds } from '../redux/book/book.reducer';
import { selectBookIdsInCollection } from '../redux/bookCollection/bookCollection.reducer';

const AddBooksToCollectionPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const dispatch = useDispatch();

  const { collectionId } = useParams();

  const collection = useSelector((state) =>
    selectCollectionById(state.collection, collectionId)
  );

  // Select All book Ids
  const allBookIds = useSelector((state) => selectAllBookIds(state.book));

  // Select Book Ids that exist in current collection
  const bookIdsInCollection = useSelector((state) =>
    selectBookIdsInCollection(state.bookCollection, collection.id)
  );
  // Calculate ids that do not exist
  const bookIdsToShow = allBookIds.filter(function (obj) {
    return bookIdsInCollection.indexOf(obj) == -1;
  });

  // * Select books that are not added
  const booksToShow = useSelector((state) =>
    selectBooksByIds(state.book, bookIdsToShow)
  );

  const handleOnChange = (id) => {
    const exists = selectedIds.find((bookId) => bookId == id);

    if (exists) {
      const filteredBookIds = selectedIds.filter((bookId) => bookId != id);

      setSelectedIds([...filteredBookIds]);
    } else {
      setSelectedIds((currentState) => [...currentState, id]);
    }
  };

  const saveBooks = (collectionId) => {
    dispatch(addBooksToCollection(collectionId, selectedIds));
  };

  const headerTitle = `Add Books to '${collection.name}' Collection`;

  const filteredBooks = Object.values(booksToShow).filter((book) => {
    if (searchValue == '') {
      return book;
    } else if (book.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return book;
    }
  });

  return (
    <div className='main-section'>
      <Header title={headerTitle} subtitle='Select the books you want to add.'>
        <Button
          type='button'
          handleOnClick={() => saveBooks(collection.id)}
          cssStyle={`btn btn-blue ${
            selectedIds.length == 0 ? 'btn-disabled' : ''
          }`}
          buttonText='Save Books'
        />
      </Header>
      <div className='collection-table-actions'>
        <SearchBar
          placeholderText='Search for a book...'
          handleChange={setSearchValue}
        />
      </div>
      <Books>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              canSelectBook={true}
              handleOnChange={handleOnChange}
              selectedIds={selectedIds}
            />
          ))
        ) : (
          <p>
            No books to show. <Link to='/add-book'>Add new book</Link> to your
            collection.
          </p>
        )}
      </Books>
    </div>
  );
};

export default AddBooksToCollectionPage;
