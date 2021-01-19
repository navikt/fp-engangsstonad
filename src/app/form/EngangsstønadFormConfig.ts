import { OmBarnetFormData } from 'app/om-barnet/omBarnetFormConfig';
import { UtenlandsoppholdFormData } from 'app/utenlandsopphold/utenlandsoppholdFormTypes';

export type EngangsstønadFormData = {
    soknad: {
        omBarnet: OmBarnetFormData;
        utenlandsopphold: UtenlandsoppholdFormData;
    };
};
