import { IsString } from "class-validator";

export class SetRoleDto {
    @IsString({ message: "Must be a string" })
    readonly value: string;

    @IsString({ message: "Must be a number" })
    readonly userId: number;
}
