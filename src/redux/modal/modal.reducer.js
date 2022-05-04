import { ModalActionTypes } from './modal.types';
import { createSelector } from 'reselect';

const initialState = {
  show: false,
  modalData: {},
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ModalActionTypes.TOGGLE_MODAL:
      return {
        ...state,
        show: action.payload.show,
        modalData: action.payload.book,
      };

    default:
      return state;
  }
};

const selectModal = (state) => state.modal;

export const selectShowModal = createSelector(
  [selectModal],
  (modal) => modal.show
);

export const selectModalData = createSelector(
  [selectModal],
  (modal) => modal.modalData
);

export default modalReducer;
