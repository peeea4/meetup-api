import { Test, TestingModule } from "@nestjs/testing";

import { CreateRoleDto } from "../dto/create-role.dto";
import { RolesService } from "../services/roles.service";
import { RolesController } from "./roles.controller";

describe("UsersController", () => {
    let rolesController: RolesController;
    let rolesService: RolesService;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: RolesService,
            useFactory: () => ({
                createRole: jest.fn(() => {}),
                getRoleByValue: jest.fn(() => []),
            }),
        };
        const app: TestingModule = await Test.createTestingModule({
            controllers: [RolesController],
            providers: [RolesService, ApiServiceProvider],
        }).compile();

        rolesController = app.get<RolesController>(RolesController);
        rolesService = app.get<RolesService>(RolesService);
    });

    it("calling createRole method", () => {
        const dto = new CreateRoleDto();
        rolesController.create(dto);
        expect(rolesService.createRole).toHaveBeenCalledWith(dto);
    });

    it("calling getOneUser method", () => {
        const value = "ADMIN";
        rolesController.getbyValue(value);
        expect(rolesService.getRoleByValue).toHaveBeenCalledWith(
            value,
        );
    });
});
