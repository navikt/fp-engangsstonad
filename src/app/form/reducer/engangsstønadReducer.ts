import { EngangsstønadFormAction, EngangsstønadFormActionKeys } from '../action/actionCreator';
import { EngangsstønadFormData } from '../EngangsstønadFormConfig';

const engangsstønadReducer = (state: EngangsstønadFormData, action: EngangsstønadFormAction): EngangsstønadFormData => {
    switch (action.type) {
        case EngangsstønadFormActionKeys.SET_VELKOMMEN: {
            return {
                ...state,
                søknad: {
                    velkommen: {
                        ...action.payload,
                    },
                    utenlandsopphold: {
                        ...state.søknad.utenlandsopphold,
                    },
                    omBarnet: {
                        ...state.søknad.omBarnet,
                    },
                },
            };
        }
        case EngangsstønadFormActionKeys.SET_OM_BARNET: {
            return {
                ...state,
                søknad: {
                    velkommen: {
                        ...state.søknad.velkommen,
                    },
                    utenlandsopphold: {
                        ...state.søknad.utenlandsopphold,
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
                søknad: {
                    velkommen: {
                        ...state.søknad.velkommen,
                    },
                    omBarnet: {
                        ...state.søknad.omBarnet,
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
