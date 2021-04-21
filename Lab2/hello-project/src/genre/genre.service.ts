import { Injectable } from '@nestjs/common';
import CreateGenreDto from './dto/create-genre.dto';
import GenreEntity from '../db/entity/genre.entity';
import updGenreDto from './dto/upd-genre.dto';
import delGenreDto from './dto/del-genre.dto';

@Injectable()
export default class GenreService {
  async insert(genreDetails: CreateGenreDto): Promise<GenreEntity> {

    const genreEntity: GenreEntity = GenreEntity.create();
    const {type} = genreDetails;

    genreEntity.type = type;
    await GenreEntity.save(genreEntity);
    return genreEntity;
  }
  

  async delete(delGenre: delGenreDto) : Promise<GenreEntity>{
    const { genreID } = delGenre;
    const genre = await GenreEntity.findOne(genreID);
    GenreEntity.delete(genreID);
    return genre;
  }

  async update(genreDetails: updGenreDto): Promise<GenreEntity> {
    const { genreID, type } = genreDetails;
    const genre = await GenreEntity.findOne(genreID);
    genre.type = type;

    await genre.save();
    return genre;
  }

  async getAllGenre(): Promise<GenreEntity[]> {
        return await GenreEntity.find();
  }
}