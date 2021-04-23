import { Entity, Column, BaseEntity, OneToMany, PrimaryColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import RequestEntity from './request.entity';
import UserEntity from './user.entity';
@Entity()
export default class ProjectEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    field: string;

    @Column({ length: 500 })
    name: string;

    @Column({ length: 500 })
    skills: string;

    @Column({ length: 500 })
    budget: string;

    @Column({ length: 500 })
    due_date: string;

    @ManyToOne(type => UserEntity, user => user.projects)
    user: UserEntity;
    
    @OneToMany(type => RequestEntity, request => request.project)
    requests: RequestEntity[];
}