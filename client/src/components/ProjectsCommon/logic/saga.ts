import { NotificationManager } from 'react-notifications';
import { deleteProject } from 'services/projects.service';
import { all, put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import * as projectListActions from 'containers/Projects/logic/actions';

export function* deletingProject({ id, projects }: ReturnType<typeof actions.startDeletingProject>) {
	try {
		yield call(deleteProject, { id });
		yield put(actions.successDeletingProject());

		const updatedProjectList = projects.filter((project) => project.id !== id);
		yield put(projectListActions.updateProjects({ projects: updatedProjectList }));
		NotificationManager.success('Project has been deleted', 'Success', 5000);
	} catch (error) {
		yield put(actions.failDeletingProject());
		NotificationManager.error(error.statusText, 'Fail', 5000);
	}
}

function* watchDeletingProject() {
	yield takeEvery(actionTypes.START_DELETING_PROJECT, deletingProject);
}

export default function* projectCommonSaga() {
	yield all([watchDeletingProject()]);
}
