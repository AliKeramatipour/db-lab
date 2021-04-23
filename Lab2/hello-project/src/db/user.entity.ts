import { Entity, Column, BaseEntity, OneToMany, PrimaryColumn, OneToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import ResumeEntity from './resume.entity';
import ProjectEntity from './project.entity';
import RequestEntity from './request.entity';
@Entity()
export default class UserEntity extends BaseEntity {
    @PrimaryColumn({ length: 500})
    username: string;

    @Column({ length: 500 })
    password: string;

    @Column({ length: 500 })
    name: string;

    @Column({ length: 500 })
    email: string;

    @Column({ length: 500 })
    phone: string;

    @OneToOne(() => ResumeEntity, resumeEntity => resumeEntity.userEntity)
    resumeEntity: ResumeEntity;

    @OneToMany(type => ProjectEntity, project => project.user)
    projects: ProjectEntity[];

    @OneToMany(type => RequestEntity, request => request.user)
    requests: RequestEntity[];
}