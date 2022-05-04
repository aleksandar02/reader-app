import { BiSearch } from 'react-icons/bi';

const SearchBar = ({ handleChange, placeholderText, cssClass = '' }) => {
  return (
    <div className={`search-container ${cssClass}`}>
      <BiSearch />
      <input
        className='search-input'
        type='text'
        placeholder={placeholderText}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
