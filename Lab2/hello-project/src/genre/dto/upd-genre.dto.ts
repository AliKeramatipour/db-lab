import { ApiProperty } from '@nestjs/swagger'
export default class updGenreDto {
    @ApiProperty({type: Number})
    readonly genreID: number;

    @ApiProperty({type: String})
    readonly type: string;
}