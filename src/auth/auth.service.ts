import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/users.model";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async googleLogin(req) {
        const userEmail = await this.userService.getUsersByEmail(
            req.user.email,
        );
        if (userEmail) {
            return req.user.accessToken;
        }
        const user = await this.userService.createUserGoogle({
            ...req.user,
            password: "",
        });
        return req.user.accessToken;
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const userEmail = await this.userService.getUsersByEmail(
            userDto.email,
        );
        if (userEmail) {
            throw new HttpException(
                "User with this email already exists",
                HttpStatus.BAD_REQUEST,
            );
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({
            ...userDto,
            password: hashPassword,
        });
        return this.generateToken(user);
    }

    private async generateToken({ email, id, roles }: User) {
        return {
            token: this.jwtService.sign({ id, email, roles }),
        };
    }

    private async validateUser({email, password}: CreateUserDto) {
        const user = await this.userService.getUsersByEmail(email);
        const passwordEquals = await bcrypt.compare(password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({
            message: "Incorrect email or password",
        });
    }
}
