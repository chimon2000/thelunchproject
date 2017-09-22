import { UserConflictError } from '../util/errors'
import {
    JsonController,
    Body,
    Post,
    BadRequestError,
    Authorized,
    Get,
    CurrentUser,
    UnauthorizedError
} from 'routing-controllers'

import { getToken, register, userExists } from './auth.service'
import { User, Educator } from '../models'
import { encodeToken } from '../util/jwt'

@JsonController('/auth')
export default class {
    @Post('/token')
    async login(@Body() { email, password }: User) {
        const token = await getToken({ email, password })
        if (!token) throw new UnauthorizedError()

        return { token }
    }

    @Post('/register/user')
    async register(@Body() user: User) {
        const { password, email } = user

        const exists = await userExists(email)
        if (exists) throw new UserConflictError()

        const created = await register({ password, email })
        if (!created) throw new BadRequestError('there was an issue creating this user')

        return { token: await encodeToken({ email }) }
    }

    @Post('/register/educator')
    async registerEducator(@Body() user: Educator) {
        const { email } = user

        const exists = await userExists(email)
        if (exists) throw new UserConflictError()

        const created = await register(user)
        if (!created) throw new BadRequestError('there was an issue creating this user')

        return { token: await encodeToken({ email }) }
    }

    @Post('/register/admin')
    async registerAdmin(@Body() user: User) {
        const { email } = user

        const exists = await userExists(email)
        if (exists) throw new UserConflictError()

        const created = await register(user)
        if (!created) throw new BadRequestError()

        return { token: await encodeToken({ email }) }
    }

    @Authorized()
    @Get('/verify')
    async verify(
        @CurrentUser({ required: true })
        user: User
    ) {
        return user
    }
}
