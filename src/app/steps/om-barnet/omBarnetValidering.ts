import {
    createFieldValidationError,
    erMindreEnn3UkerSiden,
    etterDagensDato,
    hasValue,
    sisteDatoBarnetKanVæreFødt,
    sisteMuligeTermindato,
    utstedtDatoErIUke22,
} from '@navikt/fp-common';
import dayjs from 'dayjs';

const ststeDatoAdoptertBarnKanVæreFødt = (dato: string) => {
    const sisteMuligeAdopsjonsFødselsDato = dayjs().subtract(15, 'year').subtract(6, 'month').startOf('day').toDate();
    return dayjs(dato).isBefore(sisteMuligeAdopsjonsFødselsDato);
};

export const validateAdopsjonDate = (dato: string) => {
    if (!hasValue(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.adopsjonDato.duMåOppgi');
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

export const validateAdopsjonFødselDate = (dato: string) => {
    if (!hasValue(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.fodselsdato.duMåOppgi');
    }
    if (etterDagensDato(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.fodselsdato.måVæreIdagEllerTidligere');
    }
    if (ststeDatoAdoptertBarnKanVæreFødt(dato)) {
        return createFieldValidationError('valideringsfeil.omBarnet.fodselsdato.ikkeMerEnn15Årog6MånederTilbake');
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
