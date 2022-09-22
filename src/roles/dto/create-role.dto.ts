import { IsString } from "class-validator";

export class CreateRoleDto {
    @IsString({ message: "Should be string" })
    readonly value: string;

    @IsString({ message: "Should be string" })
    readonly description: string;
}
