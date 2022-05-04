import Books from '../book/Books';
import BookItem from '../book/BookItem';
import { Link } from 'react-router-dom';

const Collection = ({ filteredBooks, collection }) => {
  return (
    <div className='collection'>
      <Books>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Link key={book.id} to={`/book-details/${book.id}`}>
              <BookItem book={book} />
            </Link>
          ))
        ) : (
          <p>No books to show.</p>
        )}
      </Books>
    </div>
  );
};

export default Collection;
