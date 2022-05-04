import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';

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
            <BiPlus />
            <span className='link-name'>Create collection</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
