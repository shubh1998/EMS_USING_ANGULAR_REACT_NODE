import { call, takeLatest } from "redux-saga/effects";
import { addEmployeeRequest } from "../../../utils/services/employee.service";
import { addEmployee } from "../../redux/Employee/employeeSlice";

function* handleAddEmployeeRequest(action) {
  try {
    let res = yield call(addEmployeeRequest, action.payload);
    if (res.data.success) {
        console.info('Employee Added Successfully')
    } else {
        console.error(res)
    }
  } catch (error) {
    console.error(error);
  }
}

function* watcherAddEmployee() {
  yield takeLatest(addEmployee.type, handleAddEmployeeRequest);
}

export default watcherAddEmployee;
