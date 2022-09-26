import { Test, TestingModule } from "@nestjs/testing";

import { CreateMeetupDto } from "../dto/create-meetup.dto";
import { MeetupsService } from "./meetups.service";

/* eslint-disable class-methods-use-this */

class ApiServiceMock {
    createMeetup(dto: any) {
        return {};
    }

    getOneMeetup(id: number) {
        return {};
    }

    deleteMeetup(id: number) {
        return null;
    }

    updateMeetup(id: number, dto: any) {
        return {};
    }

    getAllMeetups(query: any) {
        return [];
    }
}
describe.only("MeetupsService", () => {
    let meetupsService: MeetupsService;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: MeetupsService,
            useClass: ApiServiceMock,
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [MeetupsService, ApiServiceProvider],
        }).compile();
        meetupsService = module.get<MeetupsService>(MeetupsService);
    });

    it("should call createMeetup method with expected params", async () => {
        const createMeetupSpy = jest.spyOn(
            meetupsService,
            "createMeetup",
        );
        const dto = new CreateMeetupDto();
        meetupsService.createMeetup(dto);
        expect(createMeetupSpy).toHaveBeenCalledWith(dto);
    });

    it("should call updateMeetup method with expected params", async () => {
        const updateMeetupSpy = jest.spyOn(
            meetupsService,
            "updateMeetup",
        );
        const meetupId = 1;
        const dto = new CreateMeetupDto();
        meetupsService.updateMeetup(dto, meetupId);
        expect(updateMeetupSpy).toHaveBeenCalledWith(dto, meetupId);
    });

    it("should call deleteMeetup method with expected param", async () => {
        const deleteMeetupSpy = jest.spyOn(
            meetupsService,
            "deleteMeetup",
        );
        const meetupId = 1;
        meetupsService.deleteMeetup(meetupId);
        expect(deleteMeetupSpy).toHaveBeenCalledWith(meetupId);
    });

    it("should call getAllMeetups method with expected param", async () => {
        const getAllUsersSpy = jest.spyOn(
            meetupsService,
            "getAllMeetups",
        );
        meetupsService.getAllMeetups({});
        expect(getAllUsersSpy).toHaveBeenCalledWith({});
    });

    it("should call getOneMeetup method with expected param", async () => {
        const getUsersByEmaileSpy = jest.spyOn(
            meetupsService,
            "getOneMeetup",
        );
        const meetupId = 1;
        meetupsService.getOneMeetup(meetupId);
        expect(getUsersByEmaileSpy).toHaveBeenCalledWith(meetupId);
    });
});
