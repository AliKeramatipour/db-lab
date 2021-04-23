import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './db/entity/user.entity';
import { BooksModule } from './books/books.module';
import { GenreModule } from './genre/genre.module';
import { AuthModule } from './auth/auth.module';
import { JobseekersModule } from './jobseekers/jobseekers.module';
import BookEntity from './db/entity/book.entity';
import GenreEntity from './db/entity/genre.entity';

@Module({
  imports: [UserModule ,
            BooksModule,
            GenreModule,
    TypeOrmModule.forFeature(
      [UserEntity, BookEntity , GenreEntity],
    ),

    TypeOrmModule.forRoot(),

    AuthModule,

    JobseekersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}