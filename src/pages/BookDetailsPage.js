import BookDetails from '../components/book/BookDetails';
import AddNote from '../components/note/AddNote';
import Notes from '../components/note/Notes';
import NoteItem from '../components/note/NoteItem';
import Header from '../components/header/Header';
import Button from '../components/button/Button';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectBookById } from '../redux/book/book.reducer';
import { toggleModal } from '../redux/modal/modal.actions';
import { selectAllNotes } from '../redux/note/note.reducer';
import { deleteBook } from '../redux/book/book.actions';

const BookDetailsPage = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const book = useSelector((state) => selectBookById(state.book, bookId));
  const notes = useSelector((state) => selectAllNotes(state.note, book.id));

  return (
    <div className='main-section'>
      <Header
        title='Book Details'
        subtitle='Write notes on book you are reading.'
      >
        <Button
          type='button'
          handleOnClick={() => dispatch(deleteBook(book.id, navigate))}
          cssStyle='btn btn-red'
          buttonText='Delete Book'
        />
      </Header>
      <div className='book-details-content'>
        <BookDetails
          book={book}
          toggleModal={() => dispatch(toggleModal(true, book))}
        />
        <div className='notes'>
          <AddNote book={book} />
          <Notes>
            <h2>
              My Notes <span>({notes.length})</span>
            </h2>
            {notes.length > 0 ? (
              notes.map((note, idx) => (
                <NoteItem key={note.id} note={note} noteNumber={idx} />
              ))
            ) : (
              <p>There are no notes.</p>
            )}
          </Notes>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
