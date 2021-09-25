import { call, takeLatest } from "redux-saga/effects";
import { signUpRequest } from "../../../utils/services/user.service";
import { signUpUser } from "../../redux/User/userSlice";

function* handleRegisterRequest(action) {
  try {
    let res = yield call(signUpRequest, action.payload);
    if (res.data.success) {
      console.info("Registered Successfully");
    } else {
      console.error(res);
    }
  } catch (error) {
    console.error(error);
  }
}

function* watcherSignUp() {
  yield takeLatest(signUpUser.type, handleRegisterRequest);
}

export default watcherSignUp;
