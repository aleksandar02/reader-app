import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectBookById,
  selectBooksByIds,
} from '../../redux/book/book.reducer';
import { selectBookIdsByCollectionId } from '../../redux/bookCollection/bookCollection.reducer';
import { selectCollectionById } from '../../redux/collection/collection.reducer';
import CollectionHeader from './CollectionHeader';
import Books from '../book/Books';
import Book from '../book/Book';

const Collection = () => {
  const { collectionId } = useParams();

  const collection = useSelector((state) =>
    selectCollectionById(state.collection, collectionId)
  );

  const bookIds = useSelector((state) =>
    selectBookIdsByCollectionId(state.bookCollection, collectionId)
  );

  const books = useSelector((state) => selectBooksByIds(state.book, bookIds));

  return (
    <div>
      <CollectionHeader
        name={collection.name}
        description={
          collection.description ? collection.description : 'No description'
        }
      />
      <Books>
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </Books>
    </div>
  );
};

export default Collection;
