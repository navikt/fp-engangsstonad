import { bemUtils, intlUtils, Sidebanner, useDocumentTitle } from '@navikt/fp-common';
import Person from 'app/types/domain/Person';
import { lenker } from 'app/util/lenker';
import Lenke from 'nav-frontend-lenker';
import { Innholdstittel } from 'nav-frontend-typografi';
import React from 'react';
import { useIntl } from 'react-intl';

import './umyndig.less';

interface Props {
    person: Person;
}

const Umyndig: React.FunctionComponent<Props> = ({ person }) => {
    const bem = bemUtils('umyndig');
    const intl = useIntl();
    useDocumentTitle(intlUtils(intl, 'intro.standard.dokumenttittel'));

    return (
        <div className={bem.block}>
            <Sidebanner
                dialog={{
                    title: intlUtils(intl, 'intro.standard.bobletittel', {
                        name: person.fornavn.toLowerCase(),
                    }),
                    text: (
                        <div>
                            <div className={bem.element('info')}>{intlUtils(intl, 'intro.under18.bobletekst')}</div>
                            <Lenke href={lenker.papirsøknad}>{intlUtils(intl, 'intro.under18.boblelenketekst')}</Lenke>
                        </div>
                    ),
                }}
            />
            <div className={bem.element('content')}>
                <Innholdstittel>Søknad om Engangsstønad</Innholdstittel>
            </div>
        </div>
    );
};

export default Umyndig;
