import { fetchBooks } from './book.utils';
import { useEffect, useState } from 'react';
import BookPreview from './BookPreview';
import { Autocomplete, TextField } from '@mui/material';

const SearchBook = ({ selectBook }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        if (searchValue.length > 2) {
          let sanitizedSearchValue = searchValue.trim().replaceAll(' ', '+');

          const bookResults = await fetchBooks(
            `https://openlibrary.org/search.json?title=${sanitizedSearchValue}&limit=10`
          );

          if (bookResults) {
            setSearchResults(bookResults);
          }
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        setSearchResults([]);
      }
    }, 500);
    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchValue]);

  return (
    <div className='search-book'>
      <Autocomplete
        disablePortal
        id='search-book-autocomplete'
        getOptionLabel={(option) => option.title}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.title}
            </li>
          );
        }}
        options={searchResults}
        renderInput={(params) => (
          <TextField {...params} label='Search Open Library for books...' />
        )}
        onInputChange={(e) => setSearchValue(e.target.value)}
        onChange={(e, newValue) => {
          setSelectedBook(newValue);
        }}
      />

      <div className='book-preview-container'>
        {selectedBook ? (
          <BookPreview selectBook={selectBook} book={selectedBook} />
        ) : null}
      </div>
    </div>
  );
};

export default SearchBook;
