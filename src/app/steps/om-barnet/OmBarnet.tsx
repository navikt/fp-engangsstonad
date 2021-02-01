import { bemUtils, Block, commonFieldErrorRenderer, intlUtils, Step, useDocumentTitle } from '@navikt/fp-common';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { OmBarnetFormComponents, OmBarnetFormField, OmBarnetFormData } from './omBarnetFormConfig';
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
import actionCreator from 'app/context/action/actionCreator';
import stepConfig from 'app/step-config/stepConfig';
import { cleanupOmBarnet } from './omBarnetUtils';
import { useEngangsstønadContext } from 'app/context/hooks/useEngangsstønadContext';
import { validateAttachmentSize } from 'common/storage/attachment/components/attachmentValidering';

import './omBarnet.less';

const OmBarnet: React.FunctionComponent = () => {
    const intl = useIntl();
    const bem = bemUtils('omBarnet');
    const history = useHistory();
    useDocumentTitle(intlUtils(intl, 'velkommen.standard.dokumenttittel'));
    const { state, dispatch } = useEngangsstønadContext();
    const initialValues = state.søknad.omBarnet;

    const onValidSubmit = (values: Partial<OmBarnetFormData>) => {
        dispatch(
            actionCreator.setOmBarnet({
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

    console.log('terminbekreftelse', initialValues.terminbekreftelse);

    return (
        <OmBarnetFormComponents.FormikWrapper
            initialValues={initialValues}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = omBarnetQuestionsConfig.getVisbility(formValues);
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();

                return (
                    <Step
                        bannerTitle={getMessage(intl, 'søknad.pageheading')}
                        activeStepId="omBarnet"
                        pageTitle={getMessage(intl, 'søknad.omBarnet')}
                        stepTitle={getMessage(intl, 'søknad.omBarnet')}
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
                                {visibility.isVisible(OmBarnetFormField.antallBarn) && (
                                    <>
                                        <Block margin="xl">
                                            <OmBarnetFormComponents.RadioPanelGroup
                                                name={OmBarnetFormField.antallBarn}
                                                radios={[
                                                    {
                                                        label: intlUtils(intl, 'omBarnet.radiobutton.ettbarn'),
                                                        value: '1',
                                                    },
                                                    {
                                                        label: intlUtils(intl, 'omBarnet.radiobutton.tvillinger'),
                                                        value: '2',
                                                    },
                                                    {
                                                        label: intlUtils(intl, 'omBarnet.radiobutton.flere'),
                                                        value: '3',
                                                    },
                                                ]}
                                                useTwoColumns={true}
                                                legend={getMessage(intl, 'omBarnet.text.antallBarn')}
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
                                            label={getMessage(intl, 'søknad.fødselsdato')}
                                            minDate={dayjs().subtract(6, 'month').toDate()}
                                            maxDate={dayjs().toDate()}
                                        />
                                    </Block>
                                )}
                                {visibility.isVisible(OmBarnetFormField.termindato) && (
                                    <Block margin="xl">
                                        <OmBarnetFormComponents.DatePicker
                                            name={OmBarnetFormField.termindato}
                                            label={getMessage(intl, 'søknad.termindato')}
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
                                                label={getMessage(intl, 'vedlegg.lastoppknapp.label')}
                                                name={OmBarnetFormField.terminbekreftelse}
                                                validate={validateAttachmentSize}
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
                                            label={getMessage(intl, 'søknad.terminbekreftelsesdato')}
                                        />
                                    </Block>
                                )}
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
