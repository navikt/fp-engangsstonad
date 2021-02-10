import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { AdopsjonOmBarnetFormData } from './adopsjonOmBarnetFormConfig';

export const cleanupAdopsjonOmBarnet = (formData: AdopsjonOmBarnetFormData): AdopsjonOmBarnetFormData => {
    const cleanedData: Partial<AdopsjonOmBarnetFormData> = {};
    cleanedData.stebarnsadopsjon = formData.stebarnsadopsjon;
    cleanedData.antallBarnAdoptert = formData.antallBarnAdoptert;

    if (formData.stebarnsadopsjon === YesOrNo.YES) {
        cleanedData.stebarnsadopsjon = formData.stebarnsadopsjon;
    } else {
        cleanedData.terminbekreftelse = formData.terminbekreftelse;
        cleanedData.stebarnsadopsjonbekreftelsedato = formData.stebarnsadopsjonbekreftelsedato;
        cleanedData.stebarnsadopsjondato = formData.stebarnsadopsjondato;
    }

    return cleanedData as AdopsjonOmBarnetFormData;
};

export const dataAdopsjonOmBarnetIsValid = (dataAdopsjonOmBarnet: AdopsjonOmBarnetFormData): boolean => {
    if (dataAdopsjonOmBarnet.stebarnsadopsjon === YesOrNo.YES) {
        return dataAdopsjonOmBarnet.antallBarnAdoptert !== undefined && dataAdopsjonOmBarnet.fødselsdato !== undefined;
    }

    if (dataAdopsjonOmBarnet.stebarnsadopsjon === YesOrNo.NO) {
        return (
            dataAdopsjonOmBarnet.terminbekreftelse.length > 0 &&
            dataAdopsjonOmBarnet.stebarnsadopsjonbekreftelsedato !== undefined &&
            dataAdopsjonOmBarnet.stebarnsadopsjondato !== undefined
        );
    }

    return false;
};
