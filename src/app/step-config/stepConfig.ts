import { assertUnreachable } from 'app/util/globalUtil';

type SøkersituasjonId = 'søkersituasjon';
type OmBarnetStepId = 'omBarnet';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type OppsummeringStepId = 'oppsummering';

export type StepId = SøkersituasjonId | OmBarnetStepId | UtenlandsoppholdStepId | OppsummeringStepId;

interface StepConfig {
    id: StepId;
    index: number;
    label: string;
}

const stepConfig: StepConfig[] = [
    {
        id: 'søkersituasjon',
        index: 0,
        label: 'Fyll ut informasjon om valg',
    },
    {
        id: 'omBarnet',
        index: 1,
        label: 'Fyll ut informasjon om barnet',
    },
    {
        id: 'utenlandsopphold',
        index: 2,
        label: 'Fyll ut informasjon om utenlandsopphold',
    },
    {
        id: 'oppsummering',
        index: 3,
        label: 'Oppsummering',
    },
];

export const getPreviousStepHref = (id: StepId): string => {
    let href;

    switch (id) {
        case 'søkersituasjon':
            href = '/soknad/søkersituasjon';
            break;
        case 'omBarnet':
            href = '/soknad/søkersituasjon';
            break;
        case 'utenlandsopphold':
            href = '/soknad/om-barnet';
            break;
        case 'oppsummering':
            href = '/soknad/utenlandsopphold';
            break;
        default:
            return assertUnreachable(id);
    }
    return href;
};

export default stepConfig;
