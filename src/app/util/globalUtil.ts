export const assertUnreachable = (_x: never): never => {
    throw new Error('This should never happen');
};
