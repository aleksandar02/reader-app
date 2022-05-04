import { BiX } from 'react-icons/bi';

const Modal = ({ closeModal, children, title, subtitle }) => {
  return (
    <div className='modal'>
      <div className='modal-container'>
        <div className='modal-header'>
          <div>
            <h3>{title}</h3>
            <p>{subtitle && subtitle}</p>
          </div>
          <span>
            <BiX onClick={closeModal}>Close</BiX>
          </span>
        </div>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
