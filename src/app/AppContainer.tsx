import React from 'react';
import dayjs from 'dayjs';
import { getLocaleFromSessionStorage, Locale, setLocaleInSessionStorage } from '@navikt/fp-common';
import Engangsstønad from './Engangsstønad';
import EngangsstønadContextProvider from './context/EngangsstønadContext';

const localeFromSessionStorage = getLocaleFromSessionStorage();

dayjs.locale(localeFromSessionStorage);

const AppContainer = () => {
    const [locale, setLocale] = React.useState<Locale>(localeFromSessionStorage);

    return (
        <EngangsstønadContextProvider>
            <Engangsstønad
                locale={locale}
                onChangeLocale={(activeLocale: Locale) => {
                    setLocaleInSessionStorage(activeLocale);
                    setLocale(activeLocale);
                }}
            />
        </EngangsstønadContextProvider>
    );
};

export default AppContainer;
