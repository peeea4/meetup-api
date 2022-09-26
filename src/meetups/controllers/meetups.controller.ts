import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CreateMeetupDto } from "../dto/create-meetup.dto";
import { Meetup } from "../meetups.model";
import { MeetupsService } from "../services/meetups.service";

@ApiTags("Meetups")
@Controller("meetups")
export class MeetupsController {
    constructor(private meetupService: MeetupsService) {}

    @ApiOperation({ summary: "Create meetup" })
    @ApiResponse({ status: 200, type: Meetup })
    @UseGuards(JwtAuthGuard)
    @Post()
    createOne(@Body() meetupDto: CreateMeetupDto) {
        return this.meetupService.createMeetup(meetupDto);
    }

    @ApiOperation({ summary: "Get list of meetups" })
    @ApiResponse({ status: 200, type: [Meetup] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Query() query: any) {
        return this.meetupService.getAllMeetups(query);
    }

    @ApiOperation({ summary: "Get one meetup by id" })
    @ApiResponse({ status: 200, type: [Meetup] })
    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    getOne(@Param("id") id: number) {
        return this.meetupService.getOneMeetup(id);
    }

    @ApiOperation({ summary: "Update one meetup by id" })
    @ApiResponse({ status: 200, type: [Meetup] })
    @UseGuards(JwtAuthGuard)
    @Put("/:id")
    updateOne(
        @Body() meetupDto: CreateMeetupDto,
        @Param("id") id: number,
    ) {
        return this.meetupService.updateMeetup(meetupDto, id);
    }

    @ApiOperation({ summary: "Delete one meetup by id" })
    @ApiResponse({ status: 200, type: [Meetup] })
    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    deleteOne(@Param("id") id: number) {
        return this.meetupService.deleteMeetup(id);
    }
}
