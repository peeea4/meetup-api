import { ApiProperty } from "@nestjs/swagger";
import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
} from "sequelize-typescript";

import { Meetup } from "../meetups/meetups.model";
import { UserMeetups } from "../meetups/user-meetups.model";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";

interface UserCreationAttribute {
    email: string;
    password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttribute> {
    @ApiProperty({ example: 1, description: "Identifier" })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: "user@emai.com", description: "Email" })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @ApiProperty({ example: "12345678", description: "Password" })
    @Column({
        type: DataType.STRING,
    })
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @BelongsToMany(() => Meetup, () => UserMeetups)
    meetups: Meetup[];
}
