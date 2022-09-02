import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { AuthModule } from "../auth/auth.module";
import { User } from "../users/users.model";
import { MeetupsController } from "./meetups.controller";
import { Meetup } from "./meetups.model";
import { MeetupsService } from "./meetups.service";
import { UserMeetups } from "./user-meetups.model";

@Module({
    controllers: [MeetupsController],
    providers: [MeetupsService],
    imports: [
        SequelizeModule.forFeature([Meetup, User, UserMeetups]),
        forwardRef(() => AuthModule),
    ],
    exports: [MeetupsService],
})
export class MeetupsModule {}

