import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
export default class CreateUserDto {
    @ApiProperty({type: String})    
    readonly name: string;
    
    @ApiPropertyOptional({type: [Number]})    
    readonly books: number[] ;
}