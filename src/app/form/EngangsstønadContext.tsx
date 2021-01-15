import React, { useContext, useMemo } from 'react';
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
    dispatch: React.Dispatch<EngangsstønadFormAction>;
}

const EngangsstønadContext = React.createContext<EngangsstønadContextData>(null!);

export const useEngangsstønadContext = () => useContext(EngangsstønadContext);

interface Props {
    children: React.ReactNode;
}

const EngangsstønadContextProvider: React.FunctionComponent<Props> = ({ children }) => {
    const [state, dispatch] = React.useReducer(engangsstønadReducer, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return <EngangsstønadContext.Provider value={contextValue}>{children}</EngangsstønadContext.Provider>;
};

export default EngangsstønadContextProvider;
