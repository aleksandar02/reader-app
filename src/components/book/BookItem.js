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
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
        />
        <div className='book-item-details-info'>
          <h3>{title}</h3>
          <p>{book.author}</p>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
