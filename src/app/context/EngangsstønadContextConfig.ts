import { initialOmBarnetValues, OmBarnetFormData } from 'app/steps/om-barnet/omBarnetFormConfig';
import Kvittering from 'app/types/services/Kvittering';
import {
    initialUtenlandsoppholdFormData,
    UtenlandsoppholdFormData,
} from 'app/steps/utenlandsopphold/utenlandsoppholdFormTypes';
import { initialVelkommenValues, VelkommenFormData } from 'app/pages/velkommen/velkommenFormConfig';
import { initialSøkersituasjonValues, SøkersituasjonFormData } from 'app/steps/søkersituasjon/søkersituasjonFormConfig';
import { AdopsjonOmBarnetFormData, initialAdopsjonOmBarnetValues } from 'app/steps/adopsjon/adopsjonOmBarnetFormConfig';

export interface EngangsstønadContextState {
    søknad: {
        velkommen: VelkommenFormData;
        søkersituasjon: SøkersituasjonFormData;
        adopsjonOmBarnet: AdopsjonOmBarnetFormData;
        omBarnet: OmBarnetFormData;
        utenlandsopphold: UtenlandsoppholdFormData;
    };
    kvittering: Kvittering | undefined;
}

export const engangsstønadInitialState: EngangsstønadContextState = {
    søknad: {
        velkommen: initialVelkommenValues,
        søkersituasjon: initialSøkersituasjonValues,
        adopsjonOmBarnet: initialAdopsjonOmBarnetValues,
        omBarnet: initialOmBarnetValues,
        utenlandsopphold: initialUtenlandsoppholdFormData,
    },
    kvittering: undefined,
};
