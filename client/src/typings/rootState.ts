import { ProjectState } from './../containers/ProjectSettings/logic/state';
import { FilterDefsState } from '../commonLogic/filterDefs/state';
import { ProjectsState } from '../containers/Projects/logic/state';
import { AuthState } from './../containers/LoginPage/logic/state';
import { FilterState } from 'containers/Filters/logic/state';
import { IssueState } from 'pages/IssuePage/logic/types';
import { TeamState } from 'containers/TeamPage/logic/state';
import { CreateProjectsState } from 'containers/CreateProjectModal/logic/state';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';

export interface RootState {
	projects: ProjectsState;
	project: ProjectState;
	createProject: CreateProjectsState;
	auth: AuthState;
	issues: IssueState;
	filters: FilterState;
	filterDefs: FilterDefsState;
	team: TeamState;
	user: UserProfileState;
}
