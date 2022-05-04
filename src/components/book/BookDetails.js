import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeBookStatus } from '../../redux/book/book.actions';
import Button from '../button/Button';

const BookDetails = ({ book, toggleModal }) => {
  const dispatch = useDispatch();
  const [bookStatus, setBookStatus] = useState(book.status);

  const handleChange = (bookId, status) => {
    dispatch(changeBookStatus(bookId, status));
    setBookStatus(status);
  };

  return (
    <div className='book-details'>
      <div className='book-details-info'>
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
        />
        <h1>{book.title}</h1>
        <h3>{book.author}</h3>
      </div>
      <div className='book-details-actions'>
        <FormControl>
          <InputLabel id='bookStatus'>Book status</InputLabel>
          <Select
            labelId='bookStatus'
            id='bookStatus'
            value={bookStatus}
            label='Book status'
            onChange={(e) => handleChange(book.id, e.target.value)}
          >
            <MenuItem value={1}>To Read</MenuItem>
            <MenuItem value={2}>Reading</MenuItem>
            <MenuItem value={3}>Done</MenuItem>
          </Select>
        </FormControl>
        <Button
          handleOnClick={toggleModal}
          buttonText='Add to Collection'
          type='button'
          cssStyle='btn btn-small btn-blue'
        />
      </div>
    </div>
  );
};

export default BookDetails;
