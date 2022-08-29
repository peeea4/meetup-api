import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreateMeetupDto } from "./dto/create-meetup.dto";
import { Meetup } from "./meetups.model";

@Injectable()
export class MeetupsService {
    constructor(@InjectModel(Meetup) private meetupRepository: typeof Meetup) {}
    async createMeetup(dto: CreateMeetupDto) {
        const meetup = await this.meetupRepository.create(dto);
        return meetup;
    }
    async getAllMeetups() {
        const meetups = await this.meetupRepository.findAll();
        return meetups;
    }
}

