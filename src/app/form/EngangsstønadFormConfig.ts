import { initialOmBarnetValues, OmBarnetFormData } from 'app/om-barnet/omBarnetFormConfig';
import {
    initialUtenlandsoppholdFormData,
    UtenlandsoppholdFormData,
} from 'app/utenlandsopphold/utenlandsoppholdFormTypes';
import { initialVelkommenValues, VelkommenFormData } from 'app/velkommen/velkommenFormConfig';

export type EngangsstønadFormData = {
    soknad: {
        velkommen: VelkommenFormData;
        omBarnet: OmBarnetFormData;
        utenlandsopphold: UtenlandsoppholdFormData;
    };
};

export const engangsstønadInitialState: EngangsstønadFormData = {
    soknad: {
        velkommen: initialVelkommenValues,
        omBarnet: initialOmBarnetValues,
        utenlandsopphold: initialUtenlandsoppholdFormData,
    },
};
