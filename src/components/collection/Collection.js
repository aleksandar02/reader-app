import Books from '../book/Books';
import BookItem from '../book/BookItem';

const Collection = ({ books, collection }) => {
  return (
    <div className='collection'>
      <Books>
        {books.length > 0 ? (
          books.map((book) => (
            <BookItem key={book.id} book={book} collectionId={collection.id} />
          ))
        ) : (
          <p>No books.</p>
        )}
      </Books>
    </div>
  );
};

export default Collection;
