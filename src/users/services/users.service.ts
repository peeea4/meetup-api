import {
    HttpException,
    HttpStatus,
    Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { MeetupsService } from "../../meetups/services/meetups.service";
import { RolesService } from "../../roles/services/roles.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { SetMeetupDto } from "../dto/set-meetup.dto";
import { SetRoleDto } from "../dto/set-role.dto";
import { User } from "../users.model";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService,
        private meetupService: MeetupsService,
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set("roles", [role.id]);
        user.roles = [role];
        return user;
    }

    async createUserGoogle(dto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set("roles", [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUsers() {
        return this.userRepository.findAll({
            include: { all: true },
        });
    }

    async getOneUser(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        return user;
    }

    async updateUser(dto: CreateUserDto, id: number) {
        await this.userRepository.update(dto, {
            where: { id },
        });
        return this.userRepository.findOne({
            where: { id },
        });
    }

    async deleteUser(id: number) {
        return this.userRepository.destroy({
            where: { id },
        });
    }

    async getUsersByEmail(email: string) {
        return this.userRepository.findOne({
            where: {
                email,
            },
            include: { all: true },
        });
    }

    async setRole(dto: SetRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);

        if (role && user) {
            await user.$add("role", role.id);
            return dto;
        }

        throw new HttpException(
            "User or role not found",
            HttpStatus.NOT_FOUND,
        );
    }

    async setUser(dto: SetMeetupDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const meetup = await this.meetupService.getOneMeetup(
            dto.meetupId,
        );

        if (meetup && user) {
            await user.$add("meetups", meetup.id);
            return dto;
        }

        throw new HttpException(
            "User or meetup not found",
            HttpStatus.NOT_FOUND,
        );
    }
}
