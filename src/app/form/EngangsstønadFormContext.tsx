import React, { useMemo } from 'react';
import { initialOmBarnetValues } from '../om-barnet/omBarnetFormConfig';
import { EngangsstønadFormAction } from './action/action';
import { EngangsstønadFormData } from './EngangsstønadFormConfig';
import engangsstonadReducer from './reducer/engangsstonadReducer';

const initialState: EngangsstønadFormData = {
    soknad: {
        omBarnet: initialOmBarnetValues,
    },
};

export const EngangsstønadFormContext = React.createContext<{
    state: EngangsstønadFormData;
    dispatch: React.Dispatch<EngangsstønadFormAction>;
}>({
    state: initialState,
    dispatch: (payload: EngangsstønadFormAction) => null,
});

interface Props {
    children: React.ReactNode;
}

const EngangsstønadFormContextProvider: React.FunctionComponent<Props> = ({ children }) => {
    const [state, dispatch] = React.useReducer(engangsstonadReducer, initialOmBarnetValues);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return (
        <EngangsstønadFormContext.Provider value={{ state: contextValue.state, dispatch: contextValue.dispatch }}>
            {children}
        </EngangsstønadFormContext.Provider>
    );
};

export default EngangsstønadFormContextProvider;
