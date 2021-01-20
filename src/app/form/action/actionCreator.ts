import { OmBarnetFormData } from 'app/om-barnet/omBarnetFormConfig';
import { UtenlandsoppholdFormData } from 'app/utenlandsopphold/utenlandsoppholdFormTypes';

export enum EngangsstønadFormActionKeys {
    'SET_OM_BARNET' = 'setOmBarnet',
    'SET_UTENLANDSOPPHOLD' = 'setUtenlandsopphold',
}

interface SetUtenlandsopphold {
    type: EngangsstønadFormActionKeys.SET_UTENLANDSOPPHOLD;
    payload: UtenlandsoppholdFormData;
}

const setUtenlandsopphold = (payload: UtenlandsoppholdFormData): SetUtenlandsopphold => ({
    type: EngangsstønadFormActionKeys.SET_UTENLANDSOPPHOLD,
    payload,
});

interface SetOmBarnet {
    type: EngangsstønadFormActionKeys.SET_OM_BARNET;
    payload: OmBarnetFormData;
}

const setOmBarnet = (payload: OmBarnetFormData): SetOmBarnet => ({
    type: EngangsstønadFormActionKeys.SET_OM_BARNET,
    payload,
});

export type EngangsstønadFormAction = SetOmBarnet | SetUtenlandsopphold;

export default {
    setOmBarnet,
    setUtenlandsopphold,
};
