import { fetchBooks } from './book.utils';
import { useEffect, useState } from 'react';
import BookPreview from './BookPreview';
import { Autocomplete, TextField } from '@mui/material';

const SearchBook = ({ handleSelectBook }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Search for a book after the user has stopped typing
    const delayDebounceFn = setTimeout(async () => {
      try {
        if (searchTerm.length > 2) {
          let sanitizedSearchTerm = searchTerm.trim().replaceAll(' ', '+');

          const bookResults = await fetchBooks(
            `https://openlibrary.org/search.json?title=${sanitizedSearchTerm}&limit=10`
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
  }, [searchTerm]);

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
        onInputChange={(e) => setSearchTerm(e.target.value)}
        onChange={(e, newValue) => {
          setSelectedBook(newValue);
        }}
      />

      <div className='book-preview-container'>
        {selectedBook ? (
          <BookPreview
            handleSelectBook={handleSelectBook}
            book={selectedBook}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SearchBook;
