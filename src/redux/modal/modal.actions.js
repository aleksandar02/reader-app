import { ModalActionTypes } from './modal.types';

// Action Creator that Toggles modal and sets modal data
export const toggleModal = (show, book) => (dispatch) => {
  dispatch({
    type: ModalActionTypes.TOGGLE_MODAL,
    payload: {
      show: show,
      book: book,
    },
  });
};
