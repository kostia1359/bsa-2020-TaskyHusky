import { loginUser } from 'services/auth.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export function* logInRequest(action: ReturnType<typeof actions.logInUserTrigger>) {
	const { email, password } = action;

	try {
		const response: WebApi.Result.UserAuthResult = yield call(loginUser, email, password);
		const { user, jwtToken } = response;
		yield put(actions.logInUserSuccess({ user, jwtToken }));
	} catch (e) {
		console.log(e);
		// parse error here
	}
}

export function* watchUserLogin() {
	yield takeEvery(actionTypes.LOGIN_USER_TRIGGER, logInRequest);
}

export function* logOutRequest() {
	try {
		// TODO: handle token inactivation on server side
		yield put(actions.logOutUserSuccess());
	} catch (error) {
		console.log(error);
	}
}

export function* watchUserLogOut() {
	yield takeEvery(actionTypes.LOGOUT_USER_TRIGGER, logOutRequest);
}

export default function* authSaga() {
	yield all([watchUserLogin(), watchUserLogOut()]);
}
