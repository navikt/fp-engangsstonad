import { DateRange, NavFrontendSkjemaFeil, YesOrNo } from '@navikt/sif-common-formik/lib';
import { BostedUtland } from 'app/steps/utenlandsopphold/bostedUtlandListAndDialog/types';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import Person from '../../types/domain/Person';
import isBetween from 'dayjs/plugin/isBetween';
import minMax from 'dayjs/plugin/minMax';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isBetween);
dayjs.extend(minMax);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const dateToday = dayjs().toDate();
export const date1YearFromNow = dayjs().add(1, 'years').toDate();
export const date1YearAgo = dayjs().subtract(1, 'years').toDate();

const ukerAaTrekkeFraTerminDato = 18;
const ekstraDagerAaTrekkeFraTerminDato = 3;
const dagerForTerminbekreftelse = ukerAaTrekkeFraTerminDato * 7 + ekstraDagerAaTrekkeFraTerminDato;

export const commonFieldErrorRenderer = (intl: IntlShape, error: any): NavFrontendSkjemaFeil => {
    if (typeof error === 'object' && error.key !== undefined) {
        return intl.formatMessage({ id: error.key }, error.values);
    }
    if (typeof error === 'string') {
        return error;
    }
    return error !== undefined;
};

export const erIUke22Pluss3 = (dato: string) => {
    const terminDato = dayjs(dato);
    const uke22Pluss3 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    return dayjs.max(dayjs().startOf('day'), uke22Pluss3.startOf('day')) === dayjs();
};

export const erMindreEnn3UkerSiden = (dato: string) => {
    const terminDato = dayjs(dato);
    const datoFor3UkerSiden = dayjs().startOf('day').subtract(21, 'days');
    return dayjs.max(terminDato, datoFor3UkerSiden) === terminDato;
};

export const utstedtDatoErIUke22 = (utstedtDatoString: string, terminDatoString: string) => {
    const utstedtDato = dayjs(utstedtDatoString).startOf('day');
    const terminDato = dayjs(terminDatoString).startOf('day');
    const uke22 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    return dayjs.max(uke22, utstedtDato).isSame(utstedtDato);
};

export const idagEllerTidligere = (dato: string) => {
    const utstedtDato = dayjs(dato).startOf('day');
    const tomorrow = dayjs().add(1, 'day').startOf('day');
    return dayjs.max(utstedtDato, tomorrow) === tomorrow;
};

export const erMyndig = (person: Person) => {
    const now = dayjs();
    const momentDate = dayjs(person.fødselsdato);
    return now.diff(momentDate, 'years') >= 18;
};

export const erMann = (person: Person) => person.kjønn === 'M';

export const getFørsteMuligeTermindato = () => dayjs().subtract(21, 'days').startOf('day').toDate();

/**
 * Siste mulige termindato ut fra dagens dato
 * - dato må bekrefte at bruker er minst i uke 22
 */
export const getSisteMuligeTermindato = () =>
    dayjs()
        .add(dagerForTerminbekreftelse - 1, 'days')
        .endOf('day')
        .toDate();

export const getForsteMuligeTerminbekreftesesdato = (termindato?: Date | string): Date => {
    return termindato
        ? dayjs(termindato)
              .subtract(dagerForTerminbekreftelse - 1, 'days')
              .toDate()
        : dayjs().subtract(1, 'years').startOf('day').toDate();
};

export const getSisteMuligeTerminbekreftesesdato = (termindato?: Date | string) =>
    dayjs(new Date()).endOf('day').toDate();

const prettyDateFormatExtended = 'DD. MMM YYYY';

export const prettifyDateExtended = (date: Date) => dayjs(date).format(prettyDateFormatExtended);

const dateIsWithinRange = (date: Date, minDate: Date, maxDate: Date) => {
    return dayjs(date).isBetween(minDate, maxDate, 'day', '[]');
};

const validateDateInRange = (date: Date | undefined, minDate: Date, maxDate: Date, isFomDate: boolean) => {
    if (date === undefined) {
        if (isFomDate) {
            return {
                key: 'valideringsfeil.fraOgMedDato.gyldigDato',
            };
        }
        return {
            key: 'valideringsfeil.tilOgMedDato.gyldigDato',
        };
    }

    if (!dateIsWithinRange(date, minDate, maxDate)) {
        return {
            key: 'valideringsfeil.dateOutsideRange',
            values: {
                fom: prettifyDateExtended(minDate),
                tom: prettifyDateExtended(maxDate),
            },
        };
    }

    return undefined;
};

