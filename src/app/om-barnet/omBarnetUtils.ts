import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { OmBarnetFormData } from './omBarnetFormConfig';

export const getOmBarnetInitialValues = (formData: OmBarnetFormData): OmBarnetFormData => {
    return {
        erBarnetFødt: formData.erBarnetFødt,
        terminbekreftelse: formData.terminbekreftelse,
        antallBarn: formData.antallBarn,
        fødselsdato: formData.fødselsdato,
        terminbekreftelsedato: formData.terminbekreftelsedato,
        termindato: formData.termindato,
    };
};

export const cleanupOmBarnet = (formData: OmBarnetFormData): OmBarnetFormData => {
    const cleanedData: Partial<OmBarnetFormData> = {};
    cleanedData.erBarnetFødt = formData.erBarnetFødt;
    cleanedData.antallBarn = formData.antallBarn;

    if (formData.erBarnetFødt === YesOrNo.YES) {
        cleanedData.fødselsdato = formData.fødselsdato;
    } else {
        cleanedData.terminbekreftelse = formData.terminbekreftelse;
        cleanedData.terminbekreftelsedato = formData.terminbekreftelsedato;
        cleanedData.termindato = formData.termindato;
    }

    return cleanedData as OmBarnetFormData;
};
