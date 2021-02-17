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

const OvertoOmsorg: React.FunctionComponent<Fødtprops> = ({ visibility, formValues }) => {
    const intl = useIntl();
    console.log('formValues.stebarnsadopsjon', formValues.stebarnsadopsjon);
    if (formValues.stebarnsadopsjon === YesOrNo.YES) {
        return null;
    }
    return (
        <>
            {visibility.isVisible(OmBarnetFormField.overtaomsorgdato) && (
                <Block margin="xl">
                    <OmBarnetFormComponents.DatePicker
                        name={OmBarnetFormField.overtaomsorgdato}
                        label={getMessage(intl, 'omBarnet.adopsjon.spørsmål.overtaomsorgdato')}
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
            {visibility.isVisible(OmBarnetFormField.adoptertFraUtland) && (
                <Block margin="xl">
                    <OmBarnetFormComponents.YesOrNoQuestion
                        name={OmBarnetFormField.adoptertFraUtland}
                        legend={getMessage(intl, 'ombarnet.adopsjon.spørsmål.adoptertFraUtland')}
                        labels={{
                            no: getMessage(intl, 'omBarnet.adopsjon.text.stebarnsadopsjon.nei'),
                            yes: getMessage(intl, 'omBarnet.adopsjon.text.stebarnsadopsjon.ja'),
                        }}
                    />
                </Block>
            )}
            {visibility.isVisible(OmBarnetFormField.nårKommerBarnetDato) && (
                <Block margin="xl">
                    <OmBarnetFormComponents.DatePicker
                        name={OmBarnetFormField.nårKommerBarnetDato}
                        label={getMessage(intl, 'ombarnet.adopsjon.spørsmål.nårKommerBarnetDato')}
                        minDate={dayjs().subtract(6, 'month').toDate()}
                        maxDate={dayjs().toDate()}
                        validate={validateFødselDate}
                    />
                </Block>
            )}
            {visibility.isVisible(OmBarnetFormField.adopsjonsbevillingen) && (
                <>
                    <Block margin="xl">
                        <Veilederpanel kompakt={true} svg={<Veileder />}>
                            {getMessage(intl, 'omBarnet.adopsjon.veilederpanel.adopsjonsbevillingen.text')}
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
export default OvertoOmsorg;
