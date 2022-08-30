import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}
    @ApiOperation({ summary: "Create user" })
    @ApiResponse({ status: 200, type: User })
    @Post()
    createOne(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({ summary: "Get user list" })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: "Get one user by id" })
    @ApiResponse({ status: 200, type: [User] })
    @Get("/:id")
    getOne(@Param("id") id: number) {
        return this.usersService.getOneUser(id);
    }

    @ApiOperation({ summary: "Update one user by id" })
    @ApiResponse({ status: 200, type: [User] })
    @Put("/:id")
    updateOne(@Body() userDto: CreateUserDto, @Param("id") id: number) {
        return this.usersService.updateUser(id, userDto);
    }

    @ApiOperation({ summary: "Delete one user by id" })
    @ApiResponse({ status: 200, type: [User] })
    @Delete("/:id")
    deleteOne(@Param("id") id: number) {
        return this.usersService.deleteUser(id);
    }
}

