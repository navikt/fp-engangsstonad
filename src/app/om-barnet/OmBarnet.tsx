import { bemUtils, Block, intlUtils, Step, useDocumentTitle } from '@navikt/fp-common';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { commonFieldErrorRenderer } from 'util/validation/validationUtils';
import {
    OmBarnetFormComponents,
    initialOmBarnetValues,
    OmBarnetFormField,
    OmBarnetFormData,
} from './omBarnetFormConfig';
import omBarnetQuestionsConfig from './omBarnetQuestionsConfig';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from '@navikt/fp-common/lib/components/veileder/Veileder';
import getMessage from 'common/util/i18nUtils';
import UtvidetInformasjon from 'components/utvidet-informasjon/UtvidetInformasjon';
import PictureScanningGuide from 'components/picture-scanning-guide/PictureScanningGuide';
import FormikFileUploader from 'components/formik-file-uploader/FormikFileUploader';
import dayjs from 'dayjs';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik/lib';
import { useEngangsstønadContext } from 'app/form/EngangsstønadContext';
import action from 'app/form/action/action';

import './omBarnet.less';

const OmBarnet: React.FunctionComponent = () => {
    const intl = useIntl();
    const bem = bemUtils('omBarnet');
    const history = useHistory();
    useDocumentTitle(intlUtils(intl, 'intro.standard.dokumenttittel'));
    const { dispatch } = useEngangsstønadContext();

    const onValidSubmit = (values: Partial<OmBarnetFormData>) => {
        dispatch(
            action.setOmBarnet({
                antallBarn: values.antallBarn,
                erBarnetFødt: values.erBarnetFødt!,
                terminbekreftelse: values.terminbekreftelse || [],
                terminbekreftelsedato: values.terminbekreftelsedato,
                fødselsdato: values.fødselsdato,
                termindato: values.termindato,
            })
        );
        history.push('/soknad/utenlandsopphold');
    };

    return (
        <OmBarnetFormComponents.FormikWrapper
            initialValues={initialOmBarnetValues}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = omBarnetQuestionsConfig.getVisbility(formValues);
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();

                return (
                    <OmBarnetFormComponents.Form
                        includeButtons={false}
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
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
                        <Step
                            bannerTitle="Engangsstønad"
                            activeStepId="om-barnet"
                            pageTitle="Om Barnet"
                            stepTitle="Om Barnet"
                            onCancel={() => null}
                            steps={[
                                {
                                    id: 'om-barnet',
                                    index: 0,
                                    label: 'Fyll ut informasjon om barnet',
                                },
                            ]}
                        >
                            <div className={bem.block}>
                                <Block>
                                    <OmBarnetFormComponents.YesOrNoQuestion
                                        name={OmBarnetFormField.erBarnetFødt}
                                        legend="Når er barnet født"
                                        labels={{
                                            no: 'Frem i tid',
                                            yes: 'Tilbake i tid',
                                        }}
                                    />
                                </Block>
                                {visibility.isVisible(OmBarnetFormField.antallBarn) && (
                                    <>
                                        <Block margin="xl">
                                            <OmBarnetFormComponents.RadioPanelGroup
                                                name={OmBarnetFormField.antallBarn}
                                                radios={[
                                                    { label: 'Ett barn', value: '1' },
                                                    { label: 'Tvillinger', value: '2' },
                                                    { label: 'Flere barn', value: '3' },
                                                ]}
                                                useTwoColumns={true}
                                                legend="Antall barn"
                                            />
                                        </Block>
                                        {formValues.antallBarn && parseInt(formValues.antallBarn, 10) >= 3 && (
                                            <Block margin="xl">
                                                <OmBarnetFormComponents.Select name={OmBarnetFormField.antallBarn}>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                </OmBarnetFormComponents.Select>
                                            </Block>
                                        )}
                                    </>
                                )}
                                {visibility.isVisible(OmBarnetFormField.fødselsdato) && (
                                    <Block margin="xl">
                                        <OmBarnetFormComponents.DatePicker
                                            name={OmBarnetFormField.fødselsdato}
                                            label={'Fødselsdato'}
                                        />
                                    </Block>
                                )}
                                {visibility.isVisible(OmBarnetFormField.termindato) && (
                                    <Block margin="xl">
                                        <OmBarnetFormComponents.DatePicker
                                            name={OmBarnetFormField.termindato}
                                            label={'Termindato'}
                                            minDate={dayjs().toDate()}
                                            maxDate={dayjs().add(9, 'month').toDate()}
                                        />
                                    </Block>
                                )}
                                {visibility.isVisible(OmBarnetFormField.terminbekreftelse) && (
                                    <>
                                        <Block margin="xl">
                                            <Veilederpanel kompakt={true} svg={<Veileder />}>
                                                {getMessage(intl, 'terminbekreftelsen.text.terminbekreftelsen')}
                                            </Veilederpanel>
                                        </Block>
                                        <Block margin="xl">
                                            <FormikFileUploader
                                                label="Last opp vedlegg"
                                                name={OmBarnetFormField.terminbekreftelse}
                                            />
                                            <UtvidetInformasjon apneLabel={<FormattedMessage id="psg.åpneLabel" />}>
                                                <PictureScanningGuide />
                                            </UtvidetInformasjon>
                                        </Block>
                                    </>
                                )}
                                {visibility.isVisible(OmBarnetFormField.terminbekreftelsedato) && (
                                    <Block margin="xl">
                                        <OmBarnetFormComponents.DatePicker
                                            name={OmBarnetFormField.terminbekreftelsedato}
                                            label="Terminbekreftelsesdato"
                                        />
                                    </Block>
                                )}
                                {allQuestionsAnswered && (
                                    <Block margin="xl" textAlignCenter={true}>
                                        <Hovedknapp>Gå videre</Hovedknapp>
                                    </Block>
                                )}
                            </div>
                        </Step>
                    </OmBarnetFormComponents.Form>
                );
            }}
        />
    );
};

export default OmBarnet;
