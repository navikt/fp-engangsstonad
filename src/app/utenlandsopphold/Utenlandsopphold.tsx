import { bemUtils, Block, intlUtils, Step } from '@navikt/fp-common';
import { UnansweredQuestionsInfo, YesOrNo } from '@navikt/sif-common-formik/lib';
import UtvidetInformasjon from 'components/utvidet-informasjon/UtvidetInformasjon';
import React from 'react';
import {
    commonFieldErrorRenderer,
    validateUtenlandsoppholdNeste12Mnd,
    validateUtenlandsoppholdSiste12Mnd,
    validateYesOrNoIsAnswered,
} from 'util/validation/validationUtils';
import BostedUtlandListAndDialog from './bostedUtlandListAndDialog/BostedUtlandListAndDialog';
import utenlandsoppholdFormCleanup from './utenlandsoppholdFormCleanup';
import { utenlandsoppholdFormQuestions } from './utenlandsoppholdFormQuestions';
import {
    UtenlandsoppholdFieldNames,
    UtenlandsoppholdFormComponents,
    UtenlandsoppholdFormData,
} from './utenlandsoppholdFormTypes';
import { Utenlandsopphold } from 'app/types/domain/InformasjonOmUtenlandsopphold';
// import InformasjonOmUtenlandsopphold, { Utenlandsopphold } from 'app/types/domain/InformasjonOmUtenlandsopphold';
// import { BostedUtland } from './bostedUtlandListAndDialog/types';
import { useIntl } from 'react-intl';

import './utenlandsopphold.less';
import { date1YearAgo, date1YearFromNow, dateToday } from '../util/validation/validationUtils';
import actionCreator from 'app/form/action/actionCreator';
import { useEngangsstønadContext } from 'app/form/EngangsstønadContext';
import { useHistory } from 'react-router-dom';
import stepConfig, { getPreviousStepHref } from 'app/step-config/stepConfig';

const defaultInitialValues: UtenlandsoppholdFormData = {
    harBoddUtenforNorgeSiste12Mnd: YesOrNo.UNANSWERED,
    skalBoUtenforNorgeNeste12Mnd: YesOrNo.UNANSWERED,
    utenlandsoppholdNeste12Mnd: [],
    utenlandsoppholdSiste12Mnd: [],
};

// const utenlandsoppholdErGyldig = (informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold): boolean => {
//     const { iNorgeSiste12Mnd, iNorgeNeste12Mnd, tidligereOpphold, senereOpphold } = informasjonOmUtenlandsopphold;
//     return (
//         (iNorgeSiste12Mnd || (iNorgeSiste12Mnd === false && tidligereOpphold.length > 0)) &&
//         (iNorgeNeste12Mnd || (iNorgeNeste12Mnd === false && senereOpphold.length > 0))
//     );
// };

// const mapTilBostedUtland = (opphold: Utenlandsopphold): BostedUtland => ({
//     fom: dayjs(opphold.tidsperiode.fom).toDate(),
//     tom: dayjs(opphold.tidsperiode.tom).toDate(),
//     landkode: opphold.land,
// });

// const getInitialValues = (
//     informasjonOmUtenlandsoppholdFraSøknad: InformasjonOmUtenlandsopphold
// ): UtenlandsoppholdFormData => {
//     if (utenlandsoppholdErGyldig(informasjonOmUtenlandsoppholdFraSøknad)) {
//         const {
//             iNorgeSiste12Mnd,
//             iNorgeNeste12Mnd,
//             senereOpphold,
//             tidligereOpphold,
//         } = informasjonOmUtenlandsoppholdFraSøknad;

//         const initialValues: UtenlandsoppholdFormData = {
//             harBoddUtenforNorgeSiste12Mnd: iNorgeSiste12Mnd ? YesOrNo.NO : YesOrNo.YES,
//             skalBoUtenforNorgeNeste12Mnd: iNorgeNeste12Mnd ? YesOrNo.NO : YesOrNo.YES,
//             utenlandsoppholdNeste12Mnd: senereOpphold.map(mapTilBostedUtland),
//             utenlandsoppholdSiste12Mnd: tidligereOpphold.map(mapTilBostedUtland),
//         };

//         return initialValues;
//     }

//     return defaultInitialValues;
// };

const Utenlandsopphold: React.FunctionComponent = () => {
    const intl = useIntl();
    const bem = bemUtils('utenlandsopphold');
    const history = useHistory();
    // const initialValues = getInitialValues(informasjonOmUtenlandsoppholdFraSøknad);

    const { dispatch } = useEngangsstønadContext();

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
            initialValues={defaultInitialValues}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = utenlandsoppholdFormQuestions.getVisbility(formValues);
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();
                return (
                    <Step
                        bannerTitle="Engangsstønad"
                        activeStepId="utenlandsopphold"
                        pageTitle="Utenlandsopphold"
                        stepTitle="Utenlandsopphold"
                        backLinkHref={getPreviousStepHref('utenlandsopphold')}
                        onCancel={() => null}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <UtenlandsoppholdFormComponents.Form
                            includeButtons={allQuestionsAnswered}
                            fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                            includeValidationSummary={true}
                            submitButtonLabel="Fortsett"
                            runDelayedFormValidation={true}
                            cleanup={(values) => utenlandsoppholdFormCleanup(values)}
                            noButtonsContentRenderer={
                                allQuestionsAnswered
                                    ? undefined
                                    : () => (
                                          <UnansweredQuestionsInfo>
                                              {intlUtils(intl, 'steg.footer.spørsmålMåBesvares')}
                                          </UnansweredQuestionsInfo>
                                      )
                            }
                        >
                            <div className={bem.block}>
                                {visibility.isVisible(UtenlandsoppholdFieldNames.skalBoUtenforNorgeNeste12Mnd) && (
                                    <Block>
                                        <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                            legend={intlUtils(intl, 'iNorgeNeste12Mnd.spørsmål')}
                                            name={UtenlandsoppholdFieldNames.skalBoUtenforNorgeNeste12Mnd}
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
                                                no: intlUtils(intl, 'iNorgeNeste12Mnd.alternativ.boINorge'),
                                                yes: intlUtils(intl, 'iNorgeNeste12Mnd.alternativ.boIUtlandet'),
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
                                                addLabel: 'Legg til nytt utenlandsopphold',
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
                                            legend={intlUtils(intl, 'boddINorgeSiste12Mnd.spørsmål')}
                                            name={UtenlandsoppholdFieldNames.harBoddUtenforNorgeSiste12Mnd}
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
                                                no: intlUtils(intl, 'boddINorgeSiste12Mnd.alternativ.boddINorge'),
                                                yes: intlUtils(intl, 'boddINorgeSiste12Mnd.alternativ.boddIUtlandet'),
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
                                                addLabel: 'Legg til nytt utenlandsopphold',
                                                modalTitle: 'Utenlandsopphold siste 12 måneder',
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
