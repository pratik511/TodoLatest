import axios from "axios";
import { GET_USERS } from "./actionType";

const getUsers = (users) => ({
    type: GET_USERS,
    payload: users,
})

export const loadUsers = () => {
    return  dispatch => {
       return axios.get(process.env.REACT_APP_API).then((resp) =>{
        console.log("resp",resp)
        dispatch(getUsers(resp.data));
    }).catch((error) => console.log("error",error))

    }
}