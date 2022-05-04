import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  const collections = useSelector((state) => state.collection.byId);

  return (
    <div className='sidebar'>
      <div className='logo-details'>
        <span className='logo_name'>ReaderApp</span>
      </div>
      <ul className='nav-links'>
        {Object.values(collections).map((val) => (
          <li key={val.id}>
            <NavLink activeclassname='active' to={val.id}>
              <span className='link-name'>{val.name}</span>
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink activeclassname='active' to='create-collection'>
            Create collection
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
