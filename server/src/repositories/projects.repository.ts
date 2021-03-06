import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Projects } from '../entity/Projects';

@EntityRepository(Projects)
export class ProjectsRepository extends Repository<Projects> {
	getOne(id: string): Promise<Projects | undefined> {
		return this.findOne(id, { relations: ['users', 'lead'] });
	}

	getOneProject(id: string, userId: string): Promise<Projects | undefined> {
		return getRepository(Projects)
			.createQueryBuilder('project')
			.leftJoinAndSelect('project.lead', 'lead')
			.leftJoinAndSelect('project.users', 'users')
			.leftJoinAndSelect('project.boards', 'boards')
			.leftJoin('project.users', 'user')
			.where('project.id = :id', { id })
			.andWhere('user.id = :userId', { userId })
			.getOne();
	}

	getWithIssuesById(id: string): Promise<Projects | undefined> {
		return getRepository(Projects)
			.createQueryBuilder('project')
			.leftJoinAndSelect('project.issues', 'issues')
			.where('project.id = :id', { id })
			.getOne();
	}

	getOneByKey(key: string): Promise<Projects | undefined> {
		return this.findOne({ key }, { withDeleted: true });
	}

	async getAllByUserId(id: string): Promise<Projects[]> {
		return getRepository(Projects)
			.createQueryBuilder('project')
			.leftJoin('project.issues', 'issue')
			.addSelect('issue.id')
			.leftJoin('issue.status', 'issueStatus')
			.addSelect('issueStatus.title')
			.leftJoin('issue.assigned', 'user')
			.addSelect('user.id')
			.leftJoinAndSelect('project.lead', 'lead')
			.leftJoinAndSelect('project.boards', 'boards')
			.leftJoin('project.users', 'users')
			.where('users.id = :id', { id })
			.getMany();
	}

	createOne(data: Projects) {
		const entity = this.create(data);
		return this.save(entity);
	}

	updateOne(data: Projects) {
		return this.save(data);
	}

	deleteOneById(id: string) {
		return this.softDelete(id);
	}

	getKeys() {
		return this.find({ select: ['key'], withDeleted: true });
	}
}
