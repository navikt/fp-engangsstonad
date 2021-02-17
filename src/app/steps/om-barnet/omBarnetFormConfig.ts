import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import { SøkersituasjonFormField } from '../søkersituasjon/søkersituasjonFormConfig';

export enum OmBarnetFormField {
    erBarnetFødt = 'erBarnetFødt',
    stebarnsadopsjon = 'stebarnsadopsjon',
    antallBarn = 'antallBarn',
    antallBarnAdoptert = 'antallBarnAdoptert',
    fødselsdato = 'fødselsdato',
    adoptertFødselsDato = 'adoptertFødselsDato',
    adopsjonBekreftelse = 'adopsjonBekreftelse',
    termindato = 'termindato',
    terminbekreftelse = 'terminbekreftelse',
    terminbekreftelsedato = 'terminbekreftelsedato',
    stebarnsadopsjondato = 'stebarnsadopsjondato',
    overtaomsorgdato = 'overtaomsorgdato',
    nårKommerBarnetDato = 'nårKommerBarnetDato',
    adoptertFraUtland = 'adoptertFraUtland',
    adopsjonsbevillingen = 'adopsjonsbevillingen',
}

export interface OmBarnetFormData {
    [OmBarnetFormField.erBarnetFødt]: YesOrNo;
    [OmBarnetFormField.stebarnsadopsjon]: YesOrNo;
    [OmBarnetFormField.antallBarn]?: string;
    [OmBarnetFormField.antallBarnAdoptert]?: string;
    [OmBarnetFormField.fødselsdato]?: string;
    [OmBarnetFormField.adoptertFødselsDato]?: string;
    [OmBarnetFormField.adopsjonBekreftelse]: any[];
    [OmBarnetFormField.adoptertFraUtland]: YesOrNo;
    [OmBarnetFormField.termindato]?: string;
    [OmBarnetFormField.terminbekreftelse]: any[];
    [OmBarnetFormField.terminbekreftelsedato]?: string;
    [OmBarnetFormField.stebarnsadopsjondato]?: string;
    [OmBarnetFormField.overtaomsorgdato]?: string;
    [OmBarnetFormField.nårKommerBarnetDato]?: string;
    [OmBarnetFormField.adopsjonsbevillingen]: any[];
}

export const initialOmBarnetValues: OmBarnetFormData = {
    [OmBarnetFormField.erBarnetFødt]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.stebarnsadopsjon]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.antallBarn]: undefined,
    [OmBarnetFormField.antallBarnAdoptert]: undefined,
    [OmBarnetFormField.fødselsdato]: undefined,
    [OmBarnetFormField.adoptertFødselsDato]: undefined,
    [OmBarnetFormField.adopsjonBekreftelse]: [],
    [OmBarnetFormField.adoptertFraUtland]: YesOrNo.UNANSWERED,
    [OmBarnetFormField.termindato]: undefined,
    [OmBarnetFormField.terminbekreftelse]: [],
    [OmBarnetFormField.terminbekreftelsedato]: undefined,
    [OmBarnetFormField.stebarnsadopsjondato]: undefined,
    [OmBarnetFormField.overtaomsorgdato]: undefined,
    [OmBarnetFormField.nårKommerBarnetDato]: undefined,
    [OmBarnetFormField.adopsjonsbevillingen]: [],
};

export const OmBarnetFormComponents = getTypedFormComponents<
    OmBarnetFormField | SøkersituasjonFormField,
    OmBarnetFormData
>();
