import Header from '../components/header/Header';

import { Outlet } from 'react-router-dom';

const AddBookPage = () => {
  return (
    <div className='main-section'>
      <Header
        title='Add New Book'
        subtitle='Search for a book you want to add.'
      />

      <Outlet />
    </div>
  );
};

export default AddBookPage;
