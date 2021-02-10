import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';

export enum AdopsjonOmBarnetFormField {
    stebarnsadopsjon = 'stebarnsadopsjon',
    stebarnsadopsjondato = 'stebarnsadopsjondato',
    overtaomsorgdato = 'overtaomsorgdato',
    antallBarnAdoptert = 'antallBarnAdoptert',
    fødselsdato = 'fødselsdato',
    terminbekreftelse = 'terminbekreftelse',
    stebarnsadopsjonbekreftelsedato = 'stebarnsadopsjonbekreftelsedato',
    nårKommerBarnetDato = 'nårKommerBarnetDato',
}

export interface AdopsjonOmBarnetFormData {
    [AdopsjonOmBarnetFormField.stebarnsadopsjon]: YesOrNo;
    [AdopsjonOmBarnetFormField.stebarnsadopsjondato]?: string;
    [AdopsjonOmBarnetFormField.overtaomsorgdato]?: string;
    [AdopsjonOmBarnetFormField.antallBarnAdoptert]?: string;
    [AdopsjonOmBarnetFormField.fødselsdato]?: string;
    [AdopsjonOmBarnetFormField.terminbekreftelse]: any[];
    [AdopsjonOmBarnetFormField.stebarnsadopsjonbekreftelsedato]?: string;
    [AdopsjonOmBarnetFormField.nårKommerBarnetDato]?: string;
}

export const initialAdopsjonOmBarnetValues: AdopsjonOmBarnetFormData = {
    [AdopsjonOmBarnetFormField.stebarnsadopsjon]: YesOrNo.UNANSWERED,
    [AdopsjonOmBarnetFormField.stebarnsadopsjondato]: undefined,
    [AdopsjonOmBarnetFormField.overtaomsorgdato]: undefined,
    [AdopsjonOmBarnetFormField.antallBarnAdoptert]: undefined,
    [AdopsjonOmBarnetFormField.fødselsdato]: undefined,
    [AdopsjonOmBarnetFormField.terminbekreftelse]: [],
    [AdopsjonOmBarnetFormField.stebarnsadopsjonbekreftelsedato]: undefined,
    [AdopsjonOmBarnetFormField.nårKommerBarnetDato]: undefined,
};

export const AdopsjonOmBarnetFormComponents = getTypedFormComponents<
    AdopsjonOmBarnetFormField,
    AdopsjonOmBarnetFormData
>();
