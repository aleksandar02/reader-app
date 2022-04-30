const Button = ({ handleOnClick, buttonText, cssStyle, type }) => {
  return (
    <button onClick={handleOnClick} className={cssStyle} type={type}>
      {buttonText}
    </button>
  );
};

export default Button;
