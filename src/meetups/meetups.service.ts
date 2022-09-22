import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreateMeetupDto } from "./dto/create-meetup.dto";
import { Meetup } from "./meetups.model";

const byField = (field, ascending) => (a, b) => (a[field] > b[field] ? (ascending ? -1 : 1) : ascending ? 1 : -1);

@Injectable()
export class MeetupsService {
    constructor(
        @InjectModel(Meetup) private meetupRepository: typeof Meetup,
    ) {}

    async createMeetup(dto: CreateMeetupDto) {
        return this.meetupRepository.create(dto);
    }

    async getAllMeetups(query: any) {
        let meetups: Meetup[];
        if (query.sort) {
            meetups = await this.meetupRepository.findAll();
            return meetups.sort(byField(query.sort, true));
        }
        meetups = await this.meetupRepository.findAll({
            where: query,
        });
        return meetups;
    }

    async getAllMeetupsByValue(value: any) {
        return await this.meetupRepository.findAll();
    }

    async getOneMeetup(id: number) {
        return await this.meetupRepository.findOne({ where: { id } });
    }

    async updateMeetup(id: number, dto: CreateMeetupDto) {
        return await this.meetupRepository.update(dto, {
            where: { id: id },
        });
    }

    async deleteMeetup(id: number) {
        return await this.meetupRepository.destroy({
            where: { id: id },
        });
    }

    async getMeetupById(id: number) {
        return await this.meetupRepository.findOne({
            where: {
                id,
            },
        });
    }
}
