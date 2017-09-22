import { UserMetadata } from '../entities/user-info'
import { getEntityManager } from 'typeorm'

import { encodeToken } from '../util/jwt'
import { hashPassword, verifyPassword } from '../util/crypto'
import { User } from '../entities'
import logger from '../util/logger'

const getRepo = <T>(table: string) => getEntityManager().getRepository<T>(table)

export const getToken = async ({ email, password }) => {
    logger.info('authenticating user', { email })
    try {
        let user = await getRepo<User>('User').findOne({ email })
        let match = await verifyPassword(password, user.password)

        logger.info('user password match', { match })

        return match ? await encodeToken({ email: user.email }) : undefined
    } catch (error) {
        logger.error('something bad happened', error)
        return undefined
    }
}

export const register = async (user: { password; email }) => {
    logger.info('creating new user', { user })

    try {
        const repo = getRepo<User>('User')

        const { password, email, ...additionalInfo } = user

        const newUser = repo.create({ password: await hashPassword(user.password), email: user.email })
        const metadata = getRepo<UserMetadata>('UserInfo').create({ info: { ...additionalInfo } })

        newUser.metadata = metadata

        return await repo.persist(newUser)
    } catch (error) {
        logger.error(error)

        return undefined
    }
}

export const userExists = async email => {
    logger.info('checking if user exists', { email })

    try {
        const repo = getRepo<User>('User')

        const existing = await repo.findOne({ email })
        return !!existing
    } catch (error) {
        logger.error(error)

        return false
    }
}
