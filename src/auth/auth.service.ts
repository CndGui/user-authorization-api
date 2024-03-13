import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { db } from 'src/database/db';
import { users } from 'src/database/schema';
import { UserRequestDto } from 'src/user/user';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async singIn(data: UserRequestDto): Promise<Object> {
        const user = await db.select().from(users)
            .where(eq(users.login, data.login))

        if(!user[0]) {
            throw new UnauthorizedException("Login or password is incorrect.")
        }
        
        if(!compareSync(data.password, user[0].password)) {
            throw new UnauthorizedException("Login or password is incorrect.")
        }

        const payload = { sub: user[0].id, login: user[0].login }
        const accessToken: string = await this.jwtService.signAsync(payload)

        return {
            access_token: accessToken
        }
    }
}
