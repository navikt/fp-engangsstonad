import { Block, intlUtils, PictureScanningGuide, UtvidetInformasjon } from '@navikt/fp-common';
import Veileder from '@navikt/fp-common/lib/components/veileder/Veileder';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import getMessage from 'common/util/i18nUtils';
import dayjs from 'dayjs';
import { FieldArray } from 'formik';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormData, OmBarnetFormField } from '../omBarnetFormConfig';
import { validateAdopsjonDate, validateAdopsjonFødselDate } from '../omBarnetValidering';

interface Fødtprops {
    formValues: OmBarnetFormData;
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
}

const Stebarnsadopsjon: React.FunctionComponent<Fødtprops> = ({ visibility, formValues }) => {
    const intl = useIntl();

    if (formValues.stebarnsadopsjon === YesOrNo.NO || formValues.stebarnsadopsjon === YesOrNo.UNANSWERED) {
        return null;
    }

    return (
        <>
            {visibility.isVisible(OmBarnetFormField.adopsjonsdato) && (
                <Block margin="xl">
                    <OmBarnetFormComponents.DatePicker
                        name={OmBarnetFormField.adopsjonsdato}
                        label={getMessage(intl, 'omBarnet.adopsjon.spørsmål.stebarnsadopsjondato')}
                        minDate={dayjs().subtract(6, 'month').toDate()}
                        maxDate={dayjs().toDate()}
                        validate={validateAdopsjonDate}
                    />
                </Block>
            )}
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
                            legend={getMessage(intl, 'omBarnet.adopsjon.spørsmål.antallBarnAdoptert')}
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
            {visibility.isVisible(OmBarnetFormField.fødselsdatoer) && (
                <Block margin="xl">
                    <FieldArray
                        name={OmBarnetFormField.fødselsdatoer}
                        render={() =>
                            [...Array(parseInt(formValues.antallBarn!, 10))].map((_, index) => {
                                return (
                                    <Block padBottom="l" key={`${index}`}>
                                        <OmBarnetFormComponents.DatePicker
                                            name={`${OmBarnetFormField.fødselsdatoer}.${index}` as OmBarnetFormField}
                                            label={getMessage(
                                                intl,
                                                `omBarnet.adopsjon.spørsmål.fødselsdato.${index + 1}`
                                            )}
                                            minDate={dayjs().subtract(15, 'year').subtract(6, 'month').toDate()}
                                            maxDate={dayjs().toDate()}
                                            validate={validateAdopsjonFødselDate}
                                        />
                                    </Block>
                                );
                            })
                        }
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
        </>
    );
};
export default Stebarnsadopsjon;
