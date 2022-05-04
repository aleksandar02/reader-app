const NoteItem = ({ note, noteNumber }) => {
  return (
    <div className='note-item'>
      <span className='note-number'>Note #{noteNumber + 1}</span>
      <p>{note.noteText}</p>
    </div>
  );
};

export default NoteItem;
