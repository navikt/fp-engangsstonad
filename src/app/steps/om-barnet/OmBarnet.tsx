import { bemUtils, Block, commonFieldErrorRenderer, intlUtils, Step, useDocumentTitle } from '@navikt/fp-common';
import React from 'react';
import { useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormField, OmBarnetFormData } from './omBarnetFormConfig';
import omBarnetQuestionsConfig from './omBarnetQuestionsConfig';
import getMessage from 'common/util/i18nUtils';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik/lib';
import actionCreator from 'app/context/action/actionCreator';
import stepConfig, { getPreviousStepHref } from 'app/step-config/stepConfig';
import { cleanupOmBarnet } from './omBarnetUtils';
import { useEngangsstønadContext } from 'app/context/hooks/useEngangsstønadContext';
import Født from './situasjon/Født';
import Termin from './situasjon/Termin';
import OvertaOmsorg from './situasjon/OvertaOmsorg';
import Stebarnsadopsjon from './situasjon/Stebarnsadopsjon';

import './omBarnet.less';

const OmBarnet: React.FunctionComponent = () => {
    const intl = useIntl();
    const bem = bemUtils('omBarnet');
    const history = useHistory();
    useDocumentTitle(intlUtils(intl, 'velkommen.standard.dokumenttittel'));
    const { state, dispatch } = useEngangsstønadContext();
    const omBarnetValues = state.søknad.omBarnet;
    const søkersituasjonValues = state.søknad.søkersituasjon;

    const onValidSubmit = (values: Partial<OmBarnetFormData>) => {
        dispatch(
            actionCreator.setOmBarnet({
                erBarnetFødt: values.erBarnetFødt!,
                stebarnsadopsjon: values.stebarnsadopsjon!,
                antallBarn: values.antallBarn,
                adopsjonsdato: values.adopsjonsdato,
                fødselsdato: values.fødselsdato,
                termindato: values.termindato,
                terminbekreftelse: values.terminbekreftelse || [],
                adopsjonBekreftelse: values.adopsjonBekreftelse || [],
                terminbekreftelsedato: values.terminbekreftelsedato,
                adoptertFraUtland: values.adoptertFraUtland!,
                nårKommerBarnetDato: values.nårKommerBarnetDato,
                adopsjonsbevilling: values.adopsjonsbevilling || [],
            })
        );
        history.push('/soknad/utenlandsopphold');
    };

    return (
        <OmBarnetFormComponents.FormikWrapper
            initialValues={omBarnetValues}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = omBarnetQuestionsConfig.getVisbility({
                    ...formValues,
                    situasjon: søkersituasjonValues.situasjon!,
                });
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();
                return (
                    <Step
                        bannerTitle={getMessage(intl, 'søknad.pageheading')}
                        activeStepId="omBarnet"
                        pageTitle={getMessage(intl, 'søknad.omBarnet')}
                        stepTitle={getMessage(intl, 'søknad.omBarnet')}
                        backLinkHref={getPreviousStepHref('søkersituasjon')}
                        onCancel={() => null}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <OmBarnetFormComponents.Form
                            includeButtons={false}
                            fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                            cleanup={() => cleanupOmBarnet(formValues)}
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
                            <div className={bem.block}>
                                {søkersituasjonValues.situasjon === 'adopsjon' ? (
                                    <Block>
                                        <OmBarnetFormComponents.YesOrNoQuestion
                                            name={OmBarnetFormField.stebarnsadopsjon}
                                            legend={getMessage(intl, 'omBarnet.adopsjon.spørsmål.stebarnsadopsjon')}
                                            labels={{
                                                no: getMessage(intl, 'omBarnet.adopsjon.text.stebarnsadopsjon.nei'),
                                                yes: getMessage(intl, 'omBarnet.adopsjon.text.stebarnsadopsjon.ja'),
                                            }}
                                        />
                                    </Block>
                                ) : (
                                    <Block>
                                        <OmBarnetFormComponents.YesOrNoQuestion
                                            name={OmBarnetFormField.erBarnetFødt}
                                            legend={getMessage(intl, 'omBarnet.spørsmål.nårErBarnetFødt')}
                                            labels={{
                                                no: getMessage(intl, 'omBarnet.radiobutton.fremtid'),
                                                yes: getMessage(intl, 'omBarnet.radiobutton.fortid'),
                                            }}
                                        />
                                    </Block>
                                )}

                                <Født visibility={visibility} formValues={formValues} />
                                <OvertaOmsorg visibility={visibility} formValues={formValues} />
                                <Termin visibility={visibility} formValues={formValues} />
                                <Stebarnsadopsjon visibility={visibility} formValues={formValues} />

                                {allQuestionsAnswered && (
                                    <Block margin="xl" textAlignCenter={true}>
                                        <Hovedknapp>{getMessage(intl, 'søknad.gåVidere')}</Hovedknapp>
                                    </Block>
                                )}
                            </div>
                        </OmBarnetFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default OmBarnet;
