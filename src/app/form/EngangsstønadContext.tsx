import React, { createContext, Dispatch, FunctionComponent, ReactNode, useMemo, useReducer } from 'react';
import { EngangsstønadFormAction } from './action/actionCreator';
import { EngangsstønadFormData, engangsstønadInitialState } from './EngangsstønadFormConfig';
import engangsstønadReducer from './reducer/engangsstønadReducer';

interface EngangsstønadContextData {
    state: EngangsstønadFormData;
    dispatch: Dispatch<EngangsstønadFormAction>;
}

export const EngangsstønadContext = createContext<EngangsstønadContextData>(null!);

interface Props {
    children: ReactNode;
}

const EngangsstønadContextProvider: FunctionComponent<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(engangsstønadReducer, engangsstønadInitialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return <EngangsstønadContext.Provider value={contextValue}>{children}</EngangsstønadContext.Provider>;
};

export default EngangsstønadContextProvider;
