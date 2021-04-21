import { ApiProperty } from '@nestjs/swagger'
export default class delBookDto {
    @ApiProperty({type: Number})
    readonly bookID: number;
}