import React from 'react';
import dayjs from 'dayjs';
import { getLocaleFromSessionStorage, Locale, setLocaleInSessionStorage } from '@navikt/fp-common';
import Engangsstønad from './Engangsstønad';

const localeFromSessionStorage = getLocaleFromSessionStorage();

dayjs.locale(localeFromSessionStorage);

const AppContainer = () => {
    const [locale, setLocale] = React.useState<Locale>(localeFromSessionStorage);

    return (
        <Engangsstønad
            locale={locale}
            onChangeLocale={(activeLocale: Locale) => {
                setLocaleInSessionStorage(activeLocale);
                setLocale(activeLocale);
            }}
        />
    );
};

export default AppContainer;
