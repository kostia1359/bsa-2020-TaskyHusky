import React from 'react';
import ProjectCard from 'components/ProjectCard';
import styles from './styles.module.scss';

interface Props {
	projects: Array<{
		name: string;
		id: string;
		category?: string;
		updatedDate?: Date;
		issues?: Partial<WebApi.Entities.Issue>[];
	}>;
}

const WorkProjectBlock: React.FC<Props> = (props: Props) => {
	const { projects } = props;
	const stopLoad = 6;
	return (
		<div className={styles.container}>
			{projects.map(
				(item, index) =>
					index < stopLoad && (
						<ProjectCard key={item.id} name={item.name} category={item.category} issues={item.issues} />
					),
			)}
		</div>
	);
};

export default WorkProjectBlock;
