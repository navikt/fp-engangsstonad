import React, { FunctionComponent } from 'react';
import SimpleIllustration from 'components/simple-illustration/SimpleIllustration';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/fp-common/lib/utils/intlUtils';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import { bemUtils, LanguageToggle } from '@navikt/fp-common';

import './velkommen.less';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veiviser from 'components/veiviser/VeiviserSvg';

interface Props {
    fornavn: string;
}

const Velkommen: FunctionComponent<Props> = ({ fornavn }) => {
    const intl = useIntl();
    const bem = bemUtils('velkommen');

    return (
        <>
            <LanguageToggle locale="nb" availableLocales={['en', 'nb', 'nn']} toggle={() => null} />
            <SimpleIllustration
                dialog={{
                    text: intlHelper(intl, 'intro.standard.bobletekst'),
                    title: intlHelper(intl, 'intro.standard.bobletittel', { name: fornavn }),
                }}
            />
            <div className={bem.block}>
                <div className={bem.element('tittel')}>
                    <Innholdstittel>{intlHelper(intl, 'intro.standard.velkommentittel')}</Innholdstittel>
                </div>
                <Ingress>{intlHelper(intl, 'intro.standard.ingress')}</Ingress>
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
