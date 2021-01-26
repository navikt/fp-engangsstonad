import React from 'react';
import { bemUtils, Block, intlUtils, Step } from '@navikt/fp-common';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik/lib';
import UtvidetInformasjon from 'components/utvidet-informasjon/UtvidetInformasjon';
import {
    UtenlandsoppholdFieldNames,
    UtenlandsoppholdFormComponents,
    UtenlandsoppholdFormData,
} from './utenlandsoppholdFormTypes';
import { Utenlandsopphold } from 'app/types/domain/InformasjonOmUtenlandsopphold';
import { useIntl } from 'react-intl';
import actionCreator from 'app/form/action/actionCreator';
import { useHistory } from 'react-router-dom';
import stepConfig, { getPreviousStepHref } from 'app/step-config/stepConfig';
import { utenlandsoppholdFormQuestions } from './utenlandsoppholdFormQuestions';
import {
    commonFieldErrorRenderer,
    date1YearAgo,
    date1YearFromNow,
    dateToday,
    validateUtenlandsoppholdNeste12Mnd,
    validateUtenlandsoppholdSiste12Mnd,
    validateYesOrNoIsAnswered,
} from 'app/util/validation/validationUtils';
import BostedUtlandListAndDialog from './bostedUtlandListAndDialog/BostedUtlandListAndDialog';
import { utenlandsoppholdFormCleanup } from './utenlandsoppholdFormUtils';
import { useEngangsstønadContext } from 'app/form/hooks/useEngangsstønadContext';

import './utenlandsopphold.less';
import getMessage from 'common/util/i18nUtils';

const Utenlandsopphold: React.FunctionComponent = () => {
    const intl = useIntl();
    const bem = bemUtils('utenlandsopphold');
    const history = useHistory();

    const { state, dispatch } = useEngangsstønadContext();
    const initialValues = state.soknad.utenlandsopphold;

    const onValidSubmit = (values: Partial<UtenlandsoppholdFormData>) => {
        dispatch(
            actionCreator.setUtenlandsopphold({
                skalBoUtenforNorgeNeste12Mnd: values.skalBoUtenforNorgeNeste12Mnd!,
                harBoddUtenforNorgeSiste12Mnd: values.harBoddUtenforNorgeSiste12Mnd!,
                utenlandsoppholdNeste12Mnd: values.utenlandsoppholdNeste12Mnd || [],
                utenlandsoppholdSiste12Mnd: values.utenlandsoppholdSiste12Mnd || [],
            })
        );
        history.push('/soknad/oppsummering');
    };

    return (
        <UtenlandsoppholdFormComponents.FormikWrapper
            initialValues={initialValues}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = utenlandsoppholdFormQuestions.getVisbility(formValues);
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();
                return (
                    <Step
                        bannerTitle={getMessage(intl, 'søknad.pageheading')}
                        activeStepId="utenlandsopphold"
                        pageTitle={getMessage(intl, 'søknad.utenlandsopphold')}
                        stepTitle={getMessage(intl, 'søknad.utenlandsopphold')}
                        backLinkHref={getPreviousStepHref('utenlandsopphold')}
                        onCancel={() => null}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <UtenlandsoppholdFormComponents.Form
                            includeButtons={allQuestionsAnswered}
                            fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                            includeValidationSummary={true}
                            submitButtonLabel={getMessage(intl, 'søknad.gåVidere')}
                            runDelayedFormValidation={true}
                            cleanup={(values) => utenlandsoppholdFormCleanup(values)}
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
                                {visibility.isVisible(UtenlandsoppholdFieldNames.skalBoUtenforNorgeNeste12Mnd) && (
                                    <Block>
                                        <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                            legend={intlUtils(intl, 'utenlandsopphold.siste12Måneder.spørsmål')}
                                            name={UtenlandsoppholdFieldNames.skalBoUtenforNorgeNeste12Mnd}
                                            description={
                                                <UtvidetInformasjon
                                                    apneLabel={intlUtils(
                                                        intl,
                                                        'utenlandsopphold.siste12MånederInfotekst.apneLabel'
                                                    )}
                                                >
                                                    {intlUtils(intl, 'utenlandsopphold.siste12MånederInfotekst')}
                                                </UtvidetInformasjon>
                                            }
                                            labels={{
                                                no: intlUtils(
                                                    intl,
                                                    'utenlandsopphold.siste12MånederInfotekst.radiobutton.boddINorge'
                                                ),
                                                yes: intlUtils(
                                                    intl,
                                                    'utenlandsopphold.siste12MånederInfotekst.radiobutton.boddIUtlandet'
                                                ),
                                            }}
                                            validate={validateYesOrNoIsAnswered}
                                        />
                                    </Block>
                                )}
                                {visibility.isVisible(UtenlandsoppholdFieldNames.utenlandsoppholdNeste12Mnd) && (
                                    <Block margin="l">
                                        <BostedUtlandListAndDialog<UtenlandsoppholdFieldNames>
                                            name={UtenlandsoppholdFieldNames.utenlandsoppholdNeste12Mnd}
                                            minDate={dateToday}
                                            maxDate={date1YearFromNow}
                                            labels={{
                                                addLabel: intlUtils(intl, 'utenlandsopphold.knapp.leggTilLand'),
                                                modalTitle: 'Utenlandsopphold neste 12 måneder',
                                            }}
                                            erFremtidigOpphold={true}
                                            validate={validateUtenlandsoppholdNeste12Mnd}
                                        />
                                    </Block>
                                )}
                                {visibility.isVisible(UtenlandsoppholdFieldNames.harBoddUtenforNorgeSiste12Mnd) && (
                                    <Block margin="xl">
                                        <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                            legend={intlUtils(intl, 'utenlandsopphold.neste12Måneder.spørsmål')}
                                            name={UtenlandsoppholdFieldNames.harBoddUtenforNorgeSiste12Mnd}
                                            description={
                                                <UtvidetInformasjon
                                                    apneLabel={intlUtils(
                                                        intl,
                                                        'utenlandsopphold.neste12MånederInfotekst.apneLabel'
                                                    )}
                                                >
                                                    {intlUtils(intl, 'utenlandsopphold.neste12MånederInfotekst')}
                                                </UtvidetInformasjon>
                                            }
                                            labels={{
                                                no: intlUtils(
                                                    intl,
                                                    'utenlandsopphold.neste12MånederInfotekst.radiobutton.boddINorge'
                                                ),
                                                yes: intlUtils(
                                                    intl,
                                                    'utenlandsopphold.neste12MånederInfotekst.radiobutton.boddIUtlandet'
                                                ),
                                            }}
                                            validate={validateYesOrNoIsAnswered}
                                        />
                                    </Block>
                                )}
                                {visibility.isVisible(UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd) && (
                                    <Block margin="l">
                                        <BostedUtlandListAndDialog<UtenlandsoppholdFieldNames>
                                            minDate={date1YearAgo}
                                            maxDate={dateToday}
                                            name={UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd}
                                            labels={{
                                                addLabel: intlUtils(intl, 'utenlandsopphold.knapp.leggTilLand'),
                                                modalTitle: 'Utenlandsopphold neste 12 måneder',
                                            }}
                                            erFremtidigOpphold={false}
                                            validate={validateUtenlandsoppholdSiste12Mnd}
                                        />
                                    </Block>
                                )}
                            </div>
                        </UtenlandsoppholdFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Utenlandsopphold;
