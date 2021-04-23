import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobseekersModule } from './jobseekers/jobseekers.module';
import UserEntity from './db/user.entity';
import RequestEntity from './db/request.entity';
import ResumeEntity from './db/resume.entity';
import ProjectEntity from './db/project.entity';

@Module({
  imports: [JobseekersModule ,
    TypeOrmModule.forFeature(
      [UserEntity, RequestEntity , ResumeEntity, ProjectEntity],
    ),

    TypeOrmModule.forRoot(),
    JobseekersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}