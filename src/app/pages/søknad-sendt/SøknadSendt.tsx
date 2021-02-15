import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { bemUtils, Block, intlUtils, useDocumentTitle } from '@navikt/fp-common';
import { EtikettLiten, Ingress, Normaltekst } from 'nav-frontend-typografi';
import KvitteringHeader from './components/KvitteringHeader';
import StatusBoks from './components/StatusBoks';
import Person from 'app/types/domain/Person';
import { FormattedMessage, useIntl } from 'react-intl';
import { lenker } from 'app/util/lenker';
// import { useEngangsstønadContext } from 'app/context/hooks/useEngangsstønadContext';
import KvitteringSuksess from './components/KvitteringSuksess';
import SøknadSendtSectionHeader from './components/SøknadSendtSectionHeader';

import './søknadSendt.less';
import SøknadSendtTittel from './components/SøknadtSendtTittel';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import { PageKeys } from 'app/types/PageKeys';

interface Props {
    person: Person;
}

const person: Person = {
    fnr: '123123123',
    fornavn: 'Henrikke',
    mellomnavn: 'Store',
    etternavn: 'Ibsen',
    adresse: 'Maridalsveien 227B',
    kjønn: 'K',
    fødselsdato: '01-01-2020',
    ikkeNordiskEøsLand: false,
    bankkonto: {
        kontonummer: '49875234987',
        banknavn: 'Storebank',
    },
};

const kvittering = {
    journalId: 'Journal ID 123123',
    leveranseStatus: 'PÅ_VENT',
    mottattDato: '01-29-2021',
    referanseId: 'Referanse ID 12785',
    saksNr: '340983405',
    pdf: 'gibberish',
};

const SøknadSendt: React.FunctionComponent<Props> = () => {
    const bem = bemUtils('søknadSendt');
    const intl = useIntl();
    useDocumentTitle(intlUtils(intl, 'søknadSendt.dokumenttittel'));

    logAmplitudeEvent('sidevisning', {
        app: 'engangsstonadny',
        team: 'foreldrepenger',
        pageKey: PageKeys.SøknadSendt,
    });

    return (
        <>
            <SøknadSendtTittel />
            <div className={bem.block}>
                <KvitteringHeader søker={person} kvittering={kvittering} />
                <Block margin="xl">
                    <KvitteringSuksess />
                </Block>
                <Block margin="l">
                    <SøknadSendtSectionHeader
                        title={intlUtils(intl, 'søknadSendt.pengene.tittel')}
                        type="cash"
                        info={intlUtils(intl, 'søknadSendt.pengene.infoBox')}
                        apneLabel={intlUtils(intl, 'søknadSendt.pengene.apneLabel')}
                    >
                        {person.bankkonto && person.bankkonto.kontonummer ? (
                            <>
                                <Block margin="none">
                                    <EtikettLiten>
                                        <FormattedMessage id="søknadSendt.pengene.kontonummer" />
                                    </EtikettLiten>
                                </Block>
                                <Block margin="s">
                                    <Ingress>{person.bankkonto && person.bankkonto.kontonummer}</Ingress>
                                </Block>
                                <Block margin="none">
                                    <Lenke href={lenker.brukerprofil}>
                                        <FormattedMessage id="søknadSendt.pengene.kontonummer.endre" />
                                    </Lenke>
                                </Block>
                            </>
                        ) : (
                            <>
                                <Block margin="s">
                                    <Normaltekst>
                                        <FormattedMessage id="søknadSendt.pengene.ingenKontonummer" />
                                    </Normaltekst>
                                </Block>
                                <Block margin="none">
                                    <Lenke href={lenker.brukerprofil}>
                                        <FormattedMessage id="søknadSendt.pengene.kontonummer.leggTil" />
                                    </Lenke>
                                </Block>
                            </>
                        )}
                    </SøknadSendtSectionHeader>
                </Block>
                <Block margin="l">
                    <StatusBoks saksNr={kvittering.saksNr} />
                </Block>
            </div>
        </>
    );
};

export default SøknadSendt;
