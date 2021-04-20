import { Body, Controller, Get, Post, Header } from '@nestjs/common';
import GenreService from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Header('Content-Type', 'application/json')
  @ApiResponse({ status:201, description: 'Success: Genre added.' })
  @ApiResponse({ status:400, description: 'Failure: Failed to add genre.' })
  @Post('post')
  postGenre( @Body() genre: CreateGenreDto) {
    return this.genreService.insert(genre);
  }


  @Header('Content-Type', 'application/json')
  @ApiResponse({ status:200, description: 'Success: Recieved all genres.' })
  @ApiResponse({ status:400, description: 'Failure: Request failed.' })
  @Get()
  getAll() {
    return this.genreService.getAllGenre();
  }
}