import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'

export default class ResumeDto {
    @ApiProperty({type: String})    
    readonly info: string;
}
