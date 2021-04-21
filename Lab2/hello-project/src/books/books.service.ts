import BookEntity from '../db/entity/book.entity';
import CreateBookDto from './dto/create-book.dto';
import UserEntity from '../db/entity/user.entity';
import { createQueryBuilder, getConnection } from 'typeorm';
import GenreEntity from '../db/entity/genre.entity';
import updBookDto from './dto/upd-book.dto';
import delBookDto from './dto/del-book.dto';

export class BooksService {

  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name , userID , genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(userID);
    book.genres=[];
    for ( let i = 0; i < genreIDs.length ; i++)
    {
             const genre = await GenreEntity.findOne(genreIDs[i]);
             book.genres.push(genre);
    }
    await book.save();
    return book;
  }

  async delete(delBook: delBookDto) : Promise<BookEntity>{
    const { bookID } = delBook;
    const book = await BookEntity.findOne(bookID);
    BookEntity.delete(bookID);
    return book;
  }

  async update(bookDetails: updBookDto): Promise<BookEntity> {
    const { bookID, name , userID , genreIDs } = bookDetails;
    const book = await BookEntity.findOne(bookID);
    book.name = name;
    book.user = await UserEntity.findOne(userID);
    book.genres=[];
    for ( let i = 0; i < genreIDs.length ; i++)
    {
             const genre = await GenreEntity.findOne(genreIDs[i]);
             book.genres.push(genre);
    }
    await book.save();
    return book;
  }

  async getAllBooks(): Promise<BookEntity[] > {
    // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
    return BookEntity.find();
  }
}