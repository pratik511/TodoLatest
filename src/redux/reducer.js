import { ADD_USER, DELETE_USERS, GET_SINGLE_USER, GET_USERS, UPDATE_USER } from "./actionType";

const initialState = {
    users: [],
    user: {},
    loader: true,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loader: false,
            }
        case DELETE_USERS:
        case ADD_USER:
        case UPDATE_USER:
            return {
                ...state,
                loader: false
            }
        case GET_SINGLE_USER:
            return {
                ...state,
                user: action.payload,
                loader: false
            }
        default:
            return state;
    }
};

export default userReducer;