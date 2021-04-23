import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ProjectEntity from 'src/db/project.entity';
import UserEntity from 'src/db/user.entity';
import UserDto from './dto/user.dto';
import ProjectDto from './dto/project.dto';
import RequestEntity from 'src/db/request.entity';
import RequestDto from './dto/request.dto';
import RequestDeleteDto from './dto/request-delete.dto';
import ResumeEntity from 'src/db/resume.entity';
import ResumeDto from './dto/resume.dto';

@Injectable()
export class JobseekersService {

    async getProject(projectID:number): Promise<ProjectEntity>{
        const projectEntity = await ProjectEntity.findOne(projectID)
        if (projectEntity == undefined)
        {
            throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }
        return projectEntity;
    }

    async getUser(username: string): Promise<UserEntity>{
        const user = await UserEntity.findOne(username);
        if (user == undefined){
            throw new HttpException('Username not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async getRequest(username: string, projectID : number): Promise<RequestEntity>{
        const req = await RequestEntity.findOne({where : {username: username, projectID:projectID}});
        if (req == undefined){
            throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
        }
        return req;
    }

    async getResume(username: string): Promise<ResumeEntity>{
        const resume = await ResumeEntity.findOne(username);
        if (resume == undefined){
            throw new HttpException('Resume not found', HttpStatus.NOT_FOUND);
        }
        return resume;
    }


    //USER FUNCTIONS
    //get /user
    async getAllUsers(): Promise<UserEntity[]> {
        return await UserEntity.find();
    }

    //post /user
    async insertUser(userDetails: UserDto): Promise<UserEntity> {
        const userEntity: UserEntity = UserEntity.create();
        const { username, password, name, email, phone } = userDetails;

        const user = await UserEntity.findOne(username);
        if (user != undefined){
            throw new HttpException('Username exists', HttpStatus.CONFLICT);
        }

        userEntity.name = name;
        userEntity.password = password;
        userEntity.username = username;
        userEntity.email = email;
        userEntity.phone = phone;
        await UserEntity.save(userEntity);
        return userEntity;
    }

    //put /user
    async updateUser(userDetails: UserDto): Promise<UserEntity> {
        const userEntity: UserEntity = UserEntity.create();
        const { username, password, name, email, phone } = userDetails;

        console.log(username);
        await this.getUser(username);

        userEntity.name = name;
        userEntity.password = password;
        userEntity.username = username;
        userEntity.email = email;
        userEntity.phone = phone;

        await UserEntity.save(userEntity);
        return userEntity;
    }

    //delete /user/{id}
    async deleteUser(username: string) : Promise<UserEntity>{
        await this.getUser(username);
        UserEntity.delete(username);
        return;
    }



    //PROJECT FUNCTIONS
    //get /project
    async getAllProjects(): Promise<ProjectEntity[]> {
        return await ProjectEntity.find();
    }

    //post /project
    async insertProject(projectDetails: ProjectDto): Promise<ProjectEntity> {
        const projectEntity: ProjectEntity = ProjectEntity.create();
        const { field, name, skills, budget, due_date, creator_user } = projectDetails;

        await this.getUser(creator_user);

        projectEntity.field = field;
        projectEntity.name = name;
        projectEntity.skills = skills;
        projectEntity.budget = budget;
        projectEntity.due_date = due_date;
        projectEntity.user = await this.getUser(creator_user);

        await ProjectEntity.save(projectEntity);
        return projectEntity;
    }

    //put /project/{id}
    async updateProject(projectID : number,projectDetails: ProjectDto): Promise<ProjectEntity> {
        const { field, name, skills, budget, due_date, creator_user } = projectDetails;
        
        const projectEntity = await this.getProject(projectID);

        projectEntity.field = field;
        projectEntity.name = name;
        projectEntity.skills = skills;
        projectEntity.budget = budget;
        projectEntity.due_date = due_date;
        projectEntity.user = await this.getUser(creator_user);
        
        await ProjectEntity.save(projectEntity);
        return projectEntity;
    }

    //delete /project/{id}
    async deleteProject(projectID : number) : Promise<UserEntity>{

        await this.getProject(projectID);
        ProjectEntity.delete(projectID);
        return;
    }

    

    // REQUESTS
    //get /project/{id}
    async getProjectRequests(projectID : number) : Promise<RequestEntity[]>{
        await this.getProject(projectID);
        return await RequestEntity.find({projectID:projectID});
    }

    //get /user/{id}/Project
    async getUserRequests(username: string) : Promise<RequestEntity[]>{
        await this.getUser(username);
        return await RequestEntity.find({username:username});
    }

    //post /user/{id}/Project
    async insertRequest(username: string, reqDetails : RequestDto) : Promise<RequestEntity>{

        const { projectID, info, date} = reqDetails;

        await this.getUser(username);
        await this.getProject(projectID);

        const req = await RequestEntity.findOne({where : {username: username, projectID:projectID}});
        if (req != undefined){
            throw new HttpException('Request exists', HttpStatus.CONFLICT);
        }

        const reqEntity: RequestEntity = RequestEntity.create();
        reqEntity.date = date;
        reqEntity.info = info;
        reqEntity.projectID = projectID;
        reqEntity.username = username;
        reqEntity.project = await this.getProject(projectID);
        reqEntity.user = await this.getUser(username);

        await RequestEntity.save(reqEntity);
        return reqEntity;
    }

    //put /user/{id}/Project
    async updateRequest(username: string, reqDetails : RequestDto) : Promise<RequestEntity>{

        const { projectID, info, date} = reqDetails;
        const reqEntity = await this.getRequest(username, projectID);

        reqEntity.date = date;
        reqEntity.info = info;

        await RequestEntity.save(reqEntity);
        return reqEntity;
    }

    //delete /user/{id}/Project
    async deleteRequest(username: string, reqDeletionDetails : RequestDeleteDto){
        const {projectID} = reqDeletionDetails;
        await this.getRequest(username, projectID);
        await this.getUser(username);
        await this.getProject(projectID);
        RequestEntity.delete({username:username, projectID:projectID});
        return;
    }


    // RESUME
    //get /user/{id}/resume
    async getUserResume(username : string) : Promise<ResumeEntity>{
        await this.getUser(username);
        return await this.getResume(username);
    }

    //post /user/{id}/resume
    async insertResume(username: string, resumeDetails : ResumeDto) : Promise<ResumeEntity>{

        const { info } = resumeDetails;

        await this.getUser(username);
        const resume = await ResumeEntity.findOne(username);
        if (resume != undefined){
            throw new HttpException('Resume exists', HttpStatus.CONFLICT);
        }


        const resumeEntity: ResumeEntity = ResumeEntity.create();
        resumeEntity.info = info;
        resumeEntity.username = username;
        resumeEntity.user = await this.getUser(username);
        await ResumeEntity.save(resumeEntity);
        return resumeEntity;
    }

    // put /user/{id}/resume
    async updateResume(username: string, resumeDetails : ResumeDto) : Promise<ResumeEntity>{

        const { info } = resumeDetails;
        await this.getUser(username);

        const resumeEntity = await this.getResume(username);

        resumeEntity.info = info;

        await ResumeEntity.save(resumeEntity);
        return resumeEntity;
    }

    // delete /user/{id}/resume
    async deleteResume(username: string){
        await this.getUser(username);
        await this.getResume(username);

        ResumeEntity.delete(username);
        return;
    }
}
