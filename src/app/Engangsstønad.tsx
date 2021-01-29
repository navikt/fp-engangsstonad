import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import IntlProvider from 'intl/IntlProvider';
import Velkommen from './pages/velkommen/Velkommen';
import { useRequest } from './api/apiHooks';
import Api from './api/api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Person from './types/domain/Person';
import { Locale } from '@navikt/fp-common';
import OmBarnet from './steps/om-barnet/OmBarnet';
import Utenlandsopphold from './steps/utenlandsopphold/Utenlandsopphold';
import Oppsummering from './steps/oppsummering/Oppsummering';
import { useEngangsstønadContext } from './context/hooks/useEngangsstønadContext';
import { erMyndig } from './util/validation/validationUtils';
import Umyndig from './pages/umyndig/Umyndig';
import SøknadSendt from './pages/søknad-sendt/SøknadSendt';

interface Props {
    locale: Locale;
    onChangeLocale: (locale: Locale) => void;
}

const Engangsstønad: React.FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    const { data, loading, error } = useRequest<Person>(Api.getPerson());
    const { state } = useEngangsstønadContext();

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
            {!erMyndig(data) ? (
                <Umyndig person={data} />
            ) : (
                <Router>
                    <Route
                        path="/"
                        exact={true}
                        component={() => (
                            <Velkommen fornavn={data.fornavn} locale={locale} onChangeLocale={onChangeLocale} />
                        )}
                    />
                    {state.søknad.velkommen.harForståttRettigheterOgPlikter ? (
                        <Redirect to="/" exact={true} />
                    ) : (
                        <>
                            <Route path="/soknad/om-barnet" component={() => <OmBarnet />} />
                            <Route path="/soknad/utenlandsopphold" component={() => <Utenlandsopphold />} />
                            <Route
                                path="/soknad/oppsummering"
                                component={() => <Oppsummering person={data} locale={locale} />}
                            />
                        </>
                    )}
                    <Route path="/kvittering" component={() => <SøknadSendt person={data} />} />
                </Router>
            )}
        </IntlProvider>
    );
};

export default Engangsstønad;
