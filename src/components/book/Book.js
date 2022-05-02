import { Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  markBookAsDone,
  markBookAsUndone,
} from '../../redux/book/book.actions';
import Button from '../button/Button';

const Book = ({ book, canSelectBook = false, handleOnChange, selectedIds }) => {
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

  let selectedBookCssClass = '';

  if (selectedIds && selectedIds.includes(book.id)) {
    selectedBookCssClass = 'selected-book';
  }

  return (
    <div className={`book ${selectedBookCssClass}`}>
      <div className='book-details'>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
      </div>
      <div className='book-actions'>
        {canSelectBook ? (
          <Checkbox
            checked={selectedIds.includes(book.id)}
            onChange={() => handleOnChange(book.id)}
          />
        ) : (
          <Button
            handleOnClick={() => changeBookStatus(book.id, book.status)}
            buttonText={buttonText}
            type='button'
            cssStyle='btn btn-small btn-status-blue'
          />
        )}
      </div>
    </div>
  );
};

export default Book;
