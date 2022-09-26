import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";

import { CreateUserDto } from "../../users/dto/create-user.dto";
import { AuthService } from "../services/auth.service";
import { AuthController } from "./auth.controller";

describe("AuthController", () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: AuthService,
            useFactory: () => ({
                login: jest.fn(() => {}),
                registration: jest.fn(() => []),
            }),
        };
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService, ApiServiceProvider, JwtService],
        }).compile();

        authController = app.get<AuthController>(AuthController);
        authService = app.get<AuthService>(AuthService);
    });

    it("calling login method", () => {
        const dto = new CreateUserDto();
        authController.login(dto);
        expect(authService.login).toHaveBeenCalledWith(dto);
    });

    it("calling registration method", () => {
        const dto = new CreateUserDto();
        authController.registration(dto);
        expect(authService.registration).toHaveBeenCalledWith(dto);
    });
});
