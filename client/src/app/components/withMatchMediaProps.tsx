import { h, Component } from 'preact'

const mq = window.matchMedia('(min-width: 769px)')

function withMatchMediaProps(WrappedComponent) {
    return class extends Component<any, { isDesktop: boolean }> {
        state = { isDesktop: mq.matches }

        constructor(props) {
            super(props)
        }
        onWidthChange = () => {
            this.setState(() => ({ isDesktop: mq.matches }))
        }

        componentDidMount() {
            mq.addListener(this.onWidthChange)
        }

        componentDidUnmout() {
            mq.removeListener(this.onWidthChange)
        }

        render(props) {
            return <WrappedComponent isDesktop={this.state.isDesktop} {...props} />
        }
    }
}

export default withMatchMediaProps
