import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreateMeetupDto } from "../dto/create-meetup.dto";
import { Meetup } from "../meetups.model";

// eslint-disable-next-line max-len
const byField = (field: string, ascending: boolean) => (a, b) => (a[field] > b[field] ? (ascending ? -1 : 1) : ascending ? 1 : -1);

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

    async getOneMeetup(id: number) {
        return this.meetupRepository.findOne({ where: { id } });
    }

    async updateMeetup(dto: CreateMeetupDto, id: number) {
        await this.meetupRepository.update(dto, {
            where: { id },
        });
        return this.meetupRepository.findOne({
            where: { id },
        });
    }

    async deleteMeetup(id: number) {
        return this.meetupRepository.destroy({
            where: { id },
        });
    }
}
