const Header = ({ title, subtitle, children }) => {
  return (
    <div className='header'>
      <div className='header-info'>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className='header-actions'>{children}</div>
    </div>
  );
};

export default Header;
