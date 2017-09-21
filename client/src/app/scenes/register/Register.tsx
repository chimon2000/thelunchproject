import { h, Component } from 'preact'
import { setValue, getValue } from 'neoform-plain-object-helpers'
import { Section, Title } from 'bloomer'
import * as cxs from 'cxs'

import RegisterForm from './RegisterForm'
import Logo from '../../components/logo/Logo'
import Box from '../../components/box/Box'
import { Link } from 'react-router-dom'
import AuthService from '../../services/auth/auth'

const logo = cxs({
    marginBottom: '10px'
})

export default class Register extends Component<any, any> {
    history: any

    constructor({ history }) {
        super()

        this.state = {}
        this.history = history

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(name, value) {
        console.log(name, value)
        this.setState(prevState => setValue(prevState, name, value))
    }

    onInvalid() {
        console.log('onInvalid')
    }

    onSubmit() {
        AuthService.register(this.state).then(() => this.history.push('/'))
    }
    render() {
        return (
            <Section>
                <Logo className={logo} />
                <Box>
                    <Title>Register</Title>
                    <RegisterForm
                        data={this.state}
                        getValue={getValue}
                        onChange={this.onChange}
                        onInvalid={this.onInvalid}
                        onSubmit={this.onSubmit}
                    />
                    <p>
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </Box>
            </Section>
        )
    }
}
