import React, { createContext, Dispatch, FunctionComponent, ReactNode, useContext, useMemo, useReducer } from 'react';
import { initialOmBarnetValues } from '../om-barnet/omBarnetFormConfig';
import { EngangsstønadFormAction } from './action/actionCreator';
import { EngangsstønadFormData } from './EngangsstønadFormConfig';
import engangsstønadReducer from './reducer/engangsstønadReducer';

const initialState: EngangsstønadFormData = {
    soknad: {
        omBarnet: initialOmBarnetValues,
    },
};

interface EngangsstønadContextData {
    state: EngangsstønadFormData;
    dispatch: Dispatch<EngangsstønadFormAction>;
}

const EngangsstønadContext = createContext<EngangsstønadContextData>(null!);

export const useEngangsstønadContext = () => useContext(EngangsstønadContext);

interface Props {
    children: ReactNode;
}

const EngangsstønadContextProvider: FunctionComponent<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(engangsstønadReducer, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return <EngangsstønadContext.Provider value={contextValue}>{children}</EngangsstønadContext.Provider>;
};

export default EngangsstønadContextProvider;
