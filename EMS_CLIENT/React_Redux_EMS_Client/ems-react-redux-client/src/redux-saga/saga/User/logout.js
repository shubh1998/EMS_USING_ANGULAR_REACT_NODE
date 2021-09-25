import { call, takeLatest, put } from "redux-saga/effects";
import { logoutRequest } from "../../../utils/services/user.service";
import { logOut, setIsLoggedIn } from "../../redux/User/userSlice";

function* handleLogoutRequest() {
  try {
    let res = yield call(logoutRequest);
    if (res.data.success) {
      console.info("User logged out successfully !");
      const payload = {
          status: false,
          name: null
      }
      yield put(setIsLoggedIn(payload));
      localStorage.clear();
    } else {
      console.error(res);
    }
  } catch (error) {
    console.error(error);
  }
}

function* watcherLogout() {
  yield takeLatest(logOut.type, handleLogoutRequest);
}

export default watcherLogout;
