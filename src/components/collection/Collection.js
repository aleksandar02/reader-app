import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectBooksByIds } from '../../redux/book/book.reducer';
import { selectBookIdsByCollectionId } from '../../redux/bookCollection/bookCollection.reducer';
import { selectCollectionById } from '../../redux/collection/collection.reducer';
import CollectionHeader from './CollectionHeader';
import Books from '../book/Books';
import Book from '../book/Book';
import SearchBar from '../searchBar/SearchBar';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <CollectionHeader
        name={collection.name}
        description={
          collection.description ? collection.description : 'No description'
        }
      />
      <div className='collection-table-actions'>
        <SearchBar setSearchValue={setSearchValue} />
        {collectionId == 'defaultCollection' ||
        collectionId == 'completedCollection' ? null : (
          <Link to='/add-book' className='btn btn-default'>
            Add Books to Collection
          </Link>
        )}
      </div>

      <Books>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <Book key={book.id} book={book} />)
        ) : (
          <p>There are no books to show.</p>
        )}
      </Books>
    </div>
  );
};

export default Collection;
