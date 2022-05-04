import { ModalActionTypes } from './modal.types';

export const toggleModal = (show, book) => (dispatch) => {
  dispatch({
    type: ModalActionTypes.TOGGLE_MODAL,
    payload: {
      show: show,
      book: book,
    },
  });
};
