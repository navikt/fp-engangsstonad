import BEMHelper from 'common/util/bem';
import { LanguageToggle } from '@navikt/fp-common';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import IntlProvider from 'intl/IntlProvider';

import './styles/engangsstonad.less';

const AppContainer = () => {
    const bem = BEMHelper('engangsstonad');

    return (
        <IntlProvider språkkode="nb">
            <Router>
                <LanguageToggle locale="nb" availableLocales={['en', 'nb', 'nn']} toggle={() => null} />
                <div className={bem.className}>Hello world</div>
            </Router>
        </IntlProvider>
    );
};

export default AppContainer;
