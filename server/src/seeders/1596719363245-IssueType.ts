import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { IssueType } from '../entity/IssueType';

export class IssueType1596717562603 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const data = [
			{
				title: 'Task',
				color: 'green',
				icon: 'check',
			},
			{
				title: 'Bug',
				color: 'red',
				icon: 'bug',
			},
			{
				title: 'Story',
				color: 'teal',
				icon: 'file text',
			},
			{
				title: 'Fix',
				color: 'orange',
				icon: 'eraser',
			},
		];

		const repo = getRepository(IssueType);
		await repo.save(data);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
