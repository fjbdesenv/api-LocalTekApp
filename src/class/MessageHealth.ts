import { ApiProperty } from "@nestjs/swagger";

export class MessageHealth {

    @ApiProperty({ example: 'api' })
    name: string;

    @ApiProperty({ example: '0.1.0' })
    version: string;

    @ApiProperty({ example: 'http://localhost:5000/doc' })
    doc: string;

    constructor() { };
}