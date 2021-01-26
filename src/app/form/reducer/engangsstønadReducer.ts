import { EngangsstønadFormAction, EngangsstønadFormActionKeys } from '../action/actionCreator';
import { EngangsstønadFormData } from '../EngangsstønadFormConfig';

const engangsstønadReducer = (state: EngangsstønadFormData, action: EngangsstønadFormAction): EngangsstønadFormData => {
    switch (action.type) {
        case EngangsstønadFormActionKeys.SET_VELKOMMEN: {
            return {
                ...state,
                soknad: {
                    velkommen: {
                        ...action.payload,
                    },
                    utenlandsopphold: {
                        ...state.soknad.utenlandsopphold,
                    },
                    omBarnet: {
                        ...state.soknad.omBarnet,
                    },
                },
            };
        }
        case EngangsstønadFormActionKeys.SET_OM_BARNET: {
            return {
                ...state,
                soknad: {
                    velkommen: {
                        ...state.soknad.velkommen,
                    },
                    utenlandsopphold: {
                        ...state.soknad.utenlandsopphold,
                    },
                    omBarnet: {
                        ...action.payload,
                    },
                },
            };
        }
        case EngangsstønadFormActionKeys.SET_UTENLANDSOPPHOLD: {
            return {
                ...state,
                soknad: {
                    velkommen: {
                        ...state.soknad.velkommen,
                    },
                    omBarnet: {
                        ...state.soknad.omBarnet,
                    },
                    utenlandsopphold: {
                        ...action.payload,
                    },
                },
            };
        }
        default:
            return state;
    }
};

export default engangsstønadReducer;
