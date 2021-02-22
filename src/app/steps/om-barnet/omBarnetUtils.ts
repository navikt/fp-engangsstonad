import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { OmBarnetFormData } from './omBarnetFormConfig';

export const cleanupOmBarnet = (formData: OmBarnetFormData): OmBarnetFormData => {
    const cleanedData: Partial<OmBarnetFormData> = {};
    cleanedData.erBarnetFødt = formData.erBarnetFødt;
    cleanedData.stebarnsadopsjon = formData.stebarnsadopsjon;
    cleanedData.antallBarn = formData.antallBarn;

    if (formData.erBarnetFødt === YesOrNo.YES) {
        cleanedData.fødselsdato = formData.fødselsdato;
    }
    if (formData.erBarnetFødt === YesOrNo.NO) {
        cleanedData.terminbekreftelse = formData.terminbekreftelse;
        cleanedData.terminbekreftelsedato = formData.terminbekreftelsedato;
        cleanedData.termindato = formData.termindato;
    }
    if (formData.stebarnsadopsjon === YesOrNo.YES) {
        cleanedData.adopsjonsdato = formData.adopsjonsdato;
        cleanedData.fødselsdato = formData.fødselsdato;
        cleanedData.adopsjonBekreftelse = formData.adopsjonBekreftelse;
    }
    if (formData.stebarnsadopsjon === YesOrNo.NO) {
        cleanedData.adopsjonsdato = formData.adopsjonsdato;
        cleanedData.fødselsdato = formData.fødselsdato;
        cleanedData.adoptertFraUtland = formData.adoptertFraUtland;
        cleanedData.nårKommerBarnetDato = formData.nårKommerBarnetDato;
        cleanedData.adopsjonsbevilling = formData.adopsjonsbevilling;
    }

    return cleanedData as OmBarnetFormData;
};

export const dataOmBarnetIsValid = (dataOmBarnet: OmBarnetFormData): boolean => {
    if (dataOmBarnet.erBarnetFødt === YesOrNo.YES) {
        return dataOmBarnet.antallBarn !== undefined && dataOmBarnet.fødselsdato !== undefined;
    }

    if (dataOmBarnet.erBarnetFødt === YesOrNo.NO) {
        return (
            dataOmBarnet.terminbekreftelse.length > 0 &&
            dataOmBarnet.terminbekreftelsedato !== undefined &&
            dataOmBarnet.termindato !== undefined
        );
    }

    if (dataOmBarnet.stebarnsadopsjon === YesOrNo.YES) {
        return dataOmBarnet.antallBarn !== undefined && dataOmBarnet.fødselsdato !== undefined;
    }
    if (dataOmBarnet.stebarnsadopsjon === YesOrNo.NO) {
        return dataOmBarnet.adopsjonsbevilling.length > 0;
    }

    return false;
};
