import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { AuthModule } from "./auth/auth.module";
import { Meetup } from "./meetups/meetups.model";
import { MeetupsModule } from "./meetups/meetups.module";
import { UserMeetups } from "./meetups/user-meetups.model";
import { Role } from "./roles/roles.model";
import { RolesModule } from "./roles/roles.module";
import { UserRoles } from "./roles/user-roles.model";
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
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, Meetup, UserRoles, UserMeetups],
            autoLoadModels: true,
        }),
        UsersModule,
        RolesModule,
        MeetupsModule,
        AuthModule,
    ],
})
export class AppModule {}

