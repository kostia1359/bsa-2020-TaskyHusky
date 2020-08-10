import React from 'react';
import { Table, Dropdown, Icon, Popup, Label } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface Props {
	issue: WebApi.Entities.Issue;
}

const renderIssueType = (issueType: WebApi.Entities.IssueType) => {
	const { icon, color, title, id } = issueType;

	return (
		<Popup
			content={title}
			trigger={
				<Icon size="small" bordered color={color as 'red'} key={`icon-${id}`} name={`${icon}` as 'folder'} />
			}
		/>
	);
};
const renderStatus = (status: { title: string; color: string }) => {
	const { color, title } = status;

	return (
		<Label horizontal color={color as 'red'}>
			{title}
		</Label>
	);
};

const IssueItem = ({ issue }: Props) => {
	const mockedIssue = {
		summary: 'Very summary',
		issueKey: 'TH-1',
		assigned: {
			id: 'id-2',
			firstName: 'Ivan',
			lastName: 'Ivanov',
		},
		creator: {
			id: 'id-2',
			firstName: 'Danylo',
			lastName: 'Karpenko',
		},
		type: {
			id: 'type-id-12',
			icon: 'check',
			color: 'teal',
			title: 'Issue',
		},
		status: {
			title: 'In Progress',
			color: 'blue',
		},
		priority: { color: 'orange', icon: 'arrow up' },
		id: 'a269d9f4-1c10-40ad-81e0-7ac333804d91',
	};
	const { id, creator, type, issueKey, summary, assigned, priority, status } = mockedIssue; /*issue*/

	return (
		<Table.Row key={id}>
			<Table.Cell>{renderIssueType(type as WebApi.Entities.IssueType)}</Table.Cell>
			<Table.Cell>
				<a href={`/issue/${id}`} className={styles.underlinedLink}>
					{issueKey}
				</a>
			</Table.Cell>
			<Table.Cell>
				<div className={styles.userCell}>
					<a href={`/issue/${id}`} className={styles.underlinedLink}>
						{summary}
					</a>
				</div>
			</Table.Cell>
			<Table.Cell>
				<a href={`/profile/${assigned.id}`} className={styles.underlinedLink}>
					{assigned.firstName} {assigned.lastName}
				</a>
			</Table.Cell>
			<Table.Cell>
				<a href={`/profile/${creator.id}`} className={styles.underlinedLink}>
					{creator.firstName} {creator.lastName}
				</a>
			</Table.Cell>
			<Table.Cell>
				<Icon color={priority.color as 'red'} name={priority.icon as 'arrow up'} />
			</Table.Cell>
			<Table.Cell>{renderStatus(status)}</Table.Cell>
			<Table.Cell>Resolution</Table.Cell>
			<Table.Cell>03/серп./20</Table.Cell>
			<Table.Cell>10/серп./20</Table.Cell>
			<Table.Cell className={styles.editCell}>
				<Dropdown className={styles.dropdown} compact fluid icon={<Icon name="ellipsis horizontal" />}>
					<Dropdown.Menu>
						<Dropdown.Item text="Edit" />
						<Dropdown.Divider />
						<Dropdown.Item text="Share..." />
					</Dropdown.Menu>
				</Dropdown>
			</Table.Cell>
		</Table.Row>
	);
};

export default IssueItem;