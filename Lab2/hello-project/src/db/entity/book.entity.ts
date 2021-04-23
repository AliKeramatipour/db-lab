import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import UserEntityPrime from './user.entity';
import GenreEntity from './genre.entity';

@Entity()
export default class BookEntity extends BaseEntity 
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  // n:1 relation with books
  @ManyToOne(type => UserEntityPrime, user => user.books)
  user: UserEntityPrime;

  // n:n relation with genre
  @ManyToMany(type => GenreEntity)
  @JoinTable()
  genres: GenreEntity[];
  
}