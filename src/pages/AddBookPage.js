import Header from '../components/header/Header';
import AddBookForm from '../components/book/AddBookForm';
import SearchBook from '../components/book/SearchBook';
import { useState } from 'react';

const AddBookPage = () => {
  const [initialValues, setInitialValues] = useState({
    title: '',
    author: '',
    status: '',
  });

  const [selectedBook, setSelectedBook] = useState(null);

  const selectBook = (book) => {
    setInitialValues((prevState) => {
      return { ...prevState, title: book.title, author: book.author };
    });
    setSelectedBook(book);
  };

  console.log(initialValues);

  return (
    <div className='main-section'>
      <Header
        title='Add New Book'
        subtitle='Search for a book you want to add.'
      />

      <div className='add-book-page-content'>
        <AddBookForm
          initialValues={initialValues}
          setInitialValues={setInitialValues}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
        <SearchBook selectBook={selectBook} />
      </div>
    </div>
  );
};

export default AddBookPage;
