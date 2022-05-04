import Button from '../button/Button';

const BookItem = ({
  book,
  canSelectBook = false,
  handleOnChange,
  selectedIds,
}) => {
  let selectedBookCssClass = '';

  if (selectedIds && selectedIds.includes(book.id)) {
    selectedBookCssClass = 'selected-book';
  }

  const title =
    book.title.length > 24
      ? book.title.substring(0, 24).concat('...')
      : book.title;

  let bookStatusBtn = (
    <Button cssStyle='btn btn-small btn-to-read' buttonText='To Read' />
  );

  if (book.status == 2) {
    bookStatusBtn = (
      <Button cssStyle='btn btn-small btn-reading' buttonText='Reading' />
    );
  } else if (book.status == 3) {
    bookStatusBtn = (
      <Button cssStyle='btn btn-small btn-done' buttonText='Done' />
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
      <div className='book-item-details'>
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
    </div>
  );
};

export default BookItem;
