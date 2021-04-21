import { ApiProperty } from '@nestjs/swagger'
export default class delGenreDto {
    @ApiProperty({type: Number})
    readonly genreID: number;
}