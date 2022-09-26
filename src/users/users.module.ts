import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { AuthModule } from "../auth/auth.module";
import { Meetup } from "../meetups/meetups.model";
import { MeetupsModule } from "../meetups/meetups.module";
import { UserMeetups } from "../meetups/user-meetups.model";
import { Role } from "../roles/roles.model";
import { RolesModule } from "../roles/roles.module";
import { UserRoles } from "../roles/user-roles.model";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { User } from "./users.model";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([
            User,
            Role,
            UserRoles,
            Meetup,
            UserMeetups,
        ]),
        RolesModule,
        MeetupsModule,
        forwardRef(() => AuthModule),
    ],
    exports: [UsersService],
})
export class UsersModule {}
