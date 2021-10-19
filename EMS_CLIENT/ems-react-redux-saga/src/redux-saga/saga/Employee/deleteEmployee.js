import { call, takeLatest } from "redux-saga/effects";
import { deleteEmployeeRequest } from "../../../utils/services/employee.service";
import { deleteEmployee } from "../../redux/Employee/employeeSlice";

function* handleDeleteEmployeeRequest(action) {
  try {
    let res = yield call(deleteEmployeeRequest, action.payload);
    if (res.data.success) {
      console.info("Employee deleted successfully");
    } else {
      console.error(res);
    }
  } catch (error) {
    console.error(error);
  }
}

function* watcherDeleteEmployee() {
  yield takeLatest(deleteEmployee.type, handleDeleteEmployeeRequest);
}

export default watcherDeleteEmployee;
