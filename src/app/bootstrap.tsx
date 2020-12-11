import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import * as Sentry from '@sentry/browser';

import Engangsstønad from './Engangsstønad';
import IntlProvider from './intl/IntlProvider';

import * as countries from 'i18n-iso-countries';
import ErrorBoundary from './ErrorBoundary';
import ModalWrapper from 'nav-frontend-modal';
countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

ModalWrapper.setAppElement('#app');

if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
        dsn: 'https://e2de35941445465aae1e83fcbcc2934d@sentry.gc.nav.no/8',
        release: (window as any).APP_VERSION,
        environment: window.location.hostname,
        integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })],
    });
}

const root = document.getElementById('app');
render(
    <ErrorBoundary>
        <IntlProvider språkkode="nb">
            <Router>
                <Normaltekst tag="div">
                    <Engangsstønad />
                </Normaltekst>
            </Router>
        </IntlProvider>
    </ErrorBoundary>,
    root
);
