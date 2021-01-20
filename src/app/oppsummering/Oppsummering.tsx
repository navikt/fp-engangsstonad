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
import { useEngangsstønadContext } from 'app/form/EngangsstønadContext';
import OmBarnetOppsummering from './OmBarnetOppsummering';
import UtenlandsoppholdOppsummering from './UtenlandsoppholdOppsummering';
import stepConfig, { getPreviousStepHref } from 'app/step-config/stepConfig';

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
            bannerTitle="Engangsstønad"
            activeStepId="utenlandsopphold"
            pageTitle="Utenlandsopphold"
            stepTitle="Utenlandsopphold"
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

                <Oppsummeringspunkt tittel="Om Barnet">
                    <OmBarnetOppsummering barn={state.soknad.omBarnet} />
                </Oppsummeringspunkt>
                <Oppsummeringspunkt tittel="Utenlandsopphold">
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
