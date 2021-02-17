import { Block, intlUtils, PictureScanningGuide, UtvidetInformasjon } from '@navikt/fp-common';
import Veileder from '@navikt/fp-common/lib/components/veileder/Veileder';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import getMessage from 'common/util/i18nUtils';
import dayjs from 'dayjs';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormData, OmBarnetFormField } from '../omBarnetFormConfig';
import { validateFødselDate } from '../omBarnetValidering';

interface Fødtprops {
    formValues: OmBarnetFormData;
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
}

const Stebarnsadopsjon: React.FunctionComponent<Fødtprops> = ({ visibility, formValues }) => {
    const intl = useIntl();

    if (formValues.stebarnsadopsjon === YesOrNo.NO) {
        return null;
    }
    return (
        <>
            {visibility.isVisible(OmBarnetFormField.stebarnsadopsjondato) && (
                <Block margin="xl">
                    <OmBarnetFormComponents.DatePicker
                        name={OmBarnetFormField.stebarnsadopsjondato}
                        label={getMessage(intl, 'omBarnet.adopsjon.spørsmål.stebarnsadopsjondato')}
                        minDate={dayjs().subtract(6, 'month').toDate()}
                        maxDate={dayjs().toDate()}
                        validate={validateFødselDate}
                    />
                </Block>
            )}
            {visibility.isVisible(OmBarnetFormField.antallBarnAdoptert) && (
                <>
                    <Block margin="xl">
                        <OmBarnetFormComponents.RadioPanelGroup
                            name={OmBarnetFormField.antallBarnAdoptert}
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
                            legend={getMessage(intl, 'omBarnet.adopsjon.spørsmål.antallBarnAdoptert')}
                        />
                    </Block>
                    {formValues.antallBarnAdoptert && parseInt(formValues.antallBarnAdoptert, 10) >= 3 && (
                        <Block margin="xl">
                            <OmBarnetFormComponents.Select name={OmBarnetFormField.antallBarnAdoptert}>
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
            {visibility.isVisible(OmBarnetFormField.adoptertFødselsDato) && (
                <Block margin="xl">
                    <OmBarnetFormComponents.DatePicker
                        name={OmBarnetFormField.adoptertFødselsDato}
                        label={getMessage(intl, 'omBarnet.adopsjon.spørsmål.fødselsdato')}
                        minDate={dayjs().subtract(6, 'month').toDate()}
                        maxDate={dayjs().toDate()}
                        validate={validateFødselDate}
                    />
                </Block>
            )}
            {visibility.isVisible(OmBarnetFormField.adopsjonBekreftelse) && (
                <>
                    <Block margin="xl">
                        <Veilederpanel kompakt={true} svg={<Veileder />}>
                            {getMessage(intl, 'omBarnet.adopsjon.veilederpanel.stebarnadopsjon.text')}
                        </Veilederpanel>
                    </Block>
                    <Block margin="xl">
                        <FormikFileUploader
                            attachments={formValues.adopsjonBekreftelse || []}
                            label={getMessage(intl, 'vedlegg.lastoppknapp.label')}
                            name={OmBarnetFormField.adopsjonBekreftelse}
                        />
                        <UtvidetInformasjon apneLabel={<FormattedMessage id="psg.åpneLabel" />}>
                            <PictureScanningGuide />
                        </UtvidetInformasjon>
                    </Block>
                </>
            )}
            {visibility.isVisible(OmBarnetFormField.adopsjonsbevillingen) && (
                <>
                    <Block margin="xl">
                        <Veilederpanel kompakt={true} svg={<Veileder />}>
                            {getMessage(intl, 'terminbekreftelsen.text.terminbekreftelsen')}
                        </Veilederpanel>
                    </Block>
                    <Block margin="xl">
                        <FormikFileUploader
                            attachments={formValues.adopsjonBekreftelse || []}
                            label={getMessage(intl, 'vedlegg.lastoppknapp.label')}
                            name={OmBarnetFormField.adopsjonsbevillingen}
                        />
                        <UtvidetInformasjon apneLabel={<FormattedMessage id="psg.åpneLabel" />}>
                            <PictureScanningGuide />
                        </UtvidetInformasjon>
                    </Block>
                </>
            )}
        </>
    );
};
export default Stebarnsadopsjon;
