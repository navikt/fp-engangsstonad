import {
    createFieldValidationError,
    erMindreEnn3UkerSiden,
    etterDagensDato,
    hasValue,
    sisteDatoBarnetKanVæreFødt,
    sisteMuligeTermindato,
    utstedtDatoErIUke22,
    barnetErMerEnn15årPåSøknadsDato,
    barnetErIkkeFødtFørAdopsjonsDato,
    sisteDatoAdoptertBarnKanVæreFødt,
    sisteMuligeDatoForOvertaOmsorg,
} from '@navikt/fp-common';

export const validateEktefellensBarnAdopsjonDate = (dato: string) => {
    if (!hasValue(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.adopsjonDato.ektefellensBarn.duMåOppgi');
    }
    if (sisteMuligeDatoForOvertaOmsorg(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.adopsjonDato.forLangtFremITid');
    }
    return undefined;
};

export const validateOvertaOmsorgAdopsjonDate = (dato: string) => {
    if (!hasValue(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.adopsjonDato.overtaOmsorg.duMåOppgi');
    }
    if (sisteMuligeDatoForOvertaOmsorg(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.adopsjonDato.forLangtFremITid');
    }
    return undefined;
};

export const validateNårKommerBarnetDate = (dato: string) => {
    if (!hasValue(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.nårKommerBarnetDato.duMåOppgi');
    }
    return undefined;
};

export const validateFødselDate = (dato: string) => {
    if (!hasValue(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.fodselsdato.duMåOppgi');
    }
    if (etterDagensDato(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.fodselsdato.måVæreIdagEllerTidligere');
    }
    if (sisteDatoBarnetKanVæreFødt(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.fodselsdato.ikkeMerEnn6MånederTilbake');
    }
    return undefined;
};

export const validateAdopsjonFødselDate = (dato: string | undefined, adopsjonsdato: string | undefined) => {
    if (!hasValue(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.fodselsdato.duMåOppgi');
    }
    if (!dato || !adopsjonsdato) {
        return undefined;
    }
    if (etterDagensDato(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.fodselsdato.måVæreIdagEllerTidligere');
    }
    if (!barnetErMerEnn15årPåSøknadsDato(dato, adopsjonsdato)) {
        if (sisteDatoAdoptertBarnKanVæreFødt(dato, adopsjonsdato)) {
            return createFieldValidationError('valideringsfeil.omBarnet.fodselsdato.ikkeMerEnn15ÅrTilbake');
        }
        if (barnetErIkkeFødtFørAdopsjonsDato(dato, adopsjonsdato)) {
            return createFieldValidationError('valideringsfeil.omBarnet.fødselsdato.barnetErIkkeFødtFørAdopsjonsDato');
        }
        return undefined;
    }
    return undefined;
};

export const validateTerminDate = (dato: string) => {
    if (!hasValue(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.termindato.duMåOppgi');
    }
    if (!erMindreEnn3UkerSiden(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.termindato.termindatoKanIkkeVære3UkerFraIdag');
    }
    if (sisteMuligeTermindato(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.termindato.duMåVæreIUke22');
    }
    return undefined;
};

export const valideringAvTerminbekreftelsesdato = (dato: string | undefined, termindato: string | undefined) => {
    if (!hasValue(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.terminbekreftelseDato.duMåOppgi');
    }
    if (!dato || !termindato) {
        return undefined;
    }
    if (etterDagensDato(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.terminbekreftelseDato.måVæreIdagEllerTidligere');
    }
    if (!utstedtDatoErIUke22(dato, termindato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.terminbekreftelseDato.duMåVæreIUke22');
    }
    return undefined;
};
