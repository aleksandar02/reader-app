import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCollectionById } from '../redux/collection/collection.reducer';

import Header from '../components/header/Header';
import SearchBar from '../components/searchBar/SearchBar';
import Books from '../components/book/Books';
import Book from '../components/book/Book';
import Button from '../components/button/Button';
import { addBooksToCollection } from '../redux/bookCollection/bookCollection.actions';

const AddBooksToCollectionPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const dispatch = useDispatch();

  const { collectionId } = useParams();

  const collection = useSelector((state) =>
    selectCollectionById(state.collection, collectionId)
  );

  const books = useSelector((state) => state.book.byId);

  const isEmpty = Object.keys(books).length == 0;

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

  const filteredBooks = Object.values(books).filter((book) => {
    if (searchValue == '') {
      return book;
    } else if (book.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return book;
    }
  });

  return (
    <div className='main-content'>
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
        <SearchBar setSearchValue={setSearchValue} />
      </div>
      <Books>
        {isEmpty ? (
          <p>There are no books to show.</p>
        ) : (
          filteredBooks.map((book) => (
            <Book
              key={book.id}
              book={book}
              canSelectBook={true}
              handleOnChange={handleOnChange}
              selectedIds={selectedIds}
            />
          ))
        )}
      </Books>
    </div>
  );
};

export default AddBooksToCollectionPage;
