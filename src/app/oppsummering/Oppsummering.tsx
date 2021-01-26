import { bemUtils, Block, Step } from '@navikt/fp-common';
import Veileder from '@navikt/fp-common/lib/components/veileder/Veileder';
import SøkersPersonalia from 'app/components/søkers-personalia/SøkersPersonalia';
import getMessage from 'common/util/i18nUtils';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React from 'react';
import { useIntl } from 'react-intl';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import Person from 'app/types/domain/Person';
import { fullNameFormat } from 'app/util/formats/formatUtils';
import OmBarnetOppsummering from './OmBarnetOppsummering';
import UtenlandsoppholdOppsummering from './UtenlandsoppholdOppsummering';
import stepConfig, { getPreviousStepHref } from 'app/step-config/stepConfig';
import { useEngangsstønadContext } from 'app/form/hooks/useEngangsstønadContext';

import './oppsummering.less';

interface Props {
    person: Person;
}

const Oppsummering: React.FunctionComponent<Props> = ({ person }) => {
    const intl = useIntl();
    const bem = bemUtils('oppsummering');
    const { state } = useEngangsstønadContext();
    return (
        <Step
            bannerTitle={getMessage(intl, 'søknad.pageheading')}
            activeStepId="oppsummering"
            pageTitle={getMessage(intl, 'søknad.oppsummering')}
            stepTitle={getMessage(intl, 'søknad.oppsummering')}
            backLinkHref={getPreviousStepHref('oppsummering')}
            onCancel={() => null}
            steps={stepConfig}
            kompakt={true}
        >
            <Veilederpanel kompakt={true} svg={<Veileder />}>
                {getMessage(intl, 'oppsummering.text.lesNoye')}
            </Veilederpanel>
            <div className={bem.block}>
                <Block>
                    <SøkersPersonalia
                        kjønn={person.kjønn}
                        navn={fullNameFormat(person.fornavn, person.mellomnavn, person.etternavn).toLowerCase()}
                        personnummer={person.fnr}
                    />
                </Block>

                <Oppsummeringspunkt tittel={getMessage(intl, 'søknad.omBarnet')}>
                    <OmBarnetOppsummering barn={state.soknad.omBarnet} />
                </Oppsummeringspunkt>
                <Oppsummeringspunkt tittel={getMessage(intl, 'søknad.utenlandsopphold')}>
                    <UtenlandsoppholdOppsummering
                        barn={state.soknad.omBarnet}
                        informasjonOmUtenlandsopphold={state.soknad.utenlandsopphold}
                    />
                </Oppsummeringspunkt>
            </div>
        </Step>
    );
};

export default Oppsummering;
