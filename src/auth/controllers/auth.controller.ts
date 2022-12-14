import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "../../users/dto/create-user.dto";
import { AuthService } from "../services/auth.service";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/login")
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @Post("/registration")
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @Get()
    @UseGuards(AuthGuard("google"))
    static googleAuth(@Req() req) {}

    @Get("/google/callback")
    @UseGuards(AuthGuard("google"))
    googleAuthRedirect(@Req() req) {
        return this.authService.googleLogin(req);
    }
}
