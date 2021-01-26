import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';

export enum OppsummeringFormField {
    oppgittKorrekteOpplysninger = 'oppgittKorrekteOpplysninger',
}

export interface OppsummeringFormData {
    [OppsummeringFormField.oppgittKorrekteOpplysninger]?: boolean;
}

export const initialOppsummeringValues: OppsummeringFormData = {
    [OppsummeringFormField.oppgittKorrekteOpplysninger]: undefined,
};

export const OppsummeringFormComponents = getTypedFormComponents<OppsummeringFormField, OppsummeringFormData>();
