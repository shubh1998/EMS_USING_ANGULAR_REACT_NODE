import { combineReducers } from '@reduxjs/toolkit'
import { employeeReducer } from './Employee/employeeReducer'
import { userReducer } from './User/userReducer'
import { loadingReducer } from './Loading/loadingReducer'

export const rootReducer = combineReducers({
    userReducer,
    employeeReducer,
    loadingReducer,
})