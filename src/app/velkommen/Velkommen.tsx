import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import { bemUtils, LanguageToggle, VelkommenBanner, intlUtils } from '@navikt/fp-common';
import Veiviser from 'components/veiviser/VeiviserSvg';
import Veilederpanel from 'nav-frontend-veilederpanel';

import './velkommen.less';

interface Props {
    fornavn: string;
}

const Velkommen: FunctionComponent<Props> = ({ fornavn }) => {
    const intl = useIntl();
    const bem = bemUtils('velkommen');

    return (
        <>
            <LanguageToggle locale="nb" availableLocales={['en', 'nb', 'nn']} toggle={() => null} />
            <VelkommenBanner
                dialog={{
                    text: intlUtils(intl, 'intro.standard.bobletekst'),
                    title: intlUtils(intl, 'intro.standard.bobletittel', { name: fornavn }),
                }}
            />
            <div className={bem.block}>
                <div className={bem.element('tittel')}>
                    <Innholdstittel>{intlUtils(intl, 'intro.standard.velkommentittel')}</Innholdstittel>
                </div>
                <Ingress>{intlUtils(intl, 'intro.standard.ingress')}</Ingress>
                <Veilederpanel kompakt={true} svg={<Veiviser />}>
                    <FormattedMessage id="intro.text.veiviser" />
                    <br />
                    <br />
                    <FormattedMessage
                        id="intro.text.veiviser.lenke"
                        values={{
                            a: (msg: any) => (
                                <a
                                    className="lenke"
                                    rel="noopener noreferrer"
                                    href="https://familie.nav.no/veiviser"
                                    target="_blank"
                                >
                                    {msg}
                                </a>
                            ),
                        }}
                    />
                </Veilederpanel>
            </div>
        </>
    );
};

export default Velkommen;