import { assertUnreachable } from 'app/util/globalUtil';

type SøkersituasjonId = 'søkersituasjon';
type OmBarnetStepId = 'omBarnet';
type AnnenForelderStepId = 'annenForelder';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type OppsummeringStepId = 'oppsummering';

type StepIdWithBackHref = SøkersituasjonId | AnnenForelderStepId | UtenlandsoppholdStepId | OppsummeringStepId;

export type StepId = OmBarnetStepId | StepIdWithBackHref;

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
        index: 2,
        label: 'Fyll ut informasjon om barnet',
    },
    {
        id: 'annenForelder',
        index: 3,
        label: 'Fyll ut informasjon om annen forelder',
    },
    {
        id: 'utenlandsopphold',
        index: 4,
        label: 'Fyll ut informasjon om utenlandsopphold',
    },
    {
        id: 'oppsummering',
        index: 5,
        label: 'Oppsummering',
    },
];

export const getPreviousStepHref = (id: StepIdWithBackHref): string => {
    let href;

    switch (id) {
        case 'søkersituasjon':
            href = '/soknad/søkersituasjon';
            break;
        case 'annenForelder':
            href = '/soknad/om-barnet';
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
