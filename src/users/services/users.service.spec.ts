import { Test, TestingModule } from "@nestjs/testing";

/* eslint-disable class-methods-use-this */
import { CreateUserDto } from "../dto/create-user.dto";
import { SetMeetupDto } from "../dto/set-meetup.dto";
import { SetRoleDto } from "../dto/set-role.dto";
import { UsersService } from "./users.service";

class ApiServiceMock {
    createUser(dto: any) {
        return {};
    }

    getOneUser() {
        return [];
    }

    deleteUser(id: string) {
        return null;
    }

    updateUser(id: string, dto: any) {
        return [];
    }

    getAllUsers() {
        return [];
    }

    getUsersByEmail() {
        return [];
    }

    setUser() {
        return [];
    }

    setRole() {
        return [];
    }
}
describe.only("UsersService", () => {
    let usersService: UsersService;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: UsersService,
            useClass: ApiServiceMock,
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService, ApiServiceProvider],
        }).compile();
        usersService = module.get<UsersService>(UsersService);
    });

    it("should call createUser method with expected params", async () => {
        const createUserSpy = jest.spyOn(usersService, "createUser");
        const dto = new CreateUserDto();
        usersService.createUser(dto);
        expect(createUserSpy).toHaveBeenCalledWith(dto);
    });

    it("should call getOneUser method with expected param", async () => {
        const getOneUserSpy = jest.spyOn(usersService, "getOneUser");
        const userId = 1;
        usersService.getOneUser(userId);
        expect(getOneUserSpy).toHaveBeenCalledWith(userId);
    });

    it("should call updateUser method with expected params", async () => {
        const updateUserSpy = jest.spyOn(usersService, "updateUser");
        const userId = 1;
        const dto = new CreateUserDto();
        usersService.updateUser(dto, userId);
        expect(updateUserSpy).toHaveBeenCalledWith(dto, userId);
    });

    it("should call deleteUser method with expected param", async () => {
        const deleteUserSpy = jest.spyOn(usersService, "deleteUser");
        const userId = 1;
        usersService.deleteUser(userId);
        expect(deleteUserSpy).toHaveBeenCalledWith(userId);
    });

    it("should call getAllUsers method with expected param", async () => {
        const getAllUsersSpy = jest.spyOn(
            usersService,
            "getAllUsers",
        );
        usersService.getAllUsers();
        expect(getAllUsersSpy).toHaveBeenCalled();
    });

    it("should call getUsersByEmail method with expected param", async () => {
        const getUsersByEmaileSpy = jest.spyOn(
            usersService,
            "getUsersByEmail",
        );
        const userEmail = "user@email.com";
        usersService.getUsersByEmail(userEmail);
        expect(getUsersByEmaileSpy).toHaveBeenCalledWith(userEmail);
    });

    it("should call setRole method with expected param", async () => {
        const setRoleSpy = jest.spyOn(usersService, "setRole");
        const dto: SetRoleDto = { value: "USER", userId: 1 };
        usersService.setRole(dto);
        expect(setRoleSpy).toHaveBeenCalledWith(dto);
    });

    it("should call setUser method with expected param", async () => {
        const setUserSpy = jest.spyOn(usersService, "setUser");
        const dto: SetMeetupDto = { meetupId: 1, userId: 1 };
        usersService.setUser(dto);
        expect(setUserSpy).toHaveBeenCalledWith(dto);
    });
});
