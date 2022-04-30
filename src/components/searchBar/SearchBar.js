import { BiSearch } from 'react-icons/bi';

const SearchBar = ({ setSearchValue }) => {
  return (
    <div className='search-container'>
      <BiSearch />
      <input
        className='search-input'
        type='text'
        placeholder='Search collection...'
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
