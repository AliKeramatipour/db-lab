import { Entity, Column, BaseEntity, OneToMany, PrimaryColumn, OneToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import ResumeEntity from './resume.entity';
import ProjectEntity from './project.entity';
import UserEntity from './user.entity';
@Entity()
export default class RequestEntity extends BaseEntity {
    @PrimaryColumn()
    username: string;

    @PrimaryColumn()
    projectID: number;

    @Column({ length: 500 })
    info: string;

    @Column({ length: 500 })
    date: string;

    @ManyToOne(() => ProjectEntity, project => project.requests)
    project: ProjectEntity;

    @ManyToOne(() => UserEntity, user => user.requests)
    user: UserEntity;
}