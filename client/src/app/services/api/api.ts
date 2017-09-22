import wretch from 'wretch/dist'

const baseUrl = process.env.API_URL
const token = localStorage.getItem('token')

const handleBadRequest = err => {
    console.log('bad request', err)

    return Promise.reject(err)
}

const api = wretch()
    .mixdefaults({ headers: { Authorization: token && `Bearer ${token}` } })
    .baseUrl(baseUrl)

export const post = (endpoint, body) => {
    return api(`${baseUrl}/${endpoint && endpoint}`)
        .json(body)
        .post()
        .badRequest(handleBadRequest)
        .json()
}

export const put = (endpoint, body) => {
    return api(`${baseUrl}/${endpoint && endpoint}`)
        .json(body)
        .put()
        .badRequest(handleBadRequest)
        .json()
}

export const get = (endpoint, query) => {
    return api(`${baseUrl}/${endpoint && endpoint}`)
        .query(query)
        .get()
        .badRequest(handleBadRequest)
        .json()
}

export const destroy = endpoint => {
    return api(`${baseUrl}/${endpoint && endpoint}`)
        .delete()
        .badRequest(handleBadRequest)
        .json()
}

export default {
    post,
    put,
    get,
    destroy
}
