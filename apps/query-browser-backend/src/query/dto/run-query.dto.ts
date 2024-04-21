import {IsNotEmpty, IsOptional} from 'class-validator';
import {ConnectionDto} from "./connection.dto";

export class RunQueryDto extends ConnectionDto {
    @IsNotEmpty()
    query: string;
}
