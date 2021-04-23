import { Body, Controller, Header, Get, Post, Put, Delete, Param } from '@nestjs/common';
import ProjectDto from './dto/project.dto';
import RequestDeleteDto from './dto/request-delete.dto';
import RequestDto from './dto/request.dto';
import ResumeDto from './dto/resume.dto';
import UserDto from './dto/user.dto';

import { ApiResponse } from '@nestjs/swagger';
import { JobseekersService } from './jobseekers.service';
@Controller('jobseekers')
export class JobseekersController {
    constructor(private readonly jobseekersService: JobseekersService) {}

    @Header('Content-Type', 'application/json')
    @ApiResponse({status:200, description: 'Success: Recieved all users.'})
    @ApiResponse({status:400, description: 'Failure: Request failed.'})
    @Get('user')
    getAllUsers() {
        return this.jobseekersService.getAllUsers();
    }

    @Header('Content-Type', 'application/json')
    @ApiResponse({status:201, description: 'Success: User added.'})
    @ApiResponse({status:409, description: 'Failure: Username exists.'})
    @Post('user')
    insertUser( @Body() userDto: UserDto) {
        return this.jobseekersService.insertUser(userDto);
    }

    @Header('Content-Type', 'application/json')
    @ApiResponse({status:200, description: 'Success: User updated.'})
    @ApiResponse({status:404, description: 'Failure: User not found.'})
    @Put('user')
    updateUser( @Body() userDto: UserDto) {
        return this.jobseekersService.updateUser(userDto);
    }

    @Header('Content-Type', 'application/json')
    @ApiResponse({status:204, description: 'Success: User deleted.'})
    @ApiResponse({status:404, description: 'Failure: User not found.'})
    @Delete('user/:username')
    deleteUser( @Param('username') username: string) {
        return this.jobseekersService.deleteUser(username);
    }


    // Project functions

    @Header('Content-Type', 'application/json')
    @ApiResponse({status:200, description: 'Success: Recieved all projects.'})
    @ApiResponse({status:400, description: 'Failure: Request failed.'})
    @Get('project')
    getAllProjects() {
        return this.jobseekersService.getAllProjects();
    }

    @Header('Content-Type', 'application/json')
    @ApiResponse({status:201, description: 'Success: Project added.'})
    @ApiResponse({status:404, description: 'Failure: User not found.'})
    @Post('project')
    insertProject( @Body() projectDto: ProjectDto) {
        return this.jobseekersService.insertProject(projectDto);
    }

    @Header('Content-Type', 'application/json')
    @Put('project/:projectID')
    updateProject( @Param('projectID') projectID: number, @Body() projectDto: ProjectDto) {
        return this.jobseekersService.updateProject(projectID, projectDto);
    }

    @Header('Content-Type', 'application/json')
    @Delete('project/:projectID')
    deleteProject( @Param('projectID') projectID: number) {
        return this.jobseekersService.deleteProject(projectID);
    }


    // REQUEST FUNCTIONS
    @Header('Content-Type', 'application/json')
    @Get('project/:projectID')
    getProjectRequests(@Param('projectID') projectID: number) {
        return this.jobseekersService.getProjectRequests(projectID);
    }

    @Header('Content-Type', 'application/json')
    @ApiResponse({status:201, description: 'Success: Requests revieved.'})
    @ApiResponse({status:404, description: 'Failure: User not found.'})
    @Get('/user/:username/project')
    getUserRequests( @Param('username') username: string) {
        return this.jobseekersService.getUserRequests(username);
    }

    @Header('Content-Type', 'application/json')
    @Post('/user/:username/project')
    insertRequest( @Param('username') username: string, @Body() reqDto: RequestDto) {
        return this.jobseekersService.insertRequest(username, reqDto);
    }

    @Header('Content-Type', 'application/json')
    @Put('/user/:username/project')
    updateRequest( @Param('username') username: string, @Body() reqDto: RequestDto) {
        return this.jobseekersService.updateRequest(username, reqDto);
    }

    @Header('Content-Type', 'application/json')
    @Delete('/user/:username/project')
    deleteRequest( @Param('username') username: string, @Body() reqDto: RequestDeleteDto) {
        return this.jobseekersService.deleteRequest(username, reqDto);
    }


    //RESUME FUCNTIONS
    @Header('Content-Type', 'application/json')
    @Get('/user/:username/resume')
    getUserResume(@Param('username') username: string) {
        return this.jobseekersService.getUserResume(username);
    }

    @Header('Content-Type', 'application/json')
    @Post('/user/:username/resume')
    insertResume( @Param('username') username: string, @Body() resumeDto: ResumeDto) {
        return this.jobseekersService.insertResume(username, resumeDto);
    }

    @Header('Content-Type', 'application/json')
    @Put('/user/:username/resume')
    updateResume( @Param('username') username: string, @Body() resumeDto: ResumeDto) {
        return this.jobseekersService.updateResume(username, resumeDto);
    }

    @Header('Content-Type', 'application/json')
    @Delete('user/:username/resume')
    deleteResume( @Param('username') username: string) {
        return this.jobseekersService.deleteResume(username);
    }



    

}
