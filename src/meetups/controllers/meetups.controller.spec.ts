import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";

import { CreateMeetupDto } from "../dto/create-meetup.dto";
import { MeetupsService } from "../services/meetups.service";
import { MeetupsController } from "./meetups.controller";

describe("MeetupsController", () => {
    let meetupsController: MeetupsController;
    let meetupsService: MeetupsService;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: MeetupsService,
            useFactory: () => ({
                createMeetup: jest.fn(() => {}),
                getAllMeetups: jest.fn(() => []),
                getOneMeetup: jest.fn(() => {}),
                updateMeetup: jest.fn(() => {}),
                deleteMeetup: jest.fn(() => {}),
            }),
        };
        const app: TestingModule = await Test.createTestingModule({
            controllers: [MeetupsController],
            providers: [
                MeetupsService,
                ApiServiceProvider,
                JwtService,
            ],
        }).compile();

        meetupsController = app.get<MeetupsController>(MeetupsController);
        meetupsService = app.get<MeetupsService>(MeetupsService);
    });

    it("calling createMeetup method", () => {
        const dto = new CreateMeetupDto();
        meetupsController.createOne(dto);
        expect(meetupsService.createMeetup).toHaveBeenCalledWith(dto);
    });

    it("calling getAllMeetups method", () => {
        meetupsController.getAll({});
        expect(meetupsService.getAllMeetups).toHaveBeenCalled();
    });

    it("calling getMeetupById method", () => {
        const id = 1;
        meetupsController.getOne(id);
        expect(meetupsService.getOneMeetup).toHaveBeenCalledWith(id);
    });

    it("calling updateMeetup method", () => {
        const dto = new CreateMeetupDto();
        const id = 1;
        meetupsController.updateOne(dto, id);
        expect(meetupsService.updateMeetup).toHaveBeenCalledWith(
            dto,
            id,
        );
    });

    it("calling deleteMeetup method", () => {
        const id = 1;
        meetupsController.deleteOne(id);
        expect(meetupsService.deleteMeetup).toHaveBeenCalledWith(id);
    });
});
