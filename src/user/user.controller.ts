import { Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserRequestDto, UserResponseDto } from './user';

@Controller('users')
export class UserController {
    constructor(private service: UserService) {}
    
    @Get()
    async get(): Promise<UserResponseDto[]> {
        return await this.service.get()
    }

    @Get(":id")
    async getOne(@Param("id") id: number): Promise<UserResponseDto> {
        return await this.service.getOne(id)
    }

    @Get("raw/:id")
    async getOneRaw(@Param("id") id: number): Promise<User> {
        return await this.service.getOneRaw(id)
    }

    @Post()
    async create(@Body() data: UserRequestDto): Promise<UserResponseDto> {
        return await this.service.create(data)
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<Object> {
        return await this.service.delete(id)
    }
}
