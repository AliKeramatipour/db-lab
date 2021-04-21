import { ApiProperty } from '@nestjs/swagger'
export default class updBookDto {

    @ApiProperty({type: Number})
    readonly bookID: number;

    @ApiProperty({type: String})
    readonly name: string;

    @ApiProperty({type: Number})
    readonly userID: number;

    @ApiProperty({type: [Number]})
    readonly genreIDs: number[];
  }