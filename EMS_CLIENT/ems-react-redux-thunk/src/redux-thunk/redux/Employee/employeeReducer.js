import { createReducer } from '@reduxjs/toolkit'

import { clearEmployee, createEmployee, fetchAllEmployees, fetchEmployeeDetailById, deleteEmployee, updateEmployee, setFilterForEmployee } from '../../thunk/Employee'

const initialState = {
    employees: [],
    employeeDetail: null, 
    departmentFilter: ''
}

export const employeeReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(clearEmployee, (state) => {
        state.employeeDetail = null
    })
    .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees = [action.payload, ...state.employees];
    })
    .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.employees = action.payload
    })
    .addCase(fetchEmployeeDetailById.fulfilled, (state, action) => {
        state.employeeDetail = action.payload
    })
    .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(employee => (employee.id !== action.payload))
    })
    .addCase(updateEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.map(employee => 
            (employee.id === action.payload.id) ? action.payload : employee
        )
    })
    .addCase(setFilterForEmployee.fulfilled, (state, action)=>{
        state.departmentFilter = action.payload
    })
})