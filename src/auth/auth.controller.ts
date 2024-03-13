import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { UserRequestDto } from 'src/user/user';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    async singIn(@Body() data: UserRequestDto): Promise<Object> {
        return await this.service.singIn(data)
    }

    @UseGuards(AuthGuard)
    @Get()
    async getProfile(@Request() req): Promise<Object> {
        return req.user
    }
}
