import { OmBarnetFormData } from 'app/om-barnet/omBarnetFormConfig';
import { UtenlandsoppholdFormData } from 'app/utenlandsopphold/utenlandsoppholdFormTypes';
import { VelkommenFormData } from 'app/velkommen/velkommenFormConfig';

export enum EngangsstønadFormActionKeys {
    'SET_OM_BARNET' = 'setOmBarnet',
    'SET_UTENLANDSOPPHOLD' = 'setUtenlandsopphold',
    'SET_VELKOMMEN' = 'setVelkommen',
}

interface SetVelkommen {
    type: EngangsstønadFormActionKeys.SET_VELKOMMEN;
    payload: VelkommenFormData;
}

const setVelkommen = (payload: VelkommenFormData): SetVelkommen => ({
    type: EngangsstønadFormActionKeys.SET_VELKOMMEN,
    payload,
});

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

export type EngangsstønadFormAction = SetOmBarnet | SetUtenlandsopphold | SetVelkommen;

export default {
    setVelkommen,
    setOmBarnet,
    setUtenlandsopphold,
};
