import { MinLength, IsEmail, IsDefined, IsNotEmpty } from 'class-validator'

export class User {
    id: string
    @IsEmail() email: string

    @IsDefined()
    @IsNotEmpty()
    firstName: string

    @IsDefined()
    @IsNotEmpty()
    lastName: string

    @MinLength(6)
    password: string
}
