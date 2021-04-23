import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'

export default class ProjectDto {
    @ApiProperty({type: String})    
    readonly field: string;
    
    @ApiProperty({type: String})    
    readonly name: string;

    @ApiProperty({type: String})    
    readonly skills: string;

    @ApiProperty({type: String})    
    readonly budget: string;

    @ApiProperty({type: String})    
    readonly due_date: string;

    @ApiProperty({type: String})    
    readonly creator_user: string;
}