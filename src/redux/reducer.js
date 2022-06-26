import { GET_USERS } from "./actionType";

const initialState = {
    users:[],
    user:{},
    loader:true,
};

const userReducer= (state = initialState , action) => {
    switch(action.type){
        case GET_USERS:
            return{
                ...state,
                users:action.payload,
                loader:false,
            }
        default:
            return state;
    }
};

export default userReducer;