import { call, put , takeLatest} from "redux-saga/effects";
import { loginRequest } from "../../../utils/services/user.service";
import { loggedIn, setIsLoggedIn } from "../../redux/User/userSlice";

function* handleLoginRequest(action){
    try {
        let res = yield call(loginRequest, action.payload)
        let payload = null;
        //Set auth token in localstorage
        if(res.data.success){
            localStorage.setItem("authtoken", res.headers.authtoken);
            let NAME = res.data.data.company_name;
            if (res.data.data.name) {
              NAME = res.data.data.name;
            }
            localStorage.setItem("name", NAME);
            payload = {
                status: true,
                name: res.data.data.name
            }
            yield put(setIsLoggedIn(payload));
        }else{
            payload = {
                status: false,
                name: null
            }
        }
        yield put(setIsLoggedIn(payload));
    } catch (error) {
        console.log(error);
    }
}

function* watcherUserLogin() {
    yield takeLatest(loggedIn.type, handleLoginRequest);
}

export default watcherUserLogin;