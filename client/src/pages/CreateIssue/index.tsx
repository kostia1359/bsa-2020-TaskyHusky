import React from 'react';
import { ControlsGetter } from 'containers/CreateIssueModal/logic/types';
import CreateIssueModal from 'containers/CreateIssueModal';
import { Button, Grid } from 'semantic-ui-react';

const CreateIssueExamplePage: React.FC = () => {
	let openModal: () => void;

	const getSetters: ControlsGetter = (open) => {
		openModal = open;
	};

	return (
		<Grid textAlign="center" verticalAlign="middle" className="fill" columns="1">
			<Grid.Column style={{ maxWidth: 500 }}>
				<Button fluid size="massive" positive onClick={() => openModal()}>
					Create Issue
				</Button>
				<CreateIssueModal>{getSetters}</CreateIssueModal>
			</Grid.Column>
		</Grid>
	);
};

export default CreateIssueExamplePage;