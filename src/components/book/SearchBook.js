import SearchBar from '../searchBar/SearchBar';

import { fetchBook } from './book.utils';
import { useEffect, useState } from 'react';
import BookPreview from './BookPreview';

const SearchBook = ({ selectBook }) => {
  const [searchValue, setSearchValue] = useState('');
  const [book, setBook] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        if (searchValue.length > 0) {
          const book = await fetchBook(
            `https://openlibrary.org/search.json?title=${searchValue.trim()}&limit=1`
          );

          if (book) {
            setBook(book);
          }
        } else {
          setBook(null);
        }
      } catch (err) {
        setBook(null);
      }
    }, 1000);
    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchValue]);

  return (
    <div className='search-book'>
      <SearchBar
        placeholderText='Search Open Library for a book...'
        handleChange={setSearchValue}
        cssClass='full-width'
      />

      <div className='book-preview-container'>
        {book ? <BookPreview selectBook={selectBook} book={book} /> : null}
      </div>
    </div>
  );
};

export default SearchBook;
