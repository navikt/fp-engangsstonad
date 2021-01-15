import { bemUtils, Block, intlUtils } from '@navikt/fp-common';
import { UnansweredQuestionsInfo, YesOrNo } from '@navikt/sif-common-formik/lib';
import UtvidetInformasjon from 'components/utvidet-informasjon/UtvidetInformasjon';
import React, { useContext } from 'react';
import { commonFieldErrorRenderer } from 'util/validation/validationUtils';
import BostedUtlandListAndDialog from './bostedUtlandListAndDialog/BostedUtlandListAndDialog';
import utenlandsoppholdFormCleanup from './utenlandsoppholdFormCleanup';
import { utenlandsoppholdFormQuestions } from './utenlandsoppholdFormQuestions';
import {
    UtenlandsoppholdFieldNames,
    UtenlandsoppholdFormComponents,
    UtenlandsoppholdFormValues,
} from './utenlandsoppholdFormTypes';
import { Utenlandsopphold } from 'app/types/domain/InformasjonOmUtenlandsopphold';
// import InformasjonOmUtenlandsopphold, { Utenlandsopphold } from 'app/types/domain/InformasjonOmUtenlandsopphold';
// import { BostedUtland } from './bostedUtlandListAndDialog/types';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

import './utenlandsopphold.less';
import { EngangsstønadFormContext } from './../form/EngangsstønadFormContext';

const dateToday = new Date();
const date1YearFromNow = dayjs().add(1, 'year').toDate();
const date1YearAgo = dayjs().subtract(1, 'year').toDate();

const defaultInitialValues: UtenlandsoppholdFormValues = {
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
// ): UtenlandsoppholdFormValues => {
//     if (utenlandsoppholdErGyldig(informasjonOmUtenlandsoppholdFraSøknad)) {
//         const {
//             iNorgeSiste12Mnd,
//             iNorgeNeste12Mnd,
//             senereOpphold,
//             tidligereOpphold,
//         } = informasjonOmUtenlandsoppholdFraSøknad;

//         const initialValues: UtenlandsoppholdFormValues = {
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
    const bem = bemUtils('utenlandsopphold');
    const intl = useIntl();
    const values = useContext(EngangsstønadFormContext);

    console.log(values);
    // const initialValues = getInitialValues(informasjonOmUtenlandsoppholdFraSøknad);

    return (
        <div className={bem.block}>
            <UtenlandsoppholdFormComponents.FormikWrapper
                initialValues={defaultInitialValues}
                onSubmit={() => null}
                renderForm={({ values: formValues }) => {
                    const visibility = utenlandsoppholdFormQuestions.getVisbility(formValues);
                    const allQuestionsAnswered = visibility.areAllQuestionsAnswered();
                    return (
                        <div>
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
                                <div>
                                    {visibility.isVisible(UtenlandsoppholdFieldNames.skalBoUtenforNorgeNeste12Mnd) && (
                                        <Block margin="m">
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
                                                // validate={validateYesOrNoIsAnswered}
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
                                                // validate={validateUtenlandsoppholdNeste12Mnd}
                                            />
                                        </Block>
                                    )}
                                    {visibility.isVisible(UtenlandsoppholdFieldNames.harBoddUtenforNorgeSiste12Mnd) && (
                                        <Block>
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
                                                    yes: intlUtils(
                                                        intl,
                                                        'boddINorgeSiste12Mnd.alternativ.boddIUtlandet'
                                                    ),
                                                }}
                                                // validate={validateYesOrNoIsAnswered}
                                            />
                                        </Block>
                                    )}
                                    {visibility.isVisible(UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd) && (
                                        <Block margin="m">
                                            <BostedUtlandListAndDialog<UtenlandsoppholdFieldNames>
                                                minDate={date1YearAgo}
                                                maxDate={dateToday}
                                                name={UtenlandsoppholdFieldNames.utenlandsoppholdSiste12Mnd}
                                                labels={{
                                                    addLabel: 'Legg til nytt utenlandsopphold',
                                                    modalTitle: 'Utenlandsopphold siste 12 måneder',
                                                }}
                                                erFremtidigOpphold={false}
                                                // validate={validateUtenlandsoppholdSiste12Mnd}
                                            />
                                        </Block>
                                    )}
                                </div>
                            </UtenlandsoppholdFormComponents.Form>
                        </div>
                    );
                }}
            />
        </div>
    );
};

export default Utenlandsopphold;
