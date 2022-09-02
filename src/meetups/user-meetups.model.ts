import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { User } from "../users/users.model";
import { Meetup } from "./meetups.model";

@Table({ tableName: "user-meetups", createdAt: false, updatedAt: false })
export class UserMeetups extends Model<UserMeetups> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Meetup)
    @Column({
        type: DataType.INTEGER,
    })
    meetupId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number;
}

