import Button from '../button/Button';

const BookPreview = ({ book, selectBook }) => {
  return (
    <div className='book-preview'>
      <div className='book-item-details'>
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
        />
        <div className='book-item-details-info'>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      </div>
      <Button
        type='button'
        handleOnClick={() => selectBook(book)}
        cssStyle='btn btn-blue'
        buttonText='Select Book'
      />
    </div>
  );
};

export default BookPreview;
