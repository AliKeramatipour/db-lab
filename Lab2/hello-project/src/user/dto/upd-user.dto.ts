import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
export default class updUserDto {
    @ApiProperty({type: Number})
    readonly userID: number;
    
    @ApiProperty({type: String})    
    readonly name: string;
    
    @ApiPropertyOptional({type: [Number]})    
    readonly books: number[] ;
}