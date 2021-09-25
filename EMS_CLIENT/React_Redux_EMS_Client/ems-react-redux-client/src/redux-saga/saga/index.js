import { all } from "redux-saga/effects";
import login from "./User/login";
import logout from './User/logout'
import addemployee from './Employee/addEmployee'
import fetchemployees from "./Employee/employeeList";
import register from './User/register'
import viewemployee from "./Employee/viewEmployee";
import updateemployee from './Employee/updateEmployee'
import deleteemployee from './Employee/deleteEmployee'

export default function* rootSaga(){
    yield all([
        login(),
        addemployee(),
        fetchemployees(),
        logout(),
        register(),
        viewemployee(),
        updateemployee(),
        deleteemployee()
    ])
}