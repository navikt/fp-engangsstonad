import { bemUtils, Block, Step } from '@navikt/fp-common';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { commonFieldErrorRenderer } from 'util/validation/validationUtils';
import { OmBarnetFormComponents, initialOmBarnetValues, OmBarnetFormField } from './omBarnetFormConfig';

import './omBarnet.less';
import omBarnetQuestionsConfig from './omBarnetQuestionsConfig';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from '@navikt/fp-common/lib/components/veileder/Veileder';
import getMessage from 'common/util/i18nUtils';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import UtvidetInformasjon from 'components/utvidet-informasjon/UtvidetInformasjon';
import PictureScanningGuide from 'components/picture-scanning-guide/PictureScanningGuide';
import FormikFileUploader from 'components/formik-file-uploader/FormikFileUploader';

const OmBarnet: React.FunctionComponent = () => {
    const intl = useIntl();
    const bem = bemUtils('omBarnet');

    return (
        <OmBarnetFormComponents.FormikWrapper
            initialValues={initialOmBarnetValues}
            onSubmit={() => null}
            renderForm={({ values: formValues }) => {
                const visibility = omBarnetQuestionsConfig.getVisbility(formValues);

                return (
                    <OmBarnetFormComponents.Form
                        includeButtons={false}
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
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

                                <AttachmentList
                                    attachments={formValues.terminbekreftelse}
                                    showFileSize={true}
                                    onDelete={(file: Attachment) => null}
                                />
                            </div>
                        </Step>
                    </OmBarnetFormComponents.Form>
                );
            }}
        />
    );
};

export default OmBarnet;
