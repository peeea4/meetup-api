import { Test, TestingModule } from "@nestjs/testing";

import { CreateRoleDto } from "../dto/create-role.dto";
import { RolesService } from "./roles.service";

/* eslint-disable class-methods-use-this */
class ApiServiceMock {
    createRole(dto: any) {
        return {};
    }

    getRoleByValue() {
        return [];
    }
}
describe.only("RolesService", () => {
    let rolesService: RolesService;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: RolesService,
            useClass: ApiServiceMock,
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [RolesService, ApiServiceProvider],
        }).compile();
        rolesService = module.get<RolesService>(RolesService);
    });

    it("should call createRole method with expected params", async () => {
        const createRoleSpy = jest.spyOn(rolesService, "createRole");
        const dto = new CreateRoleDto();
        rolesService.createRole(dto);
        expect(createRoleSpy).toHaveBeenCalledWith(dto);
    });

    it("should call getRoleByValue method with expected param", async () => {
        const getRoleSpy = jest.spyOn(rolesService, "getRoleByValue");
        const value = "ADMIN";
        rolesService.getRoleByValue(value);
        expect(getRoleSpy).toHaveBeenCalledWith(value);
    });
});
