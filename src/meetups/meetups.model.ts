import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface MeetupCreationAttribute {
    description: string;
    date: string;
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
        example: "Meetup description...",
        description: "Description",
    })
    @Column({
        type: DataType.STRING,
    })
    description: string;

    @ApiProperty({ example: "22.10.2023", description: "Date" })
    @Column({
        type: DataType.STRING,
    })
    date: string;
    
    @ApiProperty({ example: ["key1", "key2"], description: "Key Words" })
    @Column({
        type: DataType.ARRAY(DataType.STRING),
    })
    keyWords: string[];
}

