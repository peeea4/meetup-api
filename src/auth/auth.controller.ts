import { AuthGuard } from "@nestjs/passport";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";

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
    async googleAuth(@Req() req) {}

    @Get("/google/callback")
    @UseGuards(AuthGuard("google"))
    googleAuthRedirect(@Req() req) {
        return this.authService.googleLogin(req);
    }
}

