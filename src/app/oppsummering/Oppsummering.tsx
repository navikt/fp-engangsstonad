import { bemUtils } from '@navikt/fp-common';
import SøkersPersonalia from 'app/components/søkers-personalia/SøkersPersonalia';
//import { useEngangsstønadContext } from 'app/form/EngangsstønadContext';
import OmBarnet from 'app/om-barnet/OmBarnet';
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
/*
interface Props {
    annenForelder: AnnenForelder;
    barn: FodtBarn & UfodtBarn;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    person?: Person;
}
*/
const Oppsummering: React.FunctionComponent = ({}) => {
    const intl = useIntl();
    const bem = bemUtils('oppsummering');
    //const [state] = useEngangsstønadContext();
    return (
        <>
            <div className={bem.block}>
                <Veilederpanel kompakt={true} svg={<Veileder />}>
                    {getMessage(intl, 'oppsummering.text.lesNoye')}
                </Veilederpanel>
            </div>
            <div className="blokk-m">
                <SøkersPersonalia
                    kjønn={'K'}
                    navn={'Per'}
                    personnummer={'12098543646'}
                    //navn={fullNameFormat(person.fornavn, person.mellomnavn, person.etternavn).toLowerCase()}
                    //personnummer={person.fnr}
                />
            </div>
            <Oppsummeringspunkt tittel="OmBarnett">
                <OmBarnet />
            </Oppsummeringspunkt>
        </>
    );
};

export default Oppsummering;
