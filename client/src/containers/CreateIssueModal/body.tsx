import React, { useState } from 'react';
import { Modal, Form, Button, Header, Icon, Divider, InputOnChangeData } from 'semantic-ui-react';
import { useCreateIssueModalContext } from './logic/context';
import TagsInput from 'components/common/TagsInput';
import { connect, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { createIssue } from 'pages/IssuePage/logic/actions';
import { useTranslation } from 'react-i18next';
import { getUsername } from 'helpers/getUsername.helper';
import { isNumber } from 'util';
import { IssueConstants } from 'constants/Issue';
import IssueFileInput from 'components/IssueFileInput';
import { initialState } from './logic/initalState';

interface Props {
	children: JSX.Element;
	issueTypes: WebApi.Entities.IssueType[];
	priorities: WebApi.Entities.Priority[];
	boardColumnID?: string;
	sprintID?: string;
	boardID?: string;
	projectID?: string;
	onClose?: (data: WebApi.Issue.PartialIssue) => void;
	projects: WebApi.Entities.Projects[];
	projectsLoading: boolean;
	users: WebApi.Entities.UserProfile[];
}

interface SelectOption {
	key: string | number;
	value: any;
	text: string | JSX.Element;
	style?: any;
}

const CreateIssueModalBody: React.FC<Props> = ({
	children,
	issueTypes,
	priorities,
	projects,
	projectsLoading,
	boardColumnID,
	onClose,
	projectID,
	users,
	sprintID,
	boardID,
}) => {
	const { t } = useTranslation();
	const context = useCreateIssueModalContext();
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [isStoryPointValid, setIsStoryPointValid] = useState(true);
	const [attachments, setAttachments] = useState<File[]>([]);
	const dispatch = useDispatch();

	const typeOpts: SelectOption[] = issueTypes.map((type) => ({
		key: type.id,
		value: type.id,
		text: (
			<>
				{type.icon ? <Icon name={type.icon as any} color={type.color as any} /> : ''}
				<span style={{ color: type.color }}>{type.title ?? 'untitled'}</span>
			</>
		),
		style: {
			color: type.color ?? 'white',
		},
	}));

	const priorityOpts: SelectOption[] = priorities.map((priority) => ({
		key: priority.id,
		value: priority.id,
		text: (
			<>
				{priority.icon ? <Icon name={priority.icon as any} color={priority.color as any} /> : ''}
				<span style={{ color: priority.color }}>{priority.title ?? 'untitled'}</span>
			</>
		),
		style: {
			color: priority.color ?? 'white',
		},
	}));

	const labelOpts: SelectOption[] = labels.map((label, i) => ({
		key: i,
		value: label,
		text: label,
	}));

	const projectsOpts: SelectOption[] = projects.map((project) => ({
		key: project.id,
		value: project.id,
		text: project.name,
	}));

	const usersOpts: SelectOption[] = users.map((user) => ({
		key: user.id,
		value: user.id,
		text: getUsername(user),
	}));

	const getSetOpenFunc = (value: boolean) => () => setIsOpened(value);

	const submit = async (event: React.FormEvent) => {
		event.preventDefault();
		const projectCond = !projectID ? context.data.project : true;
		const allFields = context.data.type && context.data.summary && context.data.priority && projectCond;

		if (!allFields || !isStoryPointValid) {
			return;
		}

		const data = {
			...context.data,
			...(boardColumnID ? { boardColumn: boardColumnID } : {}),
			sprint: sprintID,
			board: boardID,
			project: projectID ?? context.data.project,
			assigned: context.data.assigned,
		};

		dispatch(createIssue({ data, files: attachments }));

		if (onClose) {
			onClose(data);
		}

		setIsOpened(false);
	};

	const handleStoryPointChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
		const { value } = data;
		const number = parseInt(value, 10);
		if (value.length === 0) {
			context.set('storyPoint', data.value);
			setIsStoryPointValid(true);
			return;
		}
		if (isNumber(number) && number <= IssueConstants.maxStoryPoint && number >= IssueConstants.minStoryPoint) {
			context.set('storyPoint', data.value);
			setIsStoryPointValid(true);
		} else {
			setIsStoryPointValid(false);
		}
	};

	const clearContext = () => {
		// Can't do it without any
		Object.keys(context.data).forEach((key) => context.set(key as any, (initialState as any)[key]));
	};

	if (projectsLoading) {
		return null;
	}

	return (
		<Modal
			dimmer="inverted"
			as="form"
			onSubmit={submit}
			open={isOpened}
			closeOnEscape
			closeOnDimmerClick
			onClose={getSetOpenFunc(false)}
			onOpen={clearContext}
			openOnTriggerClick
			trigger={<div onClick={getSetOpenFunc(true)}>{children}</div>}
			style={{ maxWidth: 700, height: '70%' }}
		>
			<Modal.Header>
				<Header as="h1">{t('create_issue')}</Header>
			</Modal.Header>
			<Modal.Content scrolling style={{ maxHeight: '90%', height: '90%' }}>
				<Form as="div">
					<Form.Field>
						<label className="required">{t('type')}</label>
						<Form.Dropdown
							selection
							style={{ maxWidth: 200 }}
							options={typeOpts}
							placeholder={t('type')}
							onChange={(event, data) => context.set('type', data.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label className="required">{t('priority')}</label>
						<Form.Dropdown
							selection
							style={{ maxWidth: 200 }}
							options={priorityOpts}
							placeholder={t('priority')}
							onChange={(event, data) => context.set('priority', data.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label className="required">{t('summary')}</label>
						<Form.Input
							placeholder={t('summary')}
							fluid
							onChange={(event, data) => context.set('summary', data.value)}
						/>
					</Form.Field>
					{!projectID ? (
						<Form.Field>
							<label className="required">{t('project')}</label>
							<Form.Dropdown
								selection
								placeholder={t('project')}
								options={projectsOpts}
								onChange={(event, data) => context.set('project', data.value)}
							/>
						</Form.Field>
					) : (
						''
					)}
					<Form.Field>
						<label>{t('labels')}</label>
						<Form.Dropdown
							clearable
							selection
							multiple
							placeholder={t('labels')}
							options={labelOpts}
							onChange={(event, data) => context.set('labels', data.value)}
						/>
					</Form.Field>
					<Divider />
					<Form.Field>
						<label>{t('assigned')}</label>
						<Form.Dropdown
							clearable
							selection
							placeholder={t('assigned')}
							options={usersOpts}
							onChange={(event, data) => context.set('assigned', data.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label>{t('story_point')}</label>
						<Form.Input
							type="number"
							error={!isStoryPointValid}
							placeholder={t('story_point')}
							fluid
							onChange={handleStoryPointChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>{t('links')}</label>
						<TagsInput
							placeholder={t('add_link')}
							tags={context.data.links ?? []}
							onChange={(tags) => context.set('links', [...tags])}
						/>
					</Form.Field>
					<Form.Field>
						<label>{t('attachments')}</label>
						<IssueFileInput
							onChange={(attachments: File[]) => setAttachments(attachments)}
							currentFiles={attachments}
						/>
					</Form.Field>
					<Form.Field>
						<label>{t('description')}</label>
						<Form.TextArea
							placeholder={t('description')}
							onChange={(event, data) =>
								data ? context.set('description', data.value as string) : context.set('description', '')
							}
							rows={10}
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions style={{ height: 67 }}>
				<div style={{ float: 'right' }}>
					<Button className="primaryBtn" type="submit">
						{t('submit')}
					</Button>
					<Button onClick={getSetOpenFunc(false)} className="cancelBtn" compact>
						{t('cancel')}
					</Button>
				</div>
			</Modal.Actions>
		</Modal>
	);
};

const mapStateToProps = (state: RootState) => ({
	issueTypes: state.issues.types,
	priorities: state.issues.priorities,
	projects: state.projects.projects,
	projectsLoading: state.projects.isLoading,
	users: state.users.users,
});

const labels: string[] = ['label1', 'label2'];

export default connect(mapStateToProps)(CreateIssueModalBody);
