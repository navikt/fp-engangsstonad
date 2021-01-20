import { assertUnreachable } from 'app/util/globalUtil';

type OmBarnetStepId = 'omBarnet';
type AnnenForelderStepId = 'annenForelder';
type UtenlandsoppholdStepId = 'utenlandsopphold';
type OppsummeringStepId = 'oppsummering';

type StepIdWithBackHref = AnnenForelderStepId | UtenlandsoppholdStepId | OppsummeringStepId;

export type StepId = OmBarnetStepId | StepIdWithBackHref;

interface StepConfig {
    id: StepId;
    index: number;
    label: string;
}

const stepConfig: StepConfig[] = [
    {
        id: 'omBarnet',
        index: 0,
        label: 'Fyll ut informasjon om barnet',
    },
    {
        id: 'annenForelder',
        index: 1,
        label: 'Fyll ut informasjon om annen forelder',
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

export const getPreviousStepHref = (id: StepIdWithBackHref): string => {
    let href;

    switch (id) {
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
