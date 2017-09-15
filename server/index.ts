import 'reflect-metadata'
import { createConnection, getEntityManager } from 'typeorm'
import { User, Educator } from './app/entities'
import { controllers } from './app/index'
import { createExpressServer, Action } from 'routing-controllers'
import { decodeToken } from './app/util/jwt'

const getToken = headers => {
    try {
        const header = headers['authorization']
        const token = header.split(' ')[1]

        return token
    } catch (error) {
        return undefined
    }
}

const authorizationChecker = async (action: Action, roles: string[]) => {
    let user = undefined

    try {
        const token = getToken(action.request.headers)
        const { email } = (await decodeToken(token)) as any
        user = await getEntityManager().findOne<User>(User, { email })
    } catch (error) {
        return false
    }

    if (user && !roles.length) return true
    if (user && roles.find(role => user.roles.indexOf(role) !== -1)) return true

    return false
}

const currentUserChecker = async (action: Action) => {
    try {
        const token = getToken(action.request.headers)
        const { email } = (await decodeToken(token)) as any
        const user = await getEntityManager().findOne<User>(User, { email })
        console.log(user.omit('password'))
        return user.omit('password')
    } catch (error) {
        return undefined
    }
}

const database = process.env.NODE_ENV !== 'production' ? 'postgres' : 'thelunchproject'

createConnection({
    type: 'postgres',
    port: 5432,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [User, Educator]
})
    .then(() => createApp())
    .catch(err => console.error(err))

const createApp = () => {
    const app = createExpressServer({
        cors: true,
        controllers,
        authorizationChecker,
        currentUserChecker,
        development: process.env.NODE_ENV !== 'production'
    })

    app.listen(process.env.PORT || 3030)
}
