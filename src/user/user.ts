import { IsNotEmpty, IsString } from "class-validator"

export class User {
    id: number
    login: string
    password: string
}

export class UserRequestDto {
    @IsNotEmpty()
    @IsString()
    login: string

    @IsNotEmpty()
    @IsString()
    password: string
}

export class UserResponseDto {
    id: number
    login: string

    constructor(user: { id: number; login: string; password: string; }) {
        this.id = user.id
        this.login = user.login
    }
}