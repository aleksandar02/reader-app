import { useDispatch } from 'react-redux';
import {
  markBookAsDone,
  markBookAsUndone,
} from '../../redux/book/book.actions';
import Button from '../button/Button';

const BookDetails = ({ book, toggleModal }) => {
  const dispatch = useDispatch();

  let buttonText = 'Mark as done';

  if (book.status == 2) {
    buttonText = 'Mark as undone';
  }

  const changeBookStatus = (bookId, status) => {
    if (status == 1) {
      dispatch(markBookAsDone(bookId));
    } else if (status == 2) {
      dispatch(markBookAsUndone(bookId));
    }
  };

  return (
    <div className='book-details'>
      <div className='book-details-info'>
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
        />
        <h1>{book.title}</h1>
        <h3>{book.author}</h3>
      </div>
      <div className='book-details-actions'>
        <Button
          handleOnClick={() => changeBookStatus(book.id, book.status)}
          buttonText={buttonText}
          type='button'
          cssStyle='btn btn-small btn-default'
        />
        <Button
          handleOnClick={toggleModal}
          buttonText='Add to Collection'
          type='button'
          cssStyle='btn btn-small btn-blue'
        />
      </div>
    </div>
  );
};

export default BookDetails;
