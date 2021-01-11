import { bemUtils, Block, Step } from '@navikt/fp-common';
import React from 'react';
import { useIntl } from 'react-intl';
import { commonFieldErrorRenderer } from 'util/validation/validationUtils';
import { OmBarnetFormComponents, initialOmBarnetValues, OmBarnetFormField } from './omBarnetFormConfig';

import './omBarnet.less';
import omBarnetQuestionsConfig from './omBarnetQuestionsConfig';

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
                                            yes: 'Frem i tid',
                                            no: 'Tilbake i tid',
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
                            </div>
                        </Step>
                    </OmBarnetFormComponents.Form>
                );
            }}
        />
    );
};

export default OmBarnet;
