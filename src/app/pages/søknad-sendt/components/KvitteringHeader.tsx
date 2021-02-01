import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Sidetittel, EtikettLiten } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import VedleggIkon from 'common/components/ikoner/VedleggIkon';
import Person from 'app/types/domain/Person';
import Kvittering from 'app/types/services/Kvittering';
import { bemUtils, Block } from '@navikt/fp-common';
import { openPdfPreview } from 'app/util/pdfUtils';
import SpotlightLetter from '../assets/SpotlightLetter';

import './kvitteringHeader.less';

interface Props {
    søker: Person;
    kvittering: Kvittering;
}

const KvitteringHeader: React.FunctionComponent<Props> = ({ søker, kvittering }) => {
    const { pdf, mottattDato } = kvittering;
    const bem = bemUtils('kvitteringHeader');

    return (
        <div className={bem.block}>
            <Block margin="m">
                <SpotlightLetter className={bem.element('spotlightLetter')} />
            </Block>

            <Block margin="l">
                <Sidetittel tag="h1">
                    <FormattedMessage
                        id="søknadSendt.tittel"
                        values={{
                            navn: `${søker.fornavn} ${søker.etternavn}`,
                        }}
                    />
                </Sidetittel>
            </Block>

            {pdf && (
                <Block margin="l">
                    <div className={bem.element('vedleggWrapper')}>
                        <VedleggIkon className={bem.element('vedleggIkon')} width={20} height={20} />
                        <Lenke
                            className={bem.element('vedleggLink')}
                            href={'#'}
                            onClick={(e) => {
                                e.preventDefault();
                                openPdfPreview(pdf);
                            }}
                        >
                            <FormattedMessage id={'søknadSendt.pdf'} />
                        </Lenke>
                    </div>
                </Block>
            )}

            <Block margin="l">
                <div className={bem.element('sendtInnTid')}>
                    <EtikettLiten>
                        <FormattedMessage id="søknadSendt.sendtInn" />
                        <span style={{ width: '0.25rem' }} />
                        {dayjs(mottattDato).format('D MMMM YYYY')}, kl. {dayjs(mottattDato).format('HH:mm')}
                    </EtikettLiten>
                </div>
            </Block>
        </div>
    );
};

export default KvitteringHeader;
