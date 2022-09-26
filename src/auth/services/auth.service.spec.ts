import { Test, TestingModule } from "@nestjs/testing";

import { CreateUserDto } from "../../users/dto/create-user.dto";
import { AuthService } from "./auth.service";

/* eslint-disable class-methods-use-this */

class ApiServiceMock {
    login(dto: CreateUserDto) {
        return {};
    }

    registration(dto: CreateUserDto) {
        return null;
    }
}
describe.only("AuthService", () => {
    let authService: AuthService;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: AuthService,
            useClass: ApiServiceMock,
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, ApiServiceProvider],
        }).compile();
        authService = module.get<AuthService>(AuthService);
    });

    it("should call login method with expected params", async () => {
        const loginSpy = jest.spyOn(authService, "login");
        const dto = new CreateUserDto();
        authService.login(dto);
        expect(loginSpy).toHaveBeenCalledWith(dto);
    });

    it("should call registration method with expected params", async () => {
        const registrationSpy = jest.spyOn(
            authService,
            "registration",
        );
        const dto = new CreateUserDto();
        authService.registration(dto);
        expect(registrationSpy).toHaveBeenCalledWith(dto);
    });
});
