import { bemUtils, Block } from '@navikt/fp-common';
import SøkersPersonalia from 'app/components/søkers-personalia/SøkersPersonalia';
//import { useEngangsstønadContext } from 'app/form/EngangsstønadContext';
//import { useEngangsstønadContext } from 'app/form/EngangsstønadContext';
//import { OmBarnetFormComponents } from 'app/om-barnet/omBarnetFormConfig';
//import AnnenForelder from 'app/types/domain/AnnenForelder';
//import { FodtBarn, UfodtBarn } from 'app/types/domain/Barn';
//import InformasjonOmUtenlandsopphold from 'app/types/domain/InformasjonOmUtenlandsopphold';
//import Person from 'app/types/domain/Person';
import getMessage from 'common/util/i18nUtils';
import Veileder from 'nav-frontend-veileder';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React from 'react';
import { useIntl } from 'react-intl';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import './oppsummering.less';
import Person from 'app/types/domain/Person';
import { fullNameFormat } from 'app/util/formats/formatUtils';
import { useEngangsstønadContext } from 'app/form/EngangsstønadContext';
import OmBarnetOppsummering from './OmBarnetOppsummering';
import UtenlandsoppholdOppsummering from './UtenlandsoppholdOppsummering';

interface Props {
    person: Person;
}

const Oppsummering: React.FunctionComponent<Props> = ({ person }) => {
    const intl = useIntl();
    const bem = bemUtils('oppsummering');
    const { state } = useEngangsstønadContext();
    return (
        <div className={bem.block}>
            <Block>
                <Veilederpanel kompakt={true} svg={<Veileder />}>
                    {getMessage(intl, 'oppsummering.text.lesNoye')}
                </Veilederpanel>
            </Block>
            <Block>
                <SøkersPersonalia
                    kjønn={person.kjønn}
                    navn={fullNameFormat(person.fornavn, person.mellomnavn, person.etternavn).toLowerCase()}
                    personnummer={person.fnr}
                />
            </Block>

            <Oppsummeringspunkt tittel="OmBarnett">
                <OmBarnetOppsummering barn={state.soknad.omBarnet} />
            </Oppsummeringspunkt>
            <Oppsummeringspunkt tittel="utenlandsopphold">
                <UtenlandsoppholdOppsummering
                    barn={state.soknad.omBarnet}
                    informasjonOmUtenlandsopphold={state.soknad.utenlandsopphold}
                />
            </Oppsummeringspunkt>
        </div>
    );
};

export default Oppsummering;
