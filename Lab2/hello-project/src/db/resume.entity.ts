import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import UserEntity from './user.entity';

@Entity()
export default class ResumeEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    userEntity: UserEntity;
}