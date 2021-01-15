import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';

export enum OmBarnetFormField {
    erBarnetFødt = 'erBarnetFødt',
    antallBarn = 'antallBarn',
    fødselsdato = 'fødselsdato',
    termindato = 'termindato',
    terminbekreftelse = 'terminbekreftelse',
    terminbekreftelsedato = 'terminbekreftelsedato',
}

export interface OmBarnetFormData {
    [OmBarnetFormField.erBarnetFødt]: YesOrNo;
    [OmBarnetFormField.antallBarn]?: string;
    [OmBarnetFormField.fødselsdato]?: string;
    [OmBarnetFormField.termindato]?: string;
    [OmBarnetFormField.terminbekreftelse]: any[];
    [OmBarnetFormField.terminbekreftelsedato]?: string;
}

export const initialOmBarnetValues: OmBarnetFormData = {
    [OmBarnetFormField.erBarnetFødt]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.antallBarn]: undefined,
    [OmBarnetFormField.fødselsdato]: undefined,
    [OmBarnetFormField.termindato]: undefined,
    [OmBarnetFormField.terminbekreftelse]: [],
    [OmBarnetFormField.terminbekreftelsedato]: undefined,
};

export const OmBarnetFormComponents = getTypedFormComponents<OmBarnetFormField, OmBarnetFormData>();
