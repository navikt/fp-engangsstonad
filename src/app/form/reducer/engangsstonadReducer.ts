import { EngangsstønadFormAction } from '../action/action';

const engangsstonadReducer = (state: any, action: EngangsstønadFormAction) => {
    switch (action.type) {
        case 'setOmBarnet': {
            return {
                ...state,
                omBarnet: action.payload,
            };
        }
        default:
            return state;
    }
};

export default engangsstonadReducer;
