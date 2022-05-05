import Header from '../components/header/Header';
import SearchBar from '../components/searchBar/SearchBar';
import Books from '../components/book/Books';
import BookItem from '../components/book/BookItem';
import Button from '../components/button/Button';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectCollectionById } from '../redux/collection/collection.reducer';
import { addBooksToCollection } from '../redux/bookCollection/bookCollection.actions';
import { selectAllBookIds, selectBooksByIds } from '../redux/book/book.reducer';
import { selectBookIdsByCollectionId } from '../redux/bookCollection/bookCollection.reducer';

const AddBooksToCollectionPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedBookIds, setSelectedBookIds] = useState([]);

  const dispatch = useDispatch();
  const { collectionId } = useParams();

  // Select Collection
  const collection = useSelector((state) =>
    selectCollectionById(state.collection, collectionId)
  );

  // Select All Book Ids
  const allBookIds = useSelector((state) => selectAllBookIds(state.book));

  // Select Book Ids that exist in current Collection
  const bookIdsInCollection = useSelector((state) =>
    selectBookIdsByCollectionId(state.bookCollection, collection.id)
  );

  // Filter book ids that do not exist in current collection
  const filteredBookIds = allBookIds.filter(function (obj) {
    return bookIdsInCollection.indexOf(obj) == -1;
  });

  // Select books that do not exist in current collection (by filteredBookIds)
  const booksToShow = useSelector((state) =>
    selectBooksByIds(state.book, filteredBookIds)
  );

  const handleOnChange = (id) => {
    const exists = selectedBookIds.find((bookId) => bookId == id);

    if (exists) {
      const filteredBookIds = selectedBookIds.filter((bookId) => bookId != id);

      setSelectedBookIds([...filteredBookIds]);
    } else {
      setSelectedBookIds((currentState) => [...currentState, id]);
    }
  };

  const saveBooks = (collectionId) => {
    dispatch(addBooksToCollection(collectionId, selectedBookIds));
  };

  const headerTitle = `Add Books to '${collection.name}' Collection`;

  // Filter books to show by Search Value
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
            selectedBookIds.length == 0 ? 'btn-disabled' : ''
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
              selectedIds={selectedBookIds}
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
