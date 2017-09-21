import { Educator } from '../../models/educator';
import api from '../api/api';

class AuthService {
    isLoggedIn() {
        return !!localStorage.getItem('token')
    }

    login({ email, password }) {
        return api.post('auth/token', { email, password }).then(({ token }) => localStorage.setItem('token', token))
    }

    register(user: Educator) {
        return api.post('auth/register/educator', user)
    }

    logout() {
        localStorage.removeItem('token')
    }
}

export default new AuthService()
