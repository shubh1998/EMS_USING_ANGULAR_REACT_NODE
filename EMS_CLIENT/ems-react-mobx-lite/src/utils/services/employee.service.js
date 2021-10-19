import apiClient from "../axios/apiClient";

export const addEmployeeRequest = (data)=>{
    return apiClient.postRequest("/employee/add", data);
}

export const fetchEmployeesListRequest = (data)=>{
    return apiClient.getRequest("/all/employees?" + (data ?  "department="+data : "department="));
}

export const viewEmployeeDetailsRequest = (id)=>{
    return apiClient.getRequest("/getuserbyid?id=" + id);
}

export const updateEmployeeRequest = (data)=>{
    return apiClient.patchRequest("/update/user?id="+data.id, data);
}

export const deleteEmployeeRequest = (id)=>{
    return apiClient.deleteRequest("/deleteuserbyid?id=" + id);
}