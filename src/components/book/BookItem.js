import Button from '../button/Button';
import { BiX } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { removeBookFromCollection } from '../../redux/bookCollection/bookCollection.actions';
import { useDispatch } from 'react-redux';

const BookItem = ({
  book,
  canSelectBook = false,
  handleOnChange,
  selectedIds,
  collectionId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let selectedBookCssClass = '';

  if (selectedIds && selectedIds.includes(book.id)) {
    selectedBookCssClass = 'selected-book';
  }

  const title =
    book.title.length > 24
      ? book.title.substring(0, 24).concat('...')
      : book.title;

  let bookStatusBtn = (
    <Button cssStyle='status-label to-read' buttonText='To Read' />
  );

  if (book.status == 2) {
    bookStatusBtn = (
      <Button cssStyle='status-label reading' buttonText='Reading' />
    );
  } else if (book.status == 3) {
    bookStatusBtn = <Button cssStyle='status-label done' buttonText='Done' />;
  }

  let removeBookButton = null;

  if (
    collectionId != 'defaultCollection' &&
    collectionId != 'completedCollection'
  ) {
    removeBookButton = (
      <div
        className='remove-book-button'
        onClick={() =>
          dispatch(removeBookFromCollection(collectionId, book.id))
        }
      >
        <BiX />
      </div>
    );
  }

  return (
    <div
      className={`book-item ${selectedBookCssClass}`}
      onClick={
        canSelectBook
          ? () => handleOnChange(book.id)
          : (e) => e.stopPropagation()
      }
    >
      <div
        className='book-item-details'
        onClick={
          !canSelectBook ? () => navigate(`/book-details/${book.id}`) : null
        }
      >
        {book.cover_i ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          />
        ) : (
          <div className='img-placeholder'>
            <p>{book.title} cover</p>
          </div>
        )}

        <div className='book-item-details-info'>
          <h3>{title}</h3>
          <p>{book.author}</p>
          {bookStatusBtn}
        </div>
      </div>
      {removeBookButton}
    </div>
  );
};

export default BookItem;
