import { Injectable } from '@nestjs/common';
import UserEntity from '../db/entity/user.entity';
import CreateUserDto from './dto/create-user.dto';
import BookEntity from '../db/entity/book.entity';
import {getConnection} from "typeorm";
import updUserDto from './dto/upd-user.dto';
import delUserDto from './dto/del-user.dto';

@Injectable()
export class UserService {

  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    const {name, password } = userDetails;
    userEntity.name = name;
    userEntity.password = password;
    await UserEntity.save(userEntity);
    return userEntity;
  }

  async delete(delUser: delUserDto) : Promise<UserEntity>{
    const {userID} = delUser;
    const user = await UserEntity.findOne(userID);
    UserEntity.delete(userID);
    return user;
  }

  async update(userDetails: updUserDto): Promise<UserEntity> {
    const { userID, name } = userDetails;
    const user = await UserEntity.findOne(userID);
    user.name = name;
    await user.save();
    return user;
  }


  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }

  async getBooksOfUser(userBooks: delUserDto): Promise<BookEntity[]> {
    const { userID } = userBooks;
    const user: UserEntity = await UserEntity.findOne({where: {id: userID}, relations: ['books']});
    return user.books;
  }

  async findOne(userID: number): Promise<UserEntity | undefined> {
    const user = await UserEntity.findOne(userID);
    return user;
  }

}