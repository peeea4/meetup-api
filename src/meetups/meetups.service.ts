import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreateMeetupDto } from "./dto/create-meetup.dto";
import { Meetup } from "./meetups.model";

const byField = (field, ascending) => {
    return (a, b) => (a[field] > b[field] ? (ascending ? -1 : 1) : ascending ? 1 : -1);
};

@Injectable()
export class MeetupsService {
    constructor(@InjectModel(Meetup) private meetupRepository: typeof Meetup) {}

    async createMeetup(dto: CreateMeetupDto) {
        const meetup = await this.meetupRepository.create(dto);
        return meetup;
    }

    async getAllMeetups(query: any) {
        let meetups: Meetup[];
        if (query.sort) {
            meetups = await this.meetupRepository.findAll();
            return meetups.sort(byField(query.sort, true));
        } else {
            meetups = await this.meetupRepository.findAll({
                where: query,
            });
            return meetups;
        }
    }

    async getAllMeetupsByValue(value: any) {
        console.log(value);

        const meetups = await this.meetupRepository.findAll();
        return meetups;
    }

    async getOneMeetup(id: number) {
        const meetup = await this.meetupRepository.findOne({ where: { id } });
        return meetup;
    }

    async updateMeetup(id: number, dto: CreateMeetupDto) {
        const meetup = await this.meetupRepository.update(dto, {
            where: { id: id },
        });
        return meetup;
    }

    async deleteMeetup(id: number) {
        const meetup = await this.meetupRepository.destroy({
            where: { id: id },
        });
        return meetup;
    }

    async getMeetupById(id: number) {
        const meetup = await this.meetupRepository.findOne({
            where: {
                id,
            },
        });
        return meetup;
    }
}

