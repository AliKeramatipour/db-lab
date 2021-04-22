import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
export default class CreateUserDto {
    @ApiProperty({type: String})    
    readonly name: string;
    
    @ApiProperty({type: String})    
    readonly password: string;

    @ApiPropertyOptional({type: [Number]})    
    readonly books: number[] ;
}