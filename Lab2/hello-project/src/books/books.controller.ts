import { BooksService } from './books.service';
import { Body, Controller, Get, Post, Header } from '@nestjs/common';
import CreateBookDto from './dto/create-book.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('books')
export class BooksController {
    constructor(private readonly BooksService: BooksService) {}

    @Header('Content-Type', 'application/json')
    @ApiResponse({ status:201, description: 'Success: Book added.' })
    @ApiResponse({ status:400, description: 'Failure: Failed to add book.' })
    @Post('post')
    postBook( @Body() book: CreateBookDto) {
        return this.BooksService.insert(book);
    }


    @Header('Content-Type', 'application/json')
    @ApiResponse({ status:200, description: 'Success: Recieved all books.' })
    @ApiResponse({ status:400, description: 'Failure: Request failed.' })
    @Get()
    getAll() {
        return this.BooksService.getAllBooks();
    }
}