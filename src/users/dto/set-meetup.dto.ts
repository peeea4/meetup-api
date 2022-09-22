import { IsNumber } from "class-validator";

export class SetMeetupDto {
    @IsNumber({}, { message: "Must be a number" })
    readonly meetupId: number;

    @IsNumber({}, { message: "Must be a number" })
    readonly userId: number;
}
