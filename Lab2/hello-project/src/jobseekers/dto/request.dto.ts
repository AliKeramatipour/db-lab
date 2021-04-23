import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'

export default class RequestDto {
    @ApiProperty({type: Number})    
    readonly projectID: number;

    @ApiProperty({type: String})    
    readonly info: string;

    @ApiProperty({type: String})    
    readonly date: string;
}
