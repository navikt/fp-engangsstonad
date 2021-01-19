import * as React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
//import { useEngangsstønadContext } from 'app/form/EngangsstønadContext';
import { ReactNode } from 'react';

interface Props {
    tittel: string;
    children: ReactNode;
}

const Oppsummeringspunkt = ({ tittel, children }: Props) => {
    //const { state } = useEngangsstønadContext();

    return (
        <div className="blokk-m">
            <Ekspanderbartpanel apen={false} tittel={tittel}>
                {children}
            </Ekspanderbartpanel>
        </div>
    );
};

export default Oppsummeringspunkt;
