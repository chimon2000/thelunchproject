import { h } from 'preact'
import { Button as ButtonType } from 'bloomer/lib/elements/Button'
import { Button as BButton } from 'bloomer'
import withMatchMediaProps from '../withMatchMediaProps'

type Props = { isDesktop: boolean } & ButtonType<HTMLButtonElement | HTMLAnchorElement>

const Button = ({ isDesktop, ...props }: Props) =>
    isDesktop ? <BButton {...props} /> : <BButton isFullWidth {...props} />

export default withMatchMediaProps(Button)
