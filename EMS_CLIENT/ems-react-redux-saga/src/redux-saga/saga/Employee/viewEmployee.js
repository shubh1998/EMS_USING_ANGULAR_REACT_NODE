import { call, takeLatest, put } from "redux-saga/effects";
import { viewEmployeeDetailsRequest,  } from "../../../utils/services/employee.service";
import { getEmployeeDetail, setEmployeeDetail } from "../../redux/Employee/employeeSlice";

function* handleViewEmployeeDetailsRequest(action) {
  try {
    let res = yield call(viewEmployeeDetailsRequest, action.payload);
    if (res.data.success) {
      console.info("Employee details fetched successfully !");
      yield put(setEmployeeDetail(res.data));
    } else {
      console.error(res);
    }
  } catch (error) {
    console.error(error);
  }
}

function* watcherViewEmployeesDetailsList() {
  yield takeLatest(getEmployeeDetail.type, handleViewEmployeeDetailsRequest);
}

export default watcherViewEmployeesDetailsList;
