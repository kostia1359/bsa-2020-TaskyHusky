import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { IsDefined, IsString, MinLength } from 'class-validator';
import {BoardColumn} from './BoardColumn';
import {User} from './User';
import{BoardType} from '../models/Board';


@Entity()
export class Board {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('text')
	boardType!: BoardType;

	@Column()
	@IsString()
	@MinLength(1)
	name!:string

	@Column()
	@IsString()
	@MinLength(1)
	location!:string

	@OneToMany(type => BoardColumn, boardColumn => boardColumn.board)
	columns?: BoardColumn[];

	@ManyToOne(type => User, user => user.boards, {
		onDelete: 'CASCADE',
	})
	@IsDefined()
	createdBy!: User;
}