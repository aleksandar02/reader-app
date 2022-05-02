import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addCollection } from '../../redux/collection/collection.actions';

import Button from '../button/Button';

const initialValues = {
  name: '',
  description: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required field *'),
});

const CreateCollectionForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(addCollection(values.name, values.description));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='create-collection-form'>
      <div className='input-group'>
        <TextField
          id='name'
          name='name'
          label='Collection name *'
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <div className='text-danger'>
          {formik.errors.name && formik.touched.name
            ? formik.errors.name
            : null}
        </div>
      </div>
      <div className='input-group'>
        <TextField
          id='description'
          name='description'
          label='Description'
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </div>
      <Button
        type='submit'
        buttonText='Create Collection'
        cssStyle='btn btn-blue'
      />
    </form>
  );
};

export default CreateCollectionForm;
