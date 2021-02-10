import { bemUtils, Block, commonFieldErrorRenderer, intlUtils, Step, useDocumentTitle } from '@navikt/fp-common';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

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
import { useEngangsstønadContext } from 'app/context/hooks/useEngangsstønadContext';
import { validateFødselDate, valideringAvTerminbekreftelsesdato } from 'app/steps/om-barnet/omBarnetValidering';

import './adopsjonOmBarnet.less';
import {
    AdopsjonOmBarnetFormComponents,
    AdopsjonOmBarnetFormData,
    AdopsjonOmBarnetFormField,
} from './adopsjonOmBarnetFormConfig';
import adopsjonOmBarnetQuestionsConfig from './adopsjonOmBarnetQuestionsConfig';
import { cleanupAdopsjonOmBarnet } from './adopsjonOmBarnetUtils';
import { validateOvertaomsorgDate } from './adopsjonOmBarnetValidering';

const AdopsjonOmBarnet: React.FunctionComponent = () => {
    const intl = useIntl();
    const bem = bemUtils('adopsjonOmBarnet');
    const history = useHistory();
    useDocumentTitle(intlUtils(intl, 'velkommen.standard.dokumenttittel'));
    const { state, dispatch } = useEngangsstønadContext();
    const adopsjonOmBarnetValues = state.søknad.adopsjonOmBarnet;

    const onValidSubmit = (values: Partial<AdopsjonOmBarnetFormData>) => {
        dispatch(
            actionCreator.setAdopsjonOmBarnet({
                stebarnsadopsjon: values.stebarnsadopsjon!,
                stebarnsadopsjondato: values.stebarnsadopsjondato,
                overtaomsorgdato: values.overtaomsorgdato,
                antallBarnAdoptert: values.antallBarnAdoptert,
                fødselsdato: values.fødselsdato,
                terminbekreftelse: values.terminbekreftelse || [],
                stebarnsadopsjonbekreftelsedato: values.stebarnsadopsjonbekreftelsedato,
                nårKommerBarnetDato: values.nårKommerBarnetDato,
            })
        );
        history.push('/soknad/utenlandsopphold');
    };

    return (
        <AdopsjonOmBarnetFormComponents.FormikWrapper
            initialValues={adopsjonOmBarnetValues}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = adopsjonOmBarnetQuestionsConfig.getVisbility(formValues);
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();

                return (
                    <Step
                        bannerTitle={getMessage(intl, 'søknad.pageheading')}
                        activeStepId="adopsjonOmBarnet"
                        pageTitle={getMessage(intl, 'søknad.omBarnet')}
                        stepTitle={getMessage(intl, 'søknad.omBarnet')}
                        onCancel={() => null}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <AdopsjonOmBarnetFormComponents.Form
                            includeButtons={false}
                            fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                            cleanup={() => cleanupAdopsjonOmBarnet(formValues)}
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
                                    <AdopsjonOmBarnetFormComponents.YesOrNoQuestion
                                        name={AdopsjonOmBarnetFormField.stebarnsadopsjon}
                                        legend={getMessage(intl, 'omBarnet.adopsjon.spørsmål.stebarnsadopsjon')}
                                        labels={{
                                            no: getMessage(intl, 'omBarnet.adopsjon.text.stebarnsadopsjon.nei'),
                                            yes: getMessage(intl, 'omBarnet.adopsjon.text.stebarnsadopsjon.ja'),
                                        }}
                                    />
                                </Block>
                                {visibility.isVisible(AdopsjonOmBarnetFormField.stebarnsadopsjondato) && (
                                    <Block margin="xl">
                                        <AdopsjonOmBarnetFormComponents.DatePicker
                                            name={AdopsjonOmBarnetFormField.stebarnsadopsjondato}
                                            label={getMessage(intl, 'omBarnet.adopsjon.spørsmål.stebarnsadopsjondato')}
                                            minDate={dayjs().subtract(6, 'month').toDate()}
                                            maxDate={dayjs().toDate()}
                                            validate={validateFødselDate}
                                        />
                                    </Block>
                                )}
                                {visibility.isVisible(AdopsjonOmBarnetFormField.overtaomsorgdato) && (
                                    <Block margin="xl">
                                        <AdopsjonOmBarnetFormComponents.DatePicker
                                            name={AdopsjonOmBarnetFormField.overtaomsorgdato}
                                            label={getMessage(intl, 'omBarnet.adopsjon.spørsmål.overtaomsorgdato')}
                                            minDate={dayjs().subtract(6, 'month').toDate()}
                                            maxDate={dayjs().toDate()}
                                            validate={validateOvertaomsorgDate}
                                        />
                                    </Block>
                                )}
                                {visibility.isVisible(AdopsjonOmBarnetFormField.antallBarnAdoptert) && (
                                    <>
                                        <Block margin="xl">
                                            <AdopsjonOmBarnetFormComponents.RadioPanelGroup
                                                name={AdopsjonOmBarnetFormField.antallBarnAdoptert}
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
                                        {formValues.antallBarnAdoptert &&
                                            parseInt(formValues.antallBarnAdoptert, 10) >= 3 && (
                                                <Block margin="xl">
                                                    <AdopsjonOmBarnetFormComponents.Select
                                                        name={AdopsjonOmBarnetFormField.antallBarnAdoptert}
                                                    >
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                    </AdopsjonOmBarnetFormComponents.Select>
                                                </Block>
                                            )}
                                    </>
                                )}
                                {visibility.isVisible(AdopsjonOmBarnetFormField.fødselsdato) && (
                                    <Block margin="xl">
                                        <AdopsjonOmBarnetFormComponents.DatePicker
                                            name={AdopsjonOmBarnetFormField.fødselsdato}
                                            label={getMessage(intl, 'omBarnet.adopsjon.spørsmål.fødselsdato')}
                                            minDate={dayjs().subtract(6, 'month').toDate()}
                                            maxDate={dayjs().toDate()}
                                            validate={validateFødselDate}
                                        />
                                    </Block>
                                )}
                                {visibility.isVisible(AdopsjonOmBarnetFormField.terminbekreftelse) && (
                                    <>
                                        <Block margin="xl">
                                            <Veilederpanel kompakt={true} svg={<Veileder />}>
                                                {getMessage(intl, 'terminbekreftelsen.text.terminbekreftelsen')}
                                            </Veilederpanel>
                                        </Block>
                                        <Block margin="xl">
                                            <FormikFileUploader
                                                label={getMessage(intl, 'vedlegg.lastoppknapp.label')}
                                                name={AdopsjonOmBarnetFormField.terminbekreftelse}
                                            />
                                            <UtvidetInformasjon apneLabel={<FormattedMessage id="psg.åpneLabel" />}>
                                                <PictureScanningGuide />
                                            </UtvidetInformasjon>
                                        </Block>
                                    </>
                                )}
                                {visibility.isVisible(AdopsjonOmBarnetFormField.stebarnsadopsjonbekreftelsedato) && (
                                    <Block margin="xl">
                                        <AdopsjonOmBarnetFormComponents.DatePicker
                                            name={AdopsjonOmBarnetFormField.stebarnsadopsjonbekreftelsedato}
                                            label={getMessage(intl, 'søknad.terminbekreftelsesdato')}
                                            minDate={dayjs(formValues.stebarnsadopsjondato)
                                                .subtract(18, 'week')
                                                .subtract(3, 'day')
                                                .toDate()}
                                            maxDate={dayjs().toDate()}
                                            validate={(stebarnsadopsjonbekreftelsedato) =>
                                                valideringAvTerminbekreftelsesdato(
                                                    stebarnsadopsjonbekreftelsedato,
                                                    formValues.stebarnsadopsjondato
                                                )
                                            }
                                        />
                                    </Block>
                                )}
                                {allQuestionsAnswered && (
                                    <Block margin="xl" textAlignCenter={true}>
                                        <Hovedknapp>{getMessage(intl, 'søknad.gåVidere')}</Hovedknapp>
                                    </Block>
                                )}
                            </div>
                        </AdopsjonOmBarnetFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default AdopsjonOmBarnet;
