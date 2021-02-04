import { EngangsstønadContextAction, EngangsstønadContextActionKeys } from '../action/actionCreator';
import { EngangsstønadContextState, engangsstønadInitialState } from '../EngangsstønadContextConfig';

const engangsstønadReducer = (
    state: EngangsstønadContextState,
    action: EngangsstønadContextAction
): EngangsstønadContextState => {
    switch (action.type) {
        case EngangsstønadContextActionKeys.SET_VELKOMMEN: {
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
        case EngangsstønadContextActionKeys.SET_OM_BARNET: {
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
        case EngangsstønadContextActionKeys.SET_UTENLANDSOPPHOLD: {
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
        case EngangsstønadContextActionKeys.SET_KVITTERING: {
            return {
                ...state,
                kvittering: action.payload,
            };
        }
        case EngangsstønadContextActionKeys.AVBRYT_SØKNAD: {
            return {
                ...engangsstønadInitialState,
            };
        }
        default:
            return state;
    }
};

export default engangsstønadReducer;
