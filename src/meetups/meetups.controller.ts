import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateMeetupDto } from "./dto/create-meetup.dto";
import { Meetup } from "./meetups.model";
import { MeetupsService } from "./meetups.service";

@ApiTags("Meetups")
@Controller("meetups")
export class MeetupsController {
    constructor(private meetupService: MeetupsService) {}

    @ApiOperation({ summary: "Create meetup" })
    @ApiResponse({ status: 200, type: Meetup })
    @Post()
    create(@Body() meetupDto: CreateMeetupDto) {
        return this.meetupService.createMeetup(meetupDto);
    }

    @ApiOperation({ summary: "Get list of meetups" })
    @ApiResponse({ status: 200, type: [Meetup] })
    @Get()
    getAll() {
        return this.meetupService.getAllMeetups();
    }
}

