import { Body, Controller, Get, Post } from "@nestjs/common";

import { CreateMeetupDto } from "./dto/create-meetup.dto";
import { MeetupsService } from "./meetups.service";

@Controller("meetups")
export class MeetupsController {
    constructor(private meetupService: MeetupsService) {}

    @Post()
    create(@Body() meetupDto: CreateMeetupDto) {
        return this.meetupService.createMeetup(meetupDto);
    }

    @Get()
    getAll() {
        return this.meetupService.getAllMeetups();
    }
}

