import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import { SøkersituasjonFormField } from '../søkersituasjon/søkersituasjonFormConfig';

export enum OmBarnetFormField {
    erBarnetFødt = 'erBarnetFødt',
    stebarnsadopsjon = 'stebarnsadopsjon',
    antallBarn = 'antallBarn',
    adopsjonsdato = 'adopsjonsdato',
    fødselsdato = 'fødselsdato',
    termindato = 'termindato',
    adopsjonBekreftelse = 'adopsjonBekreftelse',
    terminbekreftelse = 'terminbekreftelse',
    terminbekreftelsedato = 'terminbekreftelsedato',
    nårKommerBarnetDato = 'nårKommerBarnetDato',
    adoptertFraUtland = 'adoptertFraUtland',
    adopsjonsbevilling = 'adopsjonsbevilling',
}

export interface OmBarnetFormData {
    [OmBarnetFormField.erBarnetFødt]: YesOrNo;
    [OmBarnetFormField.stebarnsadopsjon]: YesOrNo;
    [OmBarnetFormField.antallBarn]?: string;
    [OmBarnetFormField.adopsjonsdato]?: string;
    [OmBarnetFormField.fødselsdato]?: string;
    [OmBarnetFormField.termindato]?: string;
    [OmBarnetFormField.adopsjonBekreftelse]: any[];
    [OmBarnetFormField.adoptertFraUtland]: YesOrNo;
    [OmBarnetFormField.terminbekreftelse]: any[];
    [OmBarnetFormField.terminbekreftelsedato]?: string;
    [OmBarnetFormField.nårKommerBarnetDato]?: string;
    [OmBarnetFormField.adopsjonsbevilling]: any[];
}

export const initialOmBarnetValues: OmBarnetFormData = {
    [OmBarnetFormField.erBarnetFødt]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.stebarnsadopsjon]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.antallBarn]: undefined,
    [OmBarnetFormField.adopsjonsdato]: undefined,
    [OmBarnetFormField.fødselsdato]: undefined,
    [OmBarnetFormField.termindato]: undefined,
    [OmBarnetFormField.adopsjonBekreftelse]: [],
    [OmBarnetFormField.adoptertFraUtland]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.terminbekreftelse]: [],
    [OmBarnetFormField.terminbekreftelsedato]: undefined,
    [OmBarnetFormField.nårKommerBarnetDato]: undefined,
    [OmBarnetFormField.adopsjonsbevilling]: [],
};

export const OmBarnetFormComponents = getTypedFormComponents<
    OmBarnetFormField | SøkersituasjonFormField,
    OmBarnetFormData
>();
