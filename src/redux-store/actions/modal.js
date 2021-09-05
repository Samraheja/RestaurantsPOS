import types from "./types";

export const toggleModal = payload => {
    return {
        type: types.modal.TOGGLE_MODAL
    }
};