import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginUser {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty() password: string
}
