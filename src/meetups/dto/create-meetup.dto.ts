import { ApiProperty } from "@nestjs/swagger";

export class CreateMeetupDto {
    @ApiProperty({ example: "Meetup description...", description: "Description" })
    readonly description: string;

    @ApiProperty({ example: "22.10.2023", description: "Date" })
    readonly date: string;
    
    @ApiProperty({ example: ["key1", "key2"], description: "Key Words" })
    readonly keyWords: string[];
}
