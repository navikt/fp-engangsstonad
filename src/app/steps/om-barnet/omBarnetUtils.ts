import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { OmBarnetFormData } from './omBarnetFormConfig';

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

    return false;
};
