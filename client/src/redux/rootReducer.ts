import { createProjectReducer } from './../containers/CreateProjectModal/logic/reducer';
import { userProfileReducer } from 'containers/ProfilePage/logiс/reducer';
import { projectsReducer } from '../containers/Projects/logic/reducer';
import { filtersReducer } from 'containers/Filters/logic/reducer';
import { authReducer } from 'containers/LoginPage/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { RootState } from 'typings/rootState';
import { issueReducer } from 'pages/CreateIssue/logic/reducer';
import { teamReducer } from 'containers/TeamPage/logic/reducer';
import { filterDefsReducer } from 'commonLogic/filterDefs/reducer';

const rootReducer: Reducer<RootState> = combineReducers({
	user: userProfileReducer,
	projects: projectsReducer,
	createProject: createProjectReducer,
	auth: authReducer,
	issues: issueReducer,
	filters: filtersReducer,
	filterDefs: filterDefsReducer,
	team: teamReducer,
});

export default rootReducer;
