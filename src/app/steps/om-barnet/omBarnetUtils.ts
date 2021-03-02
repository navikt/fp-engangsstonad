import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { OmBarnetFormData } from './omBarnetFormConfig';

export const cleanupOmBarnet = (formData: OmBarnetFormData): OmBarnetFormData => {
    const cleanedData: Partial<OmBarnetFormData> = {};
    cleanedData.antallBarn = undefined;
    cleanedData.erBarnetFødt = YesOrNo.UNANSWERED;
    cleanedData.stebarnsadopsjon = YesOrNo.UNANSWERED;
    cleanedData.adoptertFraUtland = YesOrNo.UNANSWERED;

    if (formData.erBarnetFødt === YesOrNo.YES) {
        cleanedData.antallBarn = formData.antallBarn;
        cleanedData.fødselsdatoer = formData.fødselsdatoer;
        cleanedData.erBarnetFødt = formData.erBarnetFødt;
    }
    if (formData.erBarnetFødt === YesOrNo.NO) {
        cleanedData.antallBarn = formData.antallBarn;
        cleanedData.erBarnetFødt = formData.erBarnetFødt;
        cleanedData.terminbekreftelse = formData.terminbekreftelse;
        cleanedData.terminbekreftelsedato = formData.terminbekreftelsedato;
        cleanedData.termindato = formData.termindato;
    }
    if (formData.stebarnsadopsjon === YesOrNo.YES) {
        cleanedData.antallBarn = formData.antallBarn;
        cleanedData.adopsjonsdato = formData.adopsjonsdato;
        cleanedData.fødselsdatoer = formData.fødselsdatoer;
        cleanedData.adopsjonBekreftelse = formData.adopsjonBekreftelse;
        cleanedData.stebarnsadopsjon = formData.stebarnsadopsjon;
    }
    if (formData.stebarnsadopsjon === YesOrNo.NO) {
        cleanedData.antallBarn = formData.antallBarn;
        cleanedData.adopsjonsdato = formData.adopsjonsdato;
        cleanedData.fødselsdatoer = formData.fødselsdatoer;
        cleanedData.adoptertFraUtland = formData.adoptertFraUtland;
        cleanedData.nårKommerBarnetDato = formData.nårKommerBarnetDato;
        cleanedData.adopsjonsbevilling = formData.adopsjonsbevilling;
        cleanedData.stebarnsadopsjon = formData.stebarnsadopsjon;
    }
    return cleanedData as OmBarnetFormData;
};
