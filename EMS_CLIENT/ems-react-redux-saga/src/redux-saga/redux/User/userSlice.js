import { createSlice } from '@reduxjs/toolkit'
const defaultState = {
    name: localStorage.getItem("name") || "loading...",
    isLoggedIn: localStorage.getItem("authtoken") ? true : false,
};

const userSlice = createSlice({
    name: "userSlice",
    initialState: defaultState,
    reducers: {
        loggedIn: (state, action)=>{},
        signUpUser: (state, action)=>{},
        setIsLoggedIn: (state, action)=>{
            // console.log(action.payload)
            return {
                ...state,
                isLoggedIn: action.payload.status,
                name: action.payload.name
            }
        },
        logOut: (state, action)=>{},
    }
})

export const { loggedIn, signUpUser, setIsLoggedIn, logOut } = userSlice.actions;

export default userSlice.reducer;