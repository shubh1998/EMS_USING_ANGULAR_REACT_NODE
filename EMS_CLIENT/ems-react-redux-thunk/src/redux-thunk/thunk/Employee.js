import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { addEmployeeRequest, deleteEmployeeRequest, fetchEmployeesListRequest, getEmployeeDetailsByIdRequest, updateEmployeeRequest } from '../../utils/services/employee.service'

export const fetchAllEmployees = createAsyncThunk("employee/fetchAllEmployees", async(department, thunkApi) => {
  if (thunkApi.getState().employeeReducer.employees.length > 0) {
      return thunkApi.getState().employeeReducer.employees
  }
  const res = await fetchEmployeesListRequest(department)
  return res.data.data;
})

export const fetchEmployeeDetailById = createAsyncThunk("employee/fetchEmployeeDetailsById", async (employeeId, thunkApi) => {
  try {
    const res = await getEmployeeDetailsByIdRequest(employeeId)
    return res.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
}); 

export const createEmployee = createAsyncThunk("employee/addEmployee", async (employeeData, thunkApi) => {
  try {
    const res = await addEmployeeRequest(employeeData)
    return res.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
}); 

export const updateEmployee = createAsyncThunk("employee/updateEmployee", async (employeeData, thunkApi) => {
  try {
    const res = await updateEmployeeRequest(employeeData)
    return res.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
}); 

export const deleteEmployee = createAsyncThunk("employee/deleteEmployee", async (employeeId, thunkApi) => {
  try {
    await deleteEmployeeRequest(employeeId)
    return employeeId;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
}); 

export const setFilterForEmployee = createAsyncThunk("employee/filter", async(filter) => {
  return filter
});

export const clearEmployee = createAction("employee/clear")
