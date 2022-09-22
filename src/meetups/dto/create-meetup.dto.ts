import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class CreateMeetupDto {
    @ApiProperty({
        example: "Meetup#2",
        description: "Name Or Theme Of The Meetup",
    })
    @IsString({ message: "Must be a string" })
    readonly name: string;

    @ApiProperty({
        example: "Meetup description...",
        description: "Description",
    })
    @IsString({ message: "Must be a string" })
    readonly description: string;

    @ApiProperty({
        example: "22.10.2023 19.00 Zoom",
        description: "Time And Place",
    })
    @IsString({ message: "Must be a string" })
    readonly timeAndPlace: string;

    @ApiProperty({
        example: ["key1", "key2"],
        description: "Key Words",
    })
    @IsArray({ message: "Must be an array" })
    readonly keyWords: string[];
}
