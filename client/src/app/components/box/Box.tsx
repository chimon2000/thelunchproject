import { h, FunctionalComponent } from 'preact'
import { Box as BBox, Container } from 'bloomer'
import { Box as BoxType } from 'bloomer/lib/elements/Box'
import { Container as ContainerType } from 'bloomer/lib/layout/Container'

import withMatchMediaProps from '../withMatchMediaProps'

import * as cxs from 'cxs'
type Props = { isDesktop: boolean } & (BoxType<HTMLElement> | ContainerType<HTMLElement>)

const box = cxs({
    maxWidth: '400px',
    margin: 'auto'
})

const Box: FunctionalComponent<Props> = ({ isDesktop, children, ...props }) =>
    isDesktop ? (
        <BBox className={box} {...props}>
            {children && children}
        </BBox>
    ) : (
        <Container {...props}>{children && children}</Container>
    )

export default withMatchMediaProps(Box)
