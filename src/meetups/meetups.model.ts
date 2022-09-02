import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";

import { User } from "../users/users.model";
import { UserMeetups } from "./user-meetups.model";

interface MeetupCreationAttribute {
    name: string;
    description: string;
    timeAndPlace: string;
    keyWords: string[];
}

@Table({ tableName: "meetups" })
export class Meetup extends Model<Meetup, MeetupCreationAttribute> {
    @ApiProperty({ example: 1, description: "Identifier" })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: "Meetup#2",
        description: "Name Or Theme Of The Meetup",
    })
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @ApiProperty({
        example: "Meetup description...",
        description: "Meetup Description",
    })
    @Column({
        type: DataType.STRING,
    })
    description: string;

    @ApiProperty({
        example: "22.10.2023 19.00 Zoom",
        description: "Time And Place",
    })
    @Column({
        type: DataType.STRING,
    })
    timeAndPlace: string;

    @ApiProperty({ example: ["key1", "key2"], description: "Key Words" })
    @Column({
        type: DataType.ARRAY(DataType.STRING),
    })
    keyWords: string[];

    @BelongsToMany(() => User, () => UserMeetups)
    users: User[];
}

