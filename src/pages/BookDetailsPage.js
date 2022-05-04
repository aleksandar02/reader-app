import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BookDetails from '../components/book/BookDetails';
import AddNote from '../components/note/AddNote';
import Notes from '../components/note/Notes';
import NoteItem from '../components/note/NoteItem';
import { selectBookById } from '../redux/book/book.reducer';
import { toggleModal } from '../redux/modal/modal.actions';
import { selectAllNotes } from '../redux/note/note.reducer';

const BookDetailsPage = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();

  const book = useSelector((state) => selectBookById(state.book, bookId));
  const notes = useSelector((state) => selectAllNotes(state.note, book.id));

  console.log(notes);

  return (
    <div className='main-section'>
      <div className='book-details-content'>
        <BookDetails
          book={book}
          toggleModal={() => dispatch(toggleModal(true, book))}
        />
        <div className='notes'>
          <AddNote book={book} />
          <Notes>
            <h2>My Notes</h2>
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
