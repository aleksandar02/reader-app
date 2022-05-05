import { useDispatch } from 'react-redux';
import { removeNote } from '../../redux/note/note.actions';
import { BiX } from 'react-icons/bi';

const NoteItem = ({ note, noteNumber }) => {
  const dispatch = useDispatch();

  return (
    <div className='note-item'>
      <span className='note-number'>Note #{noteNumber + 1}</span>
      <p>{note.noteText}</p>
      <div
        className='remove-note-button'
        onClick={() => dispatch(removeNote(note.id))}
      >
        <BiX />
      </div>
    </div>
  );
};

export default NoteItem;
