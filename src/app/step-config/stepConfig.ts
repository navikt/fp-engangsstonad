enum Step {
    'OM_BARNET' = 'omBarnet',
    'ANNEN_FORELDER' = 'annenForelder',
    'UTENLANDSOPPHOLD' = 'utenlandsopphold',
    'OPPSUMMERING' = 'oppsummering',
}

interface StepConfig {
    id: Step;
    index: number;
    label: string;
}

const stepConfig: StepConfig[] = [
    {
        id: Step.OM_BARNET,
        index: 0,
        label: 'Fyll ut informasjon om barnet',
    },
    {
        id: Step.ANNEN_FORELDER,
        index: 1,
        label: 'Fyll ut informasjon om annen forelder',
    },
    {
        id: Step.UTENLANDSOPPHOLD,
        index: 2,
        label: 'Fyll ut informasjon om utenlandsopphold',
    },
    {
        id: Step.OPPSUMMERING,
        index: 3,
        label: 'Oppsummering',
    },
];

export default stepConfig;
