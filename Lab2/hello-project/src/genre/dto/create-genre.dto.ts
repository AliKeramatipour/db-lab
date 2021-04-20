import { ApiProperty } from '@nestjs/swagger'
export default class CreateGenreDto {
  
  @ApiProperty({type: String})
  readonly type: string;
}