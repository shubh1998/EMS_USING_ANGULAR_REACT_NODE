import { call, takeLatest, put } from "redux-saga/effects";
import { fetchEmployeesListRequest } from "../../../utils/services/employee.service";
import { fetchEmployeeList, setEmployees } from "../../redux/Employee/employeeSlice";

function* handleFetchEmployeeRequest(action) {
  try {
    let res = yield call(fetchEmployeesListRequest, action.payload);
    if (res.data.success) {
      console.info("Employees fetched successfully !");
      yield put(setEmployees(res.data));
    } else {
      console.error(res);
    }
  } catch (error) {
    console.error(error);
  }
}

function* watcherFetchEmployeesList() {
  yield takeLatest(fetchEmployeeList.type, handleFetchEmployeeRequest);
}

export default watcherFetchEmployeesList;
