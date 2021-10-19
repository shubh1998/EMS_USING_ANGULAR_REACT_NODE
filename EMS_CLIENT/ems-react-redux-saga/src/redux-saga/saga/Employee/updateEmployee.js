import { call, takeLatest } from "redux-saga/effects";
import { updateEmployeeRequest } from "../../../utils/services/employee.service";
import { updateEmployee } from "../../redux/Employee/employeeSlice";

function* handleUpdateEmployeeRequest(action) {
  try {
    let res = yield call(updateEmployeeRequest, action.payload);
    if (res.data.success) {
        console.info('Employee Updated Successfully')
    } else {
        console.error(res)
    }
  } catch (error) {
    console.error(error);
  }
}

function* watcherUpdateEmployee() {
  yield takeLatest(updateEmployee.type, handleUpdateEmployeeRequest);
}

export default watcherUpdateEmployee;
