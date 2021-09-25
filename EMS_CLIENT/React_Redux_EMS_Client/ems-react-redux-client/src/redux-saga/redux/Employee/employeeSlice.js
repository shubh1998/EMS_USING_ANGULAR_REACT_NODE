import { createSlice } from '@reduxjs/toolkit'
const defaultState = {
    employees: [],
    employeeDetail: null,
    filterBy: ""
};

const employeeSlice = createSlice({
    name: "employeeSlice",
    initialState: defaultState,
    reducers: {
        addEmployee: (state, action)=>{},
        updateEmployee: (state, action)=>{},
        fetchEmployeeList: (state, action)=>{},
        deleteEmployee: (state, action)=>{},
        getEmployeeDetail: (state, action)=>{},
        setEmployeeDetail: (state, action)=>{
          return {
            ...state,
            employeeDetail: action.payload.data,
          };
        },  
        setEmployees: (state, action) => {
             return {
               ...state,
               employees: action.payload.data,
             };
        }     
    }
})

export const {
  addEmployee,
  updateEmployee,
  fetchEmployeeList,
  deleteEmployee,
  getEmployeeDetail,
  setEmployeeDetail,
  setEmployees,
} = employeeSlice.actions;

export default employeeSlice.reducer;