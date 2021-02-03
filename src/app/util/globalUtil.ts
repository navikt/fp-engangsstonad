import actionCreator, { EngangsstønadContextAction } from 'app/context/action/actionCreator';
import { History } from 'history';

export const assertUnreachable = (_x: never): never => {
    throw new Error('This should never happen');
};

export const onAvbrytSøknad = (dispatch: React.Dispatch<EngangsstønadContextAction>, history: History<any>) => {
    dispatch(actionCreator.avbrytSøknad());
    history.push('/');
};
