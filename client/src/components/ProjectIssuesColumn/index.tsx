import React, { useState, useEffect } from 'react';
import { Segment, Button, Icon } from 'semantic-ui-react';
import IssueCard from 'components/IssueCard';
import CreateIssueModal from 'containers/CreateIssueModal';
import { useTranslation } from 'react-i18next';
import { getProjectIssues } from 'services/projects.service';

interface Props {
	projectId: string;
}

const ProjectIssuesColumn: React.FC<Props> = ({ projectId }) => {
	const [issues, setIssues] = useState<WebApi.Result.IssueResult[] | null>(null);
	const { t } = useTranslation();

	useEffect(() => {
		if (!issues) {
			getProjectIssues(projectId).then(setIssues);
		}
	}, [projectId, issues]);

	if (!issues) {
		return null;
	}

	return (
		<Segment style={{ backgroundColor: '#EEE', height: '80%', width: 300, marginLeft: 20 }}>
			<CreateIssueModal projectID={projectId} onClose={() => setIssues(null)}>
				<Button floated="right" positive compact>
					<Icon name="plus circle" />
					{t('create_issue')}
				</Button>
			</CreateIssueModal>
			<div style={{ clear: 'both' }} />
			<div style={{ marginTop: 10 }}>
				{issues.length > 0
					? issues.map((issue, i) => <IssueCard noDrag issue={issue} index={i} key={i} />)
					: 'No cards'}
			</div>
		</Segment>
	);
};

export default ProjectIssuesColumn;
