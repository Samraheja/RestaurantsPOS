import types from "../actions/types";

const initialState = {
    menu: [],
    totalRecords: 0,
    totalPages: 0,
    measuringUnits: [],
    isLoading: false
};

const Menu = ((state = initialState, actions = {}) => {
    switch (actions.type) {
        case types.menu.GET_MENU: {
            return {
                ...state,
                totalRecords: actions.payload.data.data.totalRecords,
                totalPages: actions.payload.data.data.totalPages,
                menu: actions.payload.data.data.response
            }
        }
        case types.menu.GET_MENU_BY_ID: {
            return {
                ...state,
                menu: actions.payload.data.data.response
            }
        }
        case types.menu.SAVE_MENU: {
            return {
                ...state,
                menu: [
                    ...state.menu,
                    actions.payload.data.data
                ]
            }
        }
        case types.menu.UPDATE_MENU: {
            debugger;
            return {
                ...state,
                menu: state.menu.map((item) =>
                    (item.id === actions.payload.fetchConfig.params.Menu.ID) ?
                        actions.payload.data.data
                        :
                        item
                )
            }
        }
        case types.menu.UPDATE_MENU_PIC: {
            return {
                menu: state.menu.map((item) =>
                    (item.id === actions.payload.fetchConfig.params.Menu.ID) ?
                        {
                            ...item,
                            menuPic: actions.payload.data.data
                        }
                        :
                        item
                )
            }
        }
        case types.menu.DELETE_MENU: {
            return {
                ...state,
                menu: state.menu.filter((item) =>
                    (item.id !== actions.payload.fetchConfig.params.Id)
                )
            }
        }
        case types.menu.GET_MEASURING_UNITS: {
            return {
                ...state,
                measuringUnits: actions.payload.data.data
            }
        }
        case types.menu.SWITCH_MENU_LOADER: {
            return {
                ...state, isLoading: actions.payload.status
            }
        }
        case types.login.LOGOUT_USER: {
            localStorage.clear();

            return initialState
        }
        default: {
            return state;
        }
    }
});

export default Menu;