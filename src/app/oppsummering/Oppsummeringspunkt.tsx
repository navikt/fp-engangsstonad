import React, { ReactNode } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Block } from '@navikt/fp-common';

interface Props {
    tittel: string;
    children: ReactNode;
}

const Oppsummeringspunkt = ({ tittel, children }: Props) => (
    <Block margin="xl">
        <Ekspanderbartpanel apen={false} tittel={tittel}>
            {children}
        </Ekspanderbartpanel>
    </Block>
);

export default Oppsummeringspunkt;
