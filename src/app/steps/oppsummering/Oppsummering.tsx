import { bemUtils, Block, intlUtils, Locale, Step } from '@navikt/fp-common';
import Veileder from '@navikt/fp-common/lib/components/veileder/Veileder';
import SøkersPersonalia from 'app/components/søkers-personalia/SøkersPersonalia';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React from 'react';
import { useIntl } from 'react-intl';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import Person from 'app/types/domain/Person';
import { fullNameFormat } from 'app/util/formats/formatUtils';
import OmBarnetOppsummering from './OmBarnetOppsummering';
import UtenlandsoppholdOppsummering from './UtenlandsoppholdOppsummering';
import stepConfig, { getPreviousStepHref } from 'app/step-config/stepConfig';
import { useEngangsstønadContext } from 'app/context/hooks/useEngangsstønadContext';
import { OppsummeringFormComponents, initialOppsummeringValues, OppsummeringFormField } from './oppsummeringFormConfig';
import { commonFieldErrorRenderer } from 'app/util/validation/validationUtils';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik/lib';
import oppsummeringQuestionsConfig from './oppsummeringQuestionsConfig';
import { Hovedknapp } from 'nav-frontend-knapper';
import { EngangsstønadSøknadDto } from 'app/types/domain/EngangsstønadSøknad';
import { mapStateForInnsending } from 'app/util/apiUtils';
import Api from 'app/api/api';
import { useHistory } from 'react-router-dom';
import actionCreator from 'app/context/action/actionCreator';

import './oppsummering.less';

interface Props {
    person: Person;
    locale: Locale;
}

const Oppsummering: React.FunctionComponent<Props> = ({ person, locale }) => {
    const intl = useIntl();
    const bem = bemUtils('oppsummering');
    const { state, dispatch } = useEngangsstønadContext();
    const history = useHistory();

    const sendSøknad = () => {
        const søknadForInnsending: EngangsstønadSøknadDto = mapStateForInnsending(state, locale);
        try {
            const kvitteringResponse = Api.sendSøknad(søknadForInnsending);

            kvitteringResponse.then((response) => {
                dispatch(actionCreator.setKvittering(response.data));
                history.push('/kvittering');
            });
        } catch (error) {}
    };

    return (
        <OppsummeringFormComponents.FormikWrapper
            initialValues={initialOppsummeringValues}
            onSubmit={() => sendSøknad()}
            renderForm={({ values: formValues }) => {
                const visibility = oppsummeringQuestionsConfig.getVisbility(formValues);
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="oppsummering"
                        pageTitle={intlUtils(intl, 'søknad.oppsummering')}
                        stepTitle={intlUtils(intl, 'søknad.oppsummering')}
                        backLinkHref={getPreviousStepHref('oppsummering')}
                        onCancel={() => null}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <OppsummeringFormComponents.Form
                            includeButtons={false}
                            fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                            noButtonsContentRenderer={
                                allQuestionsAnswered
                                    ? undefined
                                    : () => (
                                          <UnansweredQuestionsInfo>
                                              {intlUtils(intl, 'søknad.footer.spørsmålMåBesvares')}
                                          </UnansweredQuestionsInfo>
                                      )
                            }
                        >
                            <Veilederpanel kompakt={true} svg={<Veileder />}>
                                {intlUtils(intl, 'oppsummering.text.lesNoye')}
                            </Veilederpanel>
                            <div className={bem.block}>
                                <Block>
                                    <SøkersPersonalia
                                        kjønn={person.kjønn}
                                        navn={fullNameFormat(
                                            person.fornavn,
                                            person.mellomnavn,
                                            person.etternavn
                                        ).toLowerCase()}
                                        personnummer={person.fnr}
                                    />
                                </Block>

                                <Oppsummeringspunkt tittel={intlUtils(intl, 'søknad.omBarnet')}>
                                    <OmBarnetOppsummering barn={state.søknad.omBarnet} />
                                </Oppsummeringspunkt>
                                <Oppsummeringspunkt tittel={intlUtils(intl, 'søknad.utenlandsopphold')}>
                                    <UtenlandsoppholdOppsummering
                                        barn={state.søknad.omBarnet}
                                        informasjonOmUtenlandsopphold={state.søknad.utenlandsopphold}
                                    />
                                </Oppsummeringspunkt>
                            </div>
                            <Block margin="xl">
                                <OppsummeringFormComponents.ConfirmationCheckbox
                                    name={OppsummeringFormField.oppgittKorrekteOpplysninger}
                                    label="De opplysninger jeg har oppgitt er riktige og jeg har ikke holdt tilbake opplysninger som har betydning for min rett til engangsstønad."
                                />
                            </Block>
                            {allQuestionsAnswered && (
                                <Block margin="xl">
                                    <div className={bem.element('sendSøknadKnapp')}>
                                        <Hovedknapp>{intlUtils(intl, 'velkommen.button.startSøknad')}</Hovedknapp>
                                    </div>
                                </Block>
                            )}
                        </OppsummeringFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Oppsummering;