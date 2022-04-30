import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const collections = useSelector((state) => state.collection.byId);

  return (
    <div>
      <h1>ReaderApp</h1>
      <ul>
        {Object.values(collections).map((val) => (
          <li key={val.id}>
            <Link to={val.id}>{val.name}</Link>
          </li>
        ))}
        <li>
          <Link to='create-collection'>Create collection</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
