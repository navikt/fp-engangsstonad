import { EngangsstønadFormAction, EngangsstønadFormActionKeys } from '../action/actionCreator';
import { EngangsstønadFormData } from '../EngangsstønadFormConfig';

const engangsstønadReducer = (state: EngangsstønadFormData, action: EngangsstønadFormAction): EngangsstønadFormData => {
    switch (action.type) {
        case EngangsstønadFormActionKeys.SET_OM_BARNET: {
            return {
                ...state,
                soknad: {
                    omBarnet: {
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
