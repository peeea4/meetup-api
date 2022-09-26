import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";

import { CreateUserDto } from "../dto/create-user.dto";
import { SetMeetupDto } from "../dto/set-meetup.dto";
import { SetRoleDto } from "../dto/set-role.dto";
import { UsersService } from "../services/users.service";
import { UsersController } from "./users.controller";

describe("UsersController", () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: UsersService,
            useFactory: () => ({
                createUser: jest.fn(() => {}),
                getAllUsers: jest.fn(() => []),
                getOneUser: jest.fn(() => {}),
                updateUser: jest.fn(() => {}),
                deleteUser: jest.fn(() => {}),
                setRole: jest.fn(() => {}),
                setUser: jest.fn(() => {}),
            }),
        };
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService, ApiServiceProvider, JwtService],
        }).compile();

        usersController = app.get<UsersController>(UsersController);
        usersService = app.get<UsersService>(UsersService);
    });

    it("calling createUser method", () => {
        const dto = new CreateUserDto();
        usersController.createOne(dto);
        expect(usersService.createUser).toHaveBeenCalledWith(dto);
    });

    it("calling getAllUsers method", () => {
        usersController.getAll();
        expect(usersService.getAllUsers).toHaveBeenCalled();
    });

    it("calling getOneUser method", () => {
        const id = 1;
        usersController.getOne(id);
        expect(usersService.getOneUser).toHaveBeenCalledWith(id);
    });

    it("calling updateMeetup method", () => {
        const dto = new CreateUserDto();
        const id = 1;
        usersController.updateOne(dto, id);
        expect(usersService.updateUser).toHaveBeenCalledWith(dto, id);
    });

    it("calling deleteMeetup method", () => {
        const id = 1;
        usersController.deleteOne(id);
        expect(usersService.deleteUser).toHaveBeenCalledWith(id);
    });

    it("calling setRole method", () => {
        const dto = new SetRoleDto();
        usersController.setRole(dto);
        expect(usersService.setRole).toHaveBeenCalledWith(dto);
    });

    it("calling setUser method", () => {
        const dto = new SetMeetupDto();
        usersController.setUser(dto);
        expect(usersService.setUser).toHaveBeenCalledWith(dto);
    });
});
