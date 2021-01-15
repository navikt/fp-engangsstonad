import { OmBarnetFormData } from 'app/om-barnet/omBarnetFormConfig';

export enum EngangsstønadFormActionKeys {
    'SET_OM_BARNET' = 'setOmBarnet',
}

interface SetOmBarnet {
    type: EngangsstønadFormActionKeys.SET_OM_BARNET;
    payload: OmBarnetFormData;
}

const setOmBarnet = (payload: OmBarnetFormData): SetOmBarnet => ({
    type: EngangsstønadFormActionKeys.SET_OM_BARNET,
    payload,
});

export type EngangsstønadFormAction = SetOmBarnet;

export default {
    setOmBarnet,
};
