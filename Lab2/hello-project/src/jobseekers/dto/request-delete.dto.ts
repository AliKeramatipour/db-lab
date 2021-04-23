import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'

export default class RequestDeleteDto {
    @ApiProperty({type: Number})    
    readonly projectID: number;
}
