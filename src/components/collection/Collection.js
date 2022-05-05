import Books from '../book/Books';
import BookItem from '../book/BookItem';

const Collection = ({ filteredBooks, collection }) => {
  return (
    <div className='collection'>
      <Books>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookItem key={book.id} book={book} collectionId={collection.id} />
          ))
        ) : (
          <p>No books to show.</p>
        )}
      </Books>
    </div>
  );
};

export default Collection;
