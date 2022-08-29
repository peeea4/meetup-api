import { Column, DataType, Model, Table } from "sequelize-typescript";

interface MeetupCreationAttribute {
    description: string;
    date: string;
    keyWords: string;
}

@Table({ tableName: "meetups" })
export class Meetup extends Model<Meetup, MeetupCreationAttribute> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    @Column({
        type: DataType.STRING,
    })
    description: string;
    @Column({
        type: DataType.STRING,
    })
    date: string;
    @Column({
        type: DataType.STRING,
    })
    keyWords: string;
}

