namespace WebApi.Board {
	export enum BoardType {
		Scrum = 'Scrum',
		Kanban = 'Kanban',
	}
}

namespace WebApi.Issue {
	import { Sprint } from '../entity/Sprint';
	import { Projects } from '../entity/Projects';

	interface PartialIssue {
		id?: string;
		type: string;
		summary?: string;
		boardColumnID?: string;
		labels?: string[];
		attachments?: string[];
		links?: string[];
		priority: string;
		description?: string;
		sprint?: Sprint;
		project?: Projects;
		issueKey?: string;
		assignedID?: string;
		creatorID?: string;
	}
}

namespace WebApi.Result {
	import { UserModel } from './User';

	interface UserAuthResult {
		user: UserModel;
		jwtToken: string;
	}

	interface IssueResult {
		id: string;
		type: {
			id: string;
			color: string;
			title: string;
			icon: string;
		};
		summary?: string;
		boardColumnID?: string;
		labels?: string[];
		attachments?: string[];
		links?: string[];
		priority: {
			id: string;
			color: string;
			title: string;
			icon: string;
		};
		description?: string;
		sprintID?: string;
		projectID?: string;
		issueKey?: string;
		assignedID?: string;
		creatorID?: string;
	}
}

namespace WebApi.Team {
	export interface TeamModel {
		id?: string;
		description?: string;
		links?: string[];
	}
}

namespace WebApi.User {
	export interface UserModel {
		id?: string;
		email: string;
		password?: string;
		lastName?: string;
		firstName?: string;
		username?: string;
		avatar?: string;
		location?: string;
		department?: string;
		organization?: string;
		jobTitle?: string;
		userSettingsId?: string;
		filtres?: string[];
	}
}

namespace WebApi.Entities {
	interface Board {
		id: string;
		boardType: BoardType;
		name: string;
		location: string;
		columns?: BoardColumn[];
		sprints?: Sprint[];
		createdBy: UserProfile;
	}

	interface BoardColumn {
		id: string;
		columnName?: string;
		status?: string;
		isResolutionSet?: boolean;
		board: Board;
	}

	interface Filter {
		id: string;
		owner?: UserProfile;
		ownerId?: string;
		name?: string;
		staredBy?: UserProfile[];
	}

	interface FilterDefinition {
		id: string;
		filterType?: string;
		dataType?: string;
		title?: string;
	}

	interface FilterPart {
		id: string;
		filterId?: string;
		filterDefId?: string;
		members?: UserProfile[];
		searchText?: string;
	}

	interface Issue {
		id: string;
		type?: IssueType;
		summary?: string;
		boardColumnID?: string;
		labels?: string;
		attachments?: string;
		links?: string;
		priority?: Priority;
		description?: string;
		sprint?: Sprint;
		project?: Projects;
		issueKey?: string;
		assignedID?: string;
		creatorID?: string;
	}

	interface IssueType {
		id: string;
		icon?: string;
		color?: string;
		title?: string;
		issues?: Issue[];
	}

	interface Priority {
		id: string;
		icon?: string;
		color?: string;
		title?: string;
		issues?: Issue[];
	}

	interface Projects {
		id: string;
		name: string;
		key: string;
		category?: string;
		defaultAssigneeID?: string;
		leadID?: string;
		creatorID: string;
		sprints?: Sprint[];
	}

	interface Sprint {
		id: string;
		sprintName?: string;
		project?: Projects;
		board?: Board;
		isActive?: boolean;
		isCompleted?: boolean;
		issues?: [];
	}

	interface Teams {
		id: string;
		teamId?: TeamsPeople[];
		description?: string;
		links?: string;
	}

	interface TeamsPeople {
		id: string;
		userId?: UserProfile;
		teamId?: Teams;
	}

	interface UserProfile {
		id: string;
		firstName?: string;
		lastName?: string;
		username?: string;
		avatar?: string;
		department?: string;
		location?: string;
		organization?: string;
		email?: string;
		jobTitle?: string;
		userSettingsId?: string;
		password?: string;
		teams?: TeamsPeople[];
		boards?: Board[];
		filters?: Filter[];
	}
}
