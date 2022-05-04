import SearchBar from '../searchBar/SearchBar';

import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import BookPreview from './BookPreview';

const AddBookFromLibrary = () => {
  const [searchValue, setSearchValue] = useState('');
  const [book, setBook] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchValue.length > 0) {
        const book = await fetchBook(
          `https://openlibrary.org/search.json?title=${searchValue.trim()}&limit=1`
        );

        if (book) {
          setBook(book);
        } else {
          setBook(null);
        }
      } else {
        setBook(null);
      }
    }, 1000);
    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchValue]);

  const fetchBook = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      const book = {
        id: uuid(),
        title: data.docs[0].title,
        author: data.docs[0].author_name[0],
        isbn: data.docs[0].isbn[0],
        cover_i: data.docs[0].cover_i,
      };

      return book;
    } catch (err) {
      return null;
    }
  };

  const addBook = (book) => {};

  return (
    <div className='add-book-from-library'>
      <SearchBar
        placeholderText='Search Open Library for a book...'
        handleChange={setSearchValue}
        cssClass='full-width'
      />

      <div className='add-book-container'>
        {book ? <BookPreview addBook={addBook} book={book} /> : null}
      </div>
    </div>
  );
};

export default AddBookFromLibrary;
