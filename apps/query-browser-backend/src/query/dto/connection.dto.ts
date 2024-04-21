import {IsNotEmpty, IsOptional} from 'class-validator';

export class ConnectionDto {
    @IsNotEmpty()
    username: string;

    @IsOptional()
    password: string;

    @IsNotEmpty()
    host: string;

    @IsNotEmpty()
    databaseName: string;
}
