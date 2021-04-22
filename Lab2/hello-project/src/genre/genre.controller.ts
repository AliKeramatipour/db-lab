import { Body, Controller, Get, Post, Header, Delete, Put} from '@nestjs/common';
import GenreService from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';
import updGenreDto from './dto/upd-genre.dto';
import delGenreDto from './dto/del-genre.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiBearerAuth()
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status:201, description: 'Success: Genre added.' })
  @ApiResponse({ status:400, description: 'Failure: Failed to add genre.' })
  @Post('post')
  postGenre( @Body() genre: CreateGenreDto) {
    return this.genreService.insert(genre);
  }

  @ApiBearerAuth()
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status:200, description: 'Success: Recieved all genres.' })
  @ApiResponse({ status:400, description: 'Failure: Request failed.' })
  @Get()
  getAll() {
    return this.genreService.getAllGenre();
  }

  @ApiBearerAuth()
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status:200, description: 'Success: Genre deleted.' })
  @ApiResponse({ status:400, description: 'Failure: Deletion failed.' })
  @ApiResponse({ status:500, description: 'Failure: Deletion failed.' })
  @Delete()
  deleteGenre( @Body() genre: delGenreDto) {
      return this.genreService.delete(genre);
  }

  @ApiBearerAuth()
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status:201, description: 'Success: Genre updated.' })
  @ApiResponse({ status:400, description: 'Failure: Update failed.' })
  @ApiResponse({ status:500, description: 'Failure: Update failed.' })
  @Put()
  updGenre( @Body() genre: updGenreDto) {
      return this.genreService.update(genre);
  }

}