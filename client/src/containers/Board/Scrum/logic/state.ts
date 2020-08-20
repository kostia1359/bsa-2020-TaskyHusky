type issuesToSprint = {
	[sprintId: string]: WebApi.Entities.Issue[];
};

export interface ScrumBoardState {
	sprints: WebApi.Entities.Sprint[];
	matchIssueToSprint: issuesToSprint;
	matchIssueToSprintShallowCopy: issuesToSprint;
	project: WebApi.Result.BoardProjectsResult;
	board: WebApi.Result.BoardResult;
}

export const initialState: ScrumBoardState = {
	sprints: [],
	matchIssueToSprint: {},
	matchIssueToSprintShallowCopy: {},
	project: {
		id: '',
		name: '',
		key: '',
		description: '',
		icon: '',
		category: '',
		createdDate: undefined,
		updatedDate: undefined,
		deletedDate: undefined,
	},
	board: {
		id: '',
		boardType: WebApi.Board.BoardType.Kanban,
		name: '',
		location: '',
		createdAt: {
			firstName: '',
			lastName: '',
			id: '',
			avatar: '',
		},
	},
};
