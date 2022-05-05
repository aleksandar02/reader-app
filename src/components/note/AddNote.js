import Button from '../button/Button';

import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addNote } from '../../redux/note/note.actions';

const initialValues = {
  note: '',
};

const validationSchema = Yup.object().shape({
  note: Yup.string()
    .max(1024, '1024 characters max.')
    .required('Required field *'),
});

const AddNote = ({ book }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values, formikBag) => {
      dispatch(addNote(book.id, values.note));
      formikBag.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='add-note'>
      <div className='input-group'>
        <TextField
          id='note'
          name='note'
          label='Add new note...'
          value={formik.values.note}
          onChange={formik.handleChange}
          multiline
          rows={4}
        />
        <div className='text-danger'>
          {formik.errors.note && formik.touched.note
            ? formik.errors.note
            : null}
        </div>
      </div>
      <div className='align-right'>
        <Button type='submit' buttonText='Add Note' cssStyle='btn btn-blue' />
      </div>
    </form>
  );
};

export default AddNote;
