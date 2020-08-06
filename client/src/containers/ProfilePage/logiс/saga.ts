import { requestGetUser, requestUpdateUser } from 'services/user.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* UpdateUser(action: ReturnType<typeof actions.requestUpdateUser>) {
	const { userData } = action;
	const user: WebApi.Entities.User = yield call(requestUpdateUser, userData);
	yield put(actions.updateUser({ partialState: user }));
}

function* GetUser(action: ReturnType<typeof actions.requestGetUser>) {
	const { id } = action;
	const user: WebApi.Entities.User = yield call(requestGetUser, id);
	yield put(actions.getUser({ partialState: user }));
}

function* watchGetUser() {
	yield takeEvery(actionTypes.REQUEST_GET_USER, GetUser);
}

function* watchUpdateUser() {
	yield takeEvery(actionTypes.REQUEST_UPDATE_USER, UpdateUser);
}

export default function* userSaga() {
	yield all([watchGetUser(), watchUpdateUser()]);
}
