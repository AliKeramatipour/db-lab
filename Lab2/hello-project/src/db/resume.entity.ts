import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import UserEntity from './user.entity';

@Entity()
export default class ResumeEntity extends BaseEntity {
    @PrimaryColumn()
    username: string;

    @Column()
    info: string;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;
}