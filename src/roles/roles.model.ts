import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";

import { User } from "../users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttribute {
    value: string;
    description: string;
}

@Table({ tableName: "roles", createdAt: false, updatedAt: false })
export class Role extends Model<Role, RoleCreationAttribute> {
    @ApiProperty({ example: 1, description: "Identifier" })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: "ADMIN", description: "Role" })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    value: string;

    @ApiProperty({ example: "Admin", description: "Role description" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User;
}

