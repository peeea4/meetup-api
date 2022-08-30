import { ApiProperty } from "@nestjs/swagger";

export class CreateMeetupDto {
    @ApiProperty({
        example: "Meetup#2",
        description: "Name Or Theme Of The Meetup",
    })
    readonly name: string;

    @ApiProperty({
        example: "Meetup description...",
        description: "Description",
    })
    readonly description: string;

    @ApiProperty({
        example: "22.10.2023 19.00 Zoom",
        description: "Time And Place",
    })
    readonly timeAndPlace: string;

    @ApiProperty({ example: ["key1", "key2"], description: "Key Words" })
    readonly keyWords: string[];
}

