import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { Systemtittel } from 'nav-frontend-typografi';
import getMessage from 'common/util/i18nUtils';
import { BostedUtland, isValidBostedUtland } from './types';
import { Block, commonFieldErrorRenderer, validateRequiredField } from '@navikt/fp-common';
import { dateRangeValidation } from '../utenlandsoppholdValidering';

export interface BostedUtlandFormLabels {
    tittel: string;
}

interface Props {
    minDate: Date;
    maxDate: Date;
    bosted?: BostedUtland;
    onSubmit: (values: BostedUtland) => void;
    onCancel: () => void;
    erFremtidigOpphold: boolean;
}

enum BostedUtlandFormFields {
    fom = 'fom',
    tom = 'tom',
    landkode = 'landkode',
}

type FormValues = Partial<{
    [BostedUtlandFormFields.fom]: string;
    [BostedUtlandFormFields.tom]: string;
    [BostedUtlandFormFields.landkode]: string;
}>;

const Form = getTypedFormComponents<BostedUtlandFormFields, FormValues>();

const mapBostedToFormValues = (bosted: BostedUtland): FormValues => {
    return {
        fom: bosted.fom,
        tom: bosted.tom,
        landkode: bosted.landkode,
    };
};

const BostedUtlandForm: React.FunctionComponent<Props> = ({
    maxDate,
    minDate,
    bosted,
    onSubmit,
    onCancel,
    erFremtidigOpphold,
}) => {
    const intl = useIntl();
    const onFormikSubmit = (formValues: FormValues) => {
        const updatedBosted: Partial<BostedUtland> = {
            ...bosted,
            fom: formValues.fom,
            tom: formValues.tom,
            landkode: formValues.landkode,
        };
        if (isValidBostedUtland(updatedBosted)) {
            onSubmit(updatedBosted);
        } else {
            throw new Error('BostedUtlandForm: Formvalues is not a valid BostedUtland on submit.');
        }
    };

    return (
        <Form.FormikWrapper
            initialValues={bosted ? mapBostedToFormValues(bosted) : {}}
            onSubmit={onFormikSubmit}
            renderForm={({ values }) => {
                return (
                    <Form.Form
                        onCancel={onCancel}
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                    >
                        <Systemtittel tag="h1">
                            <FormattedMessage
                                id={getMessage(intl, 'utenlandsopphold.leggTilUtenlandsopphold.tittel')}
                            />
                        </Systemtittel>
                        <Block>
                            <Form.DateIntervalPicker
                                legend={getMessage(intl, 'utenlandsopphold.leggTilUtenlandsopphold.tidsrom')}
                                fromDatepickerProps={{
                                    name: BostedUtlandFormFields.fom,
                                    label: getMessage(intl, 'utenlandsopphold.leggTilUtenlandsopphold.fraogmed'),
                                    fullscreenOverlay: true,
                                    placeholder: 'dd.mm.åååå',
                                    minDate,
                                    invalidFormatErrorKey: 'valideringsfeil.ugyldigDato',
                                    maxDate: ISOStringToDate(values.tom) || maxDate,
                                    validate: (value) =>
                                        dateRangeValidation.validateFromDate(
                                            ISOStringToDate(value),
                                            minDate,
                                            maxDate,
                                            ISOStringToDate(values.tom)
                                        ),
                                }}
                                toDatepickerProps={{
                                    name: BostedUtlandFormFields.tom,
                                    label: getMessage(intl, 'utenlandsopphold.leggTilUtenlandsopphold.tilogmed'),
                                    fullscreenOverlay: true,
                                    placeholder: 'dd.mm.åååå',
                                    minDate: ISOStringToDate(values.fom) || minDate,
                                    maxDate,
                                    invalidFormatErrorKey: 'valideringsfeil.ugyldigDato',
                                    validate: (value) =>
                                        dateRangeValidation.validateToDate(
                                            ISOStringToDate(value),
                                            minDate,
                                            maxDate,
                                            ISOStringToDate(values.fom)
                                        ),
                                }}
                            />
                        </Block>
                        <Block margin="xl">
                            <Form.CountrySelect
                                name={BostedUtlandFormFields.landkode}
                                label={
                                    erFremtidigOpphold
                                        ? getMessage(
                                              intl,
                                              'utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandSkalDuBoI'
                                          )
                                        : getMessage(
                                              intl,
                                              'utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandHarDuBoddI'
                                          )
                                }
                                validate={(country) =>
                                    validateRequiredField(
                                        country,
                                        erFremtidigOpphold
                                            ? 'valideringsfeil.leggTilUtenlandsopphold.landDuSkalBoIPåkreved'
                                            : 'valideringsfeil.leggTilUtenlandsopphold.landDuHarBoddIPåkrevd'
                                    )
                                }
                                useAlpha3Code={false}
                            />
                        </Block>
                    </Form.Form>
                );
            }}
        />
    );
};

export default BostedUtlandForm;
