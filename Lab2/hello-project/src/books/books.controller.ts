import { BooksService } from './books.service';
import { Body, Controller, Get, Post, Header, Put, Delete } from '@nestjs/common';
import CreateBookDto from './dto/create-book.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import updBookDto from './dto/upd-book.dto';
import delBookDto from './dto/del-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
    constructor(private readonly BooksService: BooksService) {}

    @ApiBearerAuth()
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status:201, description: 'Success: Book added.' })
    @ApiResponse({ status:400, description: 'Failure: Failed to add book.' })
    @ApiResponse({ status:500, description: 'Failure: Failed to add book.' })
    @Post('post')
    postBook( @Body() book: CreateBookDto) {
        return this.BooksService.insert(book);
    }

    @ApiBearerAuth()
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status:200, description: 'Success: Recieved all books.' })
    @ApiResponse({ status:400, description: 'Failure: Request failed.' })
    @ApiResponse({ status:500, description: 'Failure: Request failed.' })
    @Get()
    getAll() {
        return this.BooksService.getAllBooks();
    }

    @ApiBearerAuth()
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status:201, description: 'Success: Book updated.' })
    @ApiResponse({ status:400, description: 'Failure: Update failed.' })
    @ApiResponse({ status:500, description: 'Failure: Update failed.' })
    @Put()
    updBook( @Body() book: updBookDto) {
        return this.BooksService.update(book);
    }

    @ApiBearerAuth()
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status:200, description: 'Success: Book deleted.' })
    @ApiResponse({ status:400, description: 'Failure: Deletion failed.' })
    @ApiResponse({ status:500, description: 'Failure: Deletion failed.' })
    @Delete()
    deleteBook( @Body() book: delBookDto) {
        return this.BooksService.delete(book);
    }
}