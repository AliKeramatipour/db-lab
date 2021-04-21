import {ApiProperty} from '@nestjs/swagger'
export default class delUserDto {
    @ApiProperty({type: Number})
    readonly userID: number;
}