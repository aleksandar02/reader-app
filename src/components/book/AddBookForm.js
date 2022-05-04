import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import Button from '../button/Button';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CollectionList from '../collection/CollectionList';
import { selectCustomCollections } from '../../redux/collection/collection.reducer';
import { useState } from 'react';
import { saveBook } from '../../redux/book/book.actions';
import { fetchBook, fetchBookByTitleAndAuthor } from './book.utils';
import { v4 as uuid } from 'uuid';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, '50 characters max.')
    .required('Required field *'),
  author: Yup.string()
    .max(50, '50 characters max.')
    .required('Required field *'),
  status: Yup.number().required('Required field *'),
});

const AddBookForm = ({
  initialValues,
  selectedBook,
  setInitialValues,
  setSelectedBook,
}) => {
  const [selectedIds, setSelectedIds] = useState(['defaultCollection']);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { ...initialValues },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      let bookToSave;
      let collectionIds = selectedIds;

      if (selectedBook) {
        bookToSave = {
          ...selectedBook,
          status: values.status,
        };
      } else {
        const book = await fetchBook(
          `https://openlibrary.org/search.json?title=${values.title.trim()}&limit=1`
        );

        bookToSave = {
          id: uuid(),
          title: values.title,
          author: values.author,
          isbn: book ? book.isbn : '',
          cover_i: book ? book.cover_i : '',
          status: values.status,
        };
      }

      if (values.status == 3) {
        collectionIds = [...collectionIds, 'completedCollection'];
      }

      dispatch(saveBook(bookToSave, collectionIds));
      setInitialValues({ title: '', author: '', status: '' });
      setSelectedIds(['defaultCollection']);
      setSelectedBook(null);
    },
  });

  const collectionsToShow = useSelector((state) =>
    selectCustomCollections(state.collection)
  );

  const handleOnChange = (id) => {
    const exists = selectedIds.find((collectionId) => collectionId == id);

    if (exists) {
      const filteredCollectionIds = selectedIds.filter(
        (collectionId) => collectionId != id
      );

      setSelectedIds([...filteredCollectionIds]);
    } else {
      setSelectedIds((currentState) => [...currentState, id]);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className='add-book-form'>
      <div className='input-group'>
        <TextField
          id='title'
          name='title'
          label='Title *'
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <div className='text-danger'>
          {formik.errors.title && formik.touched.title
            ? formik.errors.title
            : null}
        </div>
      </div>
      <div className='input-group'>
        <TextField
          id='author'
          name='author'
          label='Author name *'
          value={formik.values.author}
          onChange={formik.handleChange}
        />
        <div className='text-danger'>
          {formik.errors.author && formik.touched.author
            ? formik.errors.author
            : null}
        </div>
      </div>
      <div className='input-group'>
        <FormControl fullWidth>
          <InputLabel id='status-label'>Book status *</InputLabel>
          <Select
            labelId='status-label'
            id='status'
            name='status'
            variant='outlined'
            value={formik.values.status}
            label='Book status *'
            onChange={formik.handleChange}
          >
            <MenuItem value='' disabled>
              Select status
            </MenuItem>
            <MenuItem value={1}>To Read</MenuItem>
            <MenuItem value={2}>Reading</MenuItem>
            <MenuItem value={3}>Done</MenuItem>
          </Select>
          <div className='text-danger'>
            {formik.errors.status && formik.touched.status
              ? formik.errors.status
              : null}
          </div>
        </FormControl>
      </div>
      <hr className='add-book-form-hr' />
      <div className='add-book-form-collections'>
        <p>Add to collection:</p>
        <CollectionList
          collectionsToShow={collectionsToShow}
          handleOnChange={handleOnChange}
          selectedIds={selectedIds}
          cssClass='white-bg'
        />
      </div>
      <Button type='submit' buttonText='Save Book' cssStyle='btn btn-blue' />
    </form>
  );
};

export default AddBookForm;
