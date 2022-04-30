import { Link } from 'react-router-dom';

const CollectionHeader = ({ name, description }) => {
  return (
    <div className='collection-header'>
      <div className='collection-header-info'>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
      <Link to='/add-book' className='btn btn-blue'>
        Add New Book
      </Link>
    </div>
  );
};

export default CollectionHeader;
