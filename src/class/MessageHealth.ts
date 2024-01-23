import { ApiProperty } from "@nestjs/swagger";
import { Authors } from "./Authors";

export class MessageHealth {

    @ApiProperty({ example: 'api' })
    name: string;

    @ApiProperty({ example: '0.1.0' })
    version: string;

    @ApiProperty({ example: 'http://localhost:5000/doc' })
    doc: string;

    @ApiProperty({ example: [{ name: 'Autho 1', email: 'author@email.com' }] })
    authors: Authors;

    constructor() { };
}