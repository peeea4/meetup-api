import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { Meetup } from "./meetups/meetups.model";
import { MeetupsModule } from "./meetups/meetups.module";
import { User } from "./users/users.model";
import { UsersModule } from "./users/users.module";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: "postgres",
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_POSRT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Meetup],
            autoLoadModels: true,
        }),
        UsersModule,
        MeetupsModule,
    ],
})
export class AppModule {}