const validateFromDate = (date: Date | undefined, minDate: Date, maxDate: Date, toDate?: Date) => {
    const error = validateDateInRange(date, minDate, maxDate, true);
    if (error !== undefined) {
        return error;
    }
    if (toDate && dayjs(date).isAfter(toDate, 'day')) {
        return {
            key: 'valideringsfeil.utenlandsopphold.førTilDato',
        };
    }
    return undefined;
};

const validateToDate = (date: Date | undefined, minDate: Date, maxDate: Date, fromDate?: Date) => {
    const error = validateDateInRange(date, minDate, maxDate, false);
    if (error !== undefined) {
        return error;
    }
    if (fromDate && dayjs(date).isBefore(fromDate, 'day')) {
        return {
            key: 'valideringsfeil.utenlandsopphold.etterFraDato',
        };
    }
    return undefined;
};

export const dateRangeValidation = {
    validateToDate,
    validateFromDate,
};

export const sortDateRange = (d1: DateRange, d2: DateRange): number => {
    if (dayjs(d1.from).isSameOrBefore(d2.from)) {
        return -1;
    }
    return 1;
};

export const dateRangesCollide = (ranges: DateRange[]): boolean => {
    if (ranges.length > 0) {
        const sortedDates = ranges.sort(sortDateRange);
        const hasOverlap = ranges.find((d, idx) => {
            if (idx < sortedDates.length - 1) {
                return dayjs(d.to).isSameOrAfter(sortedDates[idx + 1].from);
            }
            return false;
        });
        return hasOverlap !== undefined;
    }
    return false;
};

export const dateRangesExceedsRange = (ranges: DateRange[], allowedRange: DateRange): boolean => {
    if (ranges.length === 0) {
        return false;
    }
    const sortedRanges = ranges.sort(sortDateRange);
    const from = sortedRanges[0].from;
    const to = sortedRanges[sortedRanges.length - 1].to;

    if (
        !dayjs(from).isBetween(allowedRange.from, allowedRange.to, 'day', '[]') ||
        !dayjs(to).isBetween(allowedRange.from, allowedRange.to, 'day', '[]')
    ) {
        return true;
    }
    return false;
};

export const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

export const fieldIsRequiredError = (errorMsg = 'påkrevd') => createFieldValidationError(errorMsg);

export type SkjemaelementFeil = React.ReactNode | boolean;

export const validateRequiredField = (value: any, errorMsg = 'påkrevd'): SkjemaelementFeil => {
    if (!hasValue(value)) {
        return fieldIsRequiredError(errorMsg);
    }
    return undefined;
};

export const createFieldValidationError = <T extends string>(key: T | undefined, values?: any): SkjemaelementFeil => {
    return key
        ? {
              key,
              values,
          }
        : undefined;
};

interface ItemWithFom {
    fom: string;
}

export interface OpenDateRange {
    from: Date;
    to?: Date;
}

export const sortOpenDateRange = (d1: OpenDateRange, d2: OpenDateRange): number => {
    if (dayjs(d1.from).isSameOrBefore(d2.from)) {
        return -1;
    }
    return 1;
};

export const sortItemsByFom = (a: ItemWithFom, b: ItemWithFom) =>
    sortOpenDateRange({ from: dayjs(a.fom).toDate() }, { from: dayjs(b.fom).toDate() });

export const validateYesOrNoIsAnswered = (answer: YesOrNo, errorIntlKey?: string): SkjemaelementFeil => {
    if (answer === YesOrNo.UNANSWERED || answer === undefined) {
        return fieldIsRequiredError(errorIntlKey);
    }
    return undefined;
};

export const validateUtenlandsoppholdSiste12Mnd = (utenlandsopphold: BostedUtland[]): SkjemaelementFeil => {
    if (utenlandsopphold.length === 0) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold.siste12Måneder.ikkeRegistrert');
    }

    const dateRanges = utenlandsopphold.map((u) => ({ from: dayjs(u.fom).toDate(), to: dayjs(u.tom).toDate() }));

    if (dateRangesCollide(dateRanges)) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold.overlapp');
    }
    if (dateRangesExceedsRange(dateRanges, { from: date1YearAgo, to: new Date() })) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold_utenfor_periode');
    }

    return undefined;
};

export const validateUtenlandsoppholdNeste12Mnd = (utenlandsopphold: BostedUtland[]): SkjemaelementFeil => {
    if (utenlandsopphold.length === 0) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold.neste12Måneder.ikkeRegistrert');
    }

    const dateRanges = utenlandsopphold.map((u) => ({ from: dayjs(u.fom).toDate(), to: dayjs(u.tom).toDate() }));

    if (dateRangesCollide(dateRanges)) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold.overlapp');
    }
    if (dateRangesExceedsRange(dateRanges, { from: new Date(), to: date1YearFromNow })) {
        return createFieldValidationError('valideringsfeil.utenlandsopphold_utenfor_periode');
    }
    return undefined;
};
