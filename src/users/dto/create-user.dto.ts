import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: "user@email.com", description: "Email" })
    @IsString({ message: "Must be a string" })
    @IsEmail({}, { message: "Incorrect Email" })
    readonly email: string;

    @ApiProperty({ example: "12345678", description: "Password" })
    @IsString({ message: "Must be a string" })
    @Length(4, 16, { message: "Must be at least 4 and no more than 16 characters" })
    readonly password: string;
}

