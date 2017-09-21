import api from '../api/api'
import { Educator } from '../../models/educator'

class AuthService {
    isLoggedIn() {
        return !!localStorage.getItem('token')
    }

    login({ email, password }) {
        return api
            .post('auth/token', { email, password })
            .then(response => localStorage.setItem('token', response.data.token))
    }

    register(user: Educator) {
        return api.post('auth/register/educator', user)
    }

    logout() {
        localStorage.removeItem('token')
    }
}

export default new AuthService()
