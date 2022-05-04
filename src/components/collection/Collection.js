import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectBooksByIds } from '../../redux/book/book.reducer';
import { selectBookIdsByCollectionId } from '../../redux/bookCollection/bookCollection.reducer';
import { selectCollectionById } from '../../redux/collection/collection.reducer';
import Books from '../book/Books';
import BookItem from '../book/BookItem';
import SearchBar from '../searchBar/SearchBar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';

const Collection = () => {
  const [searchValue, setSearchValue] = useState('');
  const { collectionId } = useParams();

  const collection = useSelector((state) =>
    selectCollectionById(state.collection, collectionId)
  );

  const bookIds = useSelector((state) =>
    selectBookIdsByCollectionId(state.bookCollection, collection.id)
  );

  const books = useSelector((state) => selectBooksByIds(state.book, bookIds));

  const filteredBooks = books.filter((book) => {
    if (searchValue == '') {
      return book;
    } else if (book.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return book;
    }
  });

  return (
    <div className='collection'>
      <Header
        title={collection.name}
        subtitle={
          collection.description ? collection.description : 'No description'
        }
      >
        <Link to='/add-book' className='btn btn-blue'>
          Create Book
        </Link>
      </Header>
      <div className='collection-table-actions'>
        <SearchBar
          placeholderText='Search collection...'
          handleChange={setSearchValue}
        />
        {collectionId == 'defaultCollection' ||
        collectionId == 'completedCollection' ? null : (
          <Link to={`add-books/${collection.id}`} className='btn btn-default'>
            Add Books to Collection
          </Link>
        )}
      </div>

      <Books>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Link key={book.id} to={`/book-details/${book.id}`}>
              <BookItem book={book} />
            </Link>
          ))
        ) : (
          <p>
            No books to show.{' '}
            <Link to={`add-books/${collection.id}`}>Add Books.</Link>
          </p>
        )}
      </Books>
    </div>
  );
};

export default Collection;
