import { initialOmBarnetValues, OmBarnetFormData } from 'app/steps/om-barnet/omBarnetFormConfig';
import Kvittering from 'app/types/services/Kvittering';
import {
    initialUtenlandsoppholdFormData,
    UtenlandsoppholdFormData,
} from 'app/steps/utenlandsopphold/utenlandsoppholdFormTypes';
import { initialVelkommenValues, VelkommenFormData } from 'app/pages/velkommen/velkommenFormConfig';

export interface EngangsstønadContextState {
    søknad: {
        velkommen: VelkommenFormData;
        omBarnet: OmBarnetFormData;
        utenlandsopphold: UtenlandsoppholdFormData;
    };
    kvittering: Kvittering | undefined;
}

export const engangsstønadInitialState: EngangsstønadContextState = {
    søknad: {
        velkommen: initialVelkommenValues,
        omBarnet: initialOmBarnetValues,
        utenlandsopphold: initialUtenlandsoppholdFormData,
    },
    kvittering: undefined,
};
