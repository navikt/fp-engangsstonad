import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import Attachment from 'common/storage/attachment/components/Attachment';

export enum OmBarnetFormField {
    erBarnetFødt = 'erBarnetFødt',
    antallBarn = 'antallBarn',
    fødselstidspunkt = 'fødselstidspunkt',
    fødselsdato = 'fødselsdato',
    termindato = 'termindato',
    terminbekreftelse = 'terminbekreftelse',
    terminbekreftelsedato = 'terminbekreftelsedato',
}

export interface OmBarnetFormData {
    [OmBarnetFormField.erBarnetFødt]: YesOrNo;
    [OmBarnetFormField.antallBarn]?: number;
    [OmBarnetFormField.fødselstidspunkt]?: string;
    [OmBarnetFormField.fødselsdato]?: string;
    [OmBarnetFormField.termindato]?: string;
    [OmBarnetFormField.terminbekreftelse]?: typeof Attachment;
    [OmBarnetFormField.terminbekreftelsedato]?: string;
}

export const initialOmBarnetValues: OmBarnetFormData = {
    [OmBarnetFormField.erBarnetFødt]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.antallBarn]: undefined,
    [OmBarnetFormField.fødselstidspunkt]: undefined,
    [OmBarnetFormField.fødselsdato]: undefined,
    [OmBarnetFormField.termindato]: undefined,
    [OmBarnetFormField.terminbekreftelse]: undefined,
    [OmBarnetFormField.terminbekreftelsedato]: undefined,
};

export const OmBarnetFormComponents = getTypedFormComponents<OmBarnetFormField, OmBarnetFormData>();
