import { Link } from 'react-router-dom';

const CollectionHeader = ({ name, description }) => {
  return (
    <div className='collection-header'>
      <div className='collection-header-info'>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
      <div className='collection-header-actions'>
        <Link to='/add-book' className='btn btn-blue'>
          Create Book
        </Link>
      </div>
    </div>
  );
};

export default CollectionHeader;
