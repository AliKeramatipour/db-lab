import { Body, Controller, Header, Get, ParseIntPipe, Post, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import delUserDto from './dto/del-user.dto';
import updUserDto from './dto/upd-user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

//'postUser()' will handle the creating of new User
  @Header('Content-Type', 'application/json')
  @ApiResponse({status:201, description: 'Success: User added.'})
  @ApiResponse({status:400, description: 'Failure: Failed to add user.'})
  @Post('post')
  postUser( @Body() user: CreateUserDto) {
    return this.usersService.insert(user);
  }

  
// 'getAll()' returns the list of all the existing users in the database
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status:200, description: 'Success: Recieved all users.' })
  @ApiResponse({ status:500, description: 'Failure: Request failed.' })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

//'getBooks()' return all the books which are associated with the user 
// provided through 'userID' by the request  
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status:200, description: 'Success: Recieved user\'s books.' })
  @ApiResponse({ status:500, description: 'Failure: Failed to retrieve user\'s books.' })
  @Post('books')
  getBooks( @Body() user: delUserDto ) {
    return this.usersService.getBooksOfUser(user);
  }

  @Header('Content-Type', 'application/json')
  @ApiResponse({ status:200, description: 'Success: User deleted.' })
  @ApiResponse({ status:400, description: 'Failure: Deletion failed.' })
  @ApiResponse({ status:500, description: 'Failure: Deletion failed.' })
  @Delete()
  deleteUser( @Body() delUser: delUserDto) {
      return this.usersService.delete(delUser);
  }

  @Header('Content-Type', 'application/json')
  @ApiResponse({ status:201, description: 'Success: User updated.' })
  @ApiResponse({ status:400, description: 'Failure: Update failed.' })
  @ApiResponse({ status:500, description: 'Failure: Update failed.' })
  @Put()
  updUser( @Body() updUser: updUserDto) {
      return this.usersService.update(updUser);
  }


}