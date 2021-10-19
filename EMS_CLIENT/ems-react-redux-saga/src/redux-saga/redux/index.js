import { combineReducers } from "@reduxjs/toolkit";
import employeeReducer from "./Employee/employeeSlice";
import userReducer from "./User/userSlice";

const rootReducer = combineReducers({
  employeeReducer,
  userReducer,
});

export default rootReducer;
