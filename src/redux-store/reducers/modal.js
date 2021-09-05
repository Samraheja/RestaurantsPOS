import types from "../actions/types";

const initialState = {
    showModal: false
};

const Modal = ((state = initialState, actions = {}) => {
    switch(actions.type) {
        case types.modal.TOGGLE_MODAL: {
            return {
                ...state,
                showModal: !state.showModal
            }
        }
        default: {
            return state;
        }
    }
});

export default Modal;