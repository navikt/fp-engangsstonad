import { createFieldValidationError, erMindreEnn3UkerSiden } from '@navikt/fp-common';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(minMax);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const seneredato = (dato: string) => {
    const today = dayjs();
    return dayjs(dato).isAfter(today);
};

const sisteDatoBarnetKanVæreFødt = (dato: string) => {
    const sixMonthsAgo = dayjs().subtract(6, 'month').startOf('day');
    return dayjs(dato).isBefore(sixMonthsAgo);
};

const sisteMuligeTermindato = (dato: string) => {
    const tjueuker = dayjs().add(20, 'week').startOf('day');
    return dayjs(dato).isAfter(tjueuker);
};

const sisteMulighetForTerminBekreftelse = (dato: string) => {
    const attenUker = dayjs().subtract(17, 'week').endOf('day');
    return dayjs(dato).isBefore(attenUker);
};

export const validateFødselDate = (dato: string) => {
    if (seneredato(dato)) {
        return createFieldValidationError('Barnet kan ikke være født enda');
    } else if (sisteDatoBarnetKanVæreFødt(dato)) {
        return createFieldValidationError('Søknads fristen på har godt ut');
    } else {
        return undefined;
    }
};

export const validateTerminDate = (dato: string) => {
    if (!erMindreEnn3UkerSiden(dato)) {
        return createFieldValidationError('Termin dato kan ikke være mindre en 3 uker etter dagen dato');
    } else if (sisteMuligeTermindato(dato)) {
        return createFieldValidationError('Du må vente med å søke til du er i 22 semester');
    } else {
        return undefined;
    }
};

export const valideringAvTerminbekreftelsesdato = (dato: string) => {
    if (seneredato(dato)) {
        return createFieldValidationError('Terminbekreftelsen kan ikke være frem i tid');
    } else if (sisteMulighetForTerminBekreftelse(dato)) {
        return createFieldValidationError('Terminbekreftelsen kan ikke være eldre enn 22 uker fra termin');
    } else {
        return undefined;
    }
};
