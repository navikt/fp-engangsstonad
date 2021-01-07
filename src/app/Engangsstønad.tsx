import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import IntlProvider from 'intl/IntlProvider';
import Velkommen from './velkommen/Velkommen';
import { getRequest } from './api/apiHooks';
import Api from './api/api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Person from './types/domain/Person';

const AppContainer = () => {
    const { data, loading, error } = getRequest<Person>(Api.getPerson());

    if (loading || !data) {
        return <NavFrontendSpinner />;
    }

    if (error) {
        return <div>Shit crashed</div>;
    }

    return (
        <IntlProvider språkkode="nb">
            <Router>
                <Route path="/" component={() => <Velkommen fornavn={data.fornavn} />} />
            </Router>
        </IntlProvider>
    );
};

export default AppContainer;
