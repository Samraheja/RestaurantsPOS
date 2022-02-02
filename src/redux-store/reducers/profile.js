import types from "../actions/types";

const initialState = {
    userDetails: {},
    saleDetails: {},
    isLoading: false
};

const Profile = ((state = initialState, actions = {}) => {
    switch (actions.type) {
        case types.profile.GET_USER_PROFILE: {
            return {
                ...state, userDetails: actions.payload.data.data[0]
            }
        }
        case types.profile.UPDATE_USER_PROFILE: {
            return {
                ...state, userDetails: {
                    ...state.userDetails,
                    noOfTables: actions.payload.fetchConfig.params.Restaurants.NoOfTables,
                    dayOpenTime: actions.payload.fetchConfig.params.Restaurants.DayOpenTimes,
                    phoneNumber: actions.payload.fetchConfig.params.Restaurants.PhoneNumber,
                    website: actions.payload.fetchConfig.params.Restaurants.Website,
                    GSTIN: actions.payload.fetchConfig.params.Restaurants.GSTIN,
                    address: actions.payload.fetchConfig.params.Restaurants.Address,
                    city: actions.payload.fetchConfig.params.Restaurants.City,
                    states: actions.payload.fetchConfig.params.Restaurants.State,
                    zipCode: actions.payload.fetchConfig.params.Restaurants.ZipCode,
                }
            }
        }
        case types.profile.UPDATE_USER_PROFILE_PIC: {
            return {
                ...state, userDetails: {
                    ...state.userDetails,
                    profilePic: actions.payload.data.data
                }
            }
        }
        case types.profile.UPDATE_DAY_OPEN_CLOSE_STATUS: {
            return {
                ...state, userDetails: {
                    ...state.userDetails,
                    isOpenedForDay: actions.payload.status
                }
            }
        }
        case types.profile.GET_DAILY_SALE_DETAILS: {
            return {
                ...state, saleDetails: actions.payload.data.data
            }
        }
        case types.profile.SWITCH_PROFILE_LOADER: {
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

export default Profile;