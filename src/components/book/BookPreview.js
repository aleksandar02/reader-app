import Button from '../button/Button';

const BookPreview = ({ book, addBook }) => {
  return (
    <div className='book-preview'>
      <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <Button
        type='button'
        handleOnClick={() => addBook(book)}
        cssStyle='btn btn-blue'
        buttonText='Add Book'
      />
    </div>
  );
};

export default BookPreview;
