import { STRING_VALIDATION_MSG } from './../../constant';
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class CreateMeetupDto {
    @ApiProperty({
        example: "Meetup#2",
        description: "Name Or Theme Of The Meetup",
    })
    @IsString({ message: STRING_VALIDATION_MSG })
    readonly name: string;

    @ApiProperty({
        example: "Meetup description...",
        description: "Description",
    })
    @IsString({ message: STRING_VALIDATION_MSG })
    readonly description: string;

    @ApiProperty({
        example: "22.10.2023 19.00 Zoom",
        description: "Time And Place",
    })
    @IsString({ message: STRING_VALIDATION_MSG })
    readonly timeAndPlace: string;

    @ApiProperty({
        example: ["key1", "key2"],
        description: "Key Words",
    })
    @IsArray({ message: "Must be an array" })
    readonly keyWords: string[];
}
