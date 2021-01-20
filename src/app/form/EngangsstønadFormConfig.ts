import { initialOmBarnetValues, OmBarnetFormData } from 'app/om-barnet/omBarnetFormConfig';
import {
    initialUtenlandsoppholdFormData,
    UtenlandsoppholdFormData,
} from 'app/utenlandsopphold/utenlandsoppholdFormTypes';

export type EngangsstønadFormData = {
    soknad: {
        omBarnet: OmBarnetFormData;
        utenlandsopphold: UtenlandsoppholdFormData;
    };
};

export const engangsstønadInitialState: EngangsstønadFormData = {
    soknad: {
        omBarnet: initialOmBarnetValues,
        utenlandsopphold: initialUtenlandsoppholdFormData,
    },
};
