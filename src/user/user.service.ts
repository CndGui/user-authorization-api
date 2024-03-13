import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { users } from 'src/database/schema';
import { User, UserRequestDto, UserResponseDto } from './user';
import { hashSync } from 'bcrypt';
import { db } from 'src/database/db';

@Injectable()
export class UserService {
    async get(): Promise<UserResponseDto[]> {
        return (await db.select().from(users)).map(users => new UserResponseDto(users))
    }

    async getOne(id: number): Promise<UserResponseDto> {
        const user = await db.select().from(users)
        .where(eq(users.id, id))
        
        if(!user[0]) throw new NotFoundException(`The user with id ${id} does not exist.`)

        return user.map(user => new UserResponseDto(user))[0]
    }

    async getOneRaw(id: number): Promise<User> {
        const user = await db.select().from(users)
        .where(eq(users.id, id))
        
        if(!user[0]) throw new NotFoundException(`The user with id ${id} does not exist.`)

        return user[0]
    }
    
    async getOneByLogin(login: string): Promise<UserResponseDto> {
        const user = await db.select().from(users)
        .where(eq(users.login, login))
        
        if(!user[0]) throw new NotFoundException(`The user with login ${login} does not exist.`)

        return user.map(user => new UserResponseDto(user))[0]
    }

    async create(data: UserRequestDto): Promise<UserResponseDto> {
        const usersData = (await db.select().from(users)).map(users => users.login)
        if(usersData.includes(data.login)) {
            throw new BadRequestException(`The ${data.login} user login already exist.`)
        }

        const password = hashSync(data.password, 10)
        
        await db.insert(users).values({login: data.login, password: password})

        return await this.getOneByLogin(data.login)
    }

    async delete(id: number): Promise<Object> {
        const deleteUser = await db.delete(users).where(eq(users.id, id))
        if(deleteUser[0].affectedRows == 0) {
            throw new BadRequestException(`The user with id ${id} does not exist.`)
        }
        
        return {
            status: 200,
            message: `The user with id ${id} has been successfully deleted.`
        }
    }
}