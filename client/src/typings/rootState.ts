import { ProjectsPeopleState } from './../containers/ProjectPeople/logic/state';
import { projectCommonState } from '../components/ProjectsCommon/logic/state';
import { ProjectState } from '../containers/ProjectSettings/logic/state';
import { FilterDefsState } from '../commonLogic/filterDefs/state';
import { ProjectsState } from '../containers/Projects/logic/state';
import { AuthState } from './../containers/LoginPage/logic/state';
import { FilterState } from 'containers/Filters/logic/state';
import { IssueState } from 'pages/IssuePage/logic/types';
import { TeamState } from 'containers/TeamPage/logic/state';
import { CreateProjectsState } from 'containers/CreateProjectModal/logic/state';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';
import { SaveFilterState } from 'containers/SaveFilterModal/logic/state';
import { UsersState } from 'commonLogic/users/state';
import { AdvancedSearch } from 'containers/AdvancedSearch/logic/state';
import { PeoplePageState } from '../containers/People/logic/state';
import { BoardsState } from '../containers/Boards/logic/state';
import { HeaderState } from '../containers/Header/logic/state';
import { ScrumBoardState } from 'containers/Board/Scrum/logic/state';

export interface RootState {
	boards: BoardsState;
	projects: ProjectsState;
	project: ProjectState;
	projectPeople: ProjectsPeopleState;
	projectCommon: projectCommonState;
	createProject: CreateProjectsState;
	auth: AuthState;
	issues: IssueState;
	filters: FilterState;
	filterDefs: FilterDefsState;
	team: TeamState;
	user: UserProfileState;
	saveFilter: SaveFilterState;
	users: UsersState;
	advancedSearch: AdvancedSearch;
	scrumBoard: ScrumBoardState;
	peoplePage: PeoplePageState;
	header: HeaderState;
}
