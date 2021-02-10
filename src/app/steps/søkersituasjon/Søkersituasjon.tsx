import { bemUtils, Block, commonFieldErrorRenderer, intlUtils, Step } from '@navikt/fp-common';
import stepConfig from 'app/step-config/stepConfig';
import getMessage from 'common/util/i18nUtils';
import React from 'react';
import { useIntl } from 'react-intl';
import actionCreator from 'app/context/action/actionCreator';
import {
    SøkersituasjonFormComponents,
    SøkersituasjonFormData,
    SøkersituasjonFormField,
} from './søkersituasjonFormConfig';
import { useEngangsstønadContext } from 'app/context/hooks/useEngangsstønadContext';

import { cleanupSøkersituasjon } from './søkersituasjonUtils';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik/lib';
import søkersituasjonQuestionsConfig from './søkersituasjonQuestionsConfig';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router';

const Søkersituasjon: React.FunctionComponent = () => {
    const intl = useIntl();
    const bem = bemUtils('søkersituasjon');
    const history = useHistory();
    const { state, dispatch } = useEngangsstønadContext();
    const søkersituasjonValues = state.søknad.søkersituasjon;

    const onValidSubmit = (values: Partial<SøkersituasjonFormData>) => {
        dispatch(
            actionCreator.setSøkersituasjon({
                situasjon: values.situasjon,
            })
        );
        if (values.situasjon === 'adopsjon') {
            history.push('/soknad/adopsjon');
        }
        if (values.situasjon === 'fødsel') {
            history.push('/soknad/om-barnet');
        }
    };

    return (
        <SøkersituasjonFormComponents.FormikWrapper
            initialValues={søkersituasjonValues}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = søkersituasjonQuestionsConfig.getVisbility(formValues);
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();
                return (
                    <Step
                        bannerTitle={getMessage(intl, 'søknad.pageheading')}
                        activeStepId="søkersituasjon"
                        pageTitle={getMessage(intl, 'søknad.søkersituasjon')}
                        stepTitle={getMessage(intl, 'søknad.søkersituasjon')}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <SøkersituasjonFormComponents.Form
                            includeButtons={false}
                            fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                            cleanup={() => cleanupSøkersituasjon(formValues)}
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
                                <Block margin="xl">
                                    <SøkersituasjonFormComponents.RadioPanelGroup
                                        name={SøkersituasjonFormField.situasjon}
                                        radios={[
                                            {
                                                label: intlUtils(intl, 'søkersituasjon.radiobutton.adopsjon'),
                                                value: 'adopsjon',
                                            },
                                            {
                                                label: intlUtils(intl, 'søkersituasjon.radiobutton.fødsel'),
                                                value: 'fødsel',
                                            },
                                        ]}
                                        useTwoColumns={true}
                                        legend={getMessage(intl, 'søkersituasjon.text.situasjon')}
                                    />
                                </Block>
                                {allQuestionsAnswered && (
                                    <Block margin="xl" textAlignCenter={true}>
                                        <Hovedknapp>{getMessage(intl, 'søknad.gåVidere')}</Hovedknapp>
                                    </Block>
                                )}
                            </div>
                        </SøkersituasjonFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};
export default Søkersituasjon;
