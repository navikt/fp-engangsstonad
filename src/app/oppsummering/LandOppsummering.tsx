import React from 'react';
import { BostedUtland } from 'app/utenlandsopphold/bostedUtlandListAndDialog/types';
import { Element } from 'nav-frontend-typografi';

import './landOppsummering.less';

interface Props {
    utenlandsoppholdListe: BostedUtland[];
}

const LandOppsummering: React.FunctionComponent<Props> = ({ utenlandsoppholdListe }) => (
    <ul className="landOppsummering">
        {utenlandsoppholdListe.map((opphold: BostedUtland) => (
            <div key={`${opphold.landkode}${opphold.fom}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Element>{opphold.landkode}</Element>
                <Element>
                    {opphold.fom} - {opphold.tom}
                </Element>
            </div>
        ))}
    </ul>
);

export default LandOppsummering;
