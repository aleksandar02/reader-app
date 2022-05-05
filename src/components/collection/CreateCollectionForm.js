import Button from '../button/Button';

import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addCollection } from '../../redux/collection/collection.actions';

const initialValues = {
  name: '',
  description: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().max(24, '24 characters max.').required('Required field *'),
});

const CreateCollectionForm = ({ setToggleAddCollection = null }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(addCollection(values.name, values.description));

      if (setToggleAddCollection) {
        setToggleAddCollection(false);
      }
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
