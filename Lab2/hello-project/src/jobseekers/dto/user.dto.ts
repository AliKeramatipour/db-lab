import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'

export default class UserDto {
    @ApiProperty({type: String})    
    readonly username: string;
    
    @ApiProperty({type: String})    
    readonly password: string;

    @ApiProperty({type: String})    
    readonly name: string;

    @ApiProperty({type: String})    
    readonly email: string;

    @ApiProperty({type: String})    
    readonly phone: string;
}