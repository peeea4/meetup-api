import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { MeetupsController } from "./meetups.controller";
import { Meetup } from "./meetups.model";
import { MeetupsService } from "./meetups.service";

@Module({
    controllers: [MeetupsController],
    providers: [MeetupsService],
    imports: [SequelizeModule.forFeature([Meetup])],
})
export class MeetupsModule {}

