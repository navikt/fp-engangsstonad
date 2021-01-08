import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import IntlProvider from 'intl/IntlProvider';
import Velkommen from './velkommen/Velkommen';
import { getRequest } from './api/apiHooks';
import Api from './api/api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Person from './types/domain/Person';
import { Locale } from '@navikt/fp-common';

interface Props {
    locale: Locale;
    onChangeLocale: (locale: Locale) => void;
}

const Engangsstønad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const { data, loading, error } = getRequest<Person>(Api.getPerson());

    if (loading || !data) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <NavFrontendSpinner type="XXL" />
            </div>
        );
    }

    if (error) {
        return <div>Shit crashed</div>;
    }

    return (
        <IntlProvider språkkode={locale}>
            <Router>
                <Route
                    path="/"
                    component={() => (
                        <Velkommen fornavn={data.fornavn} locale={locale} onChangeLocale={onChangeLocale} />
                    )}
                />
            </Router>
        </IntlProvider>
    );
};

export default Engangsstønad;
