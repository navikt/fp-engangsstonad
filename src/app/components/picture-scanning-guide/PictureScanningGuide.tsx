import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import getMessage from 'common/util/i18nUtils';
import PictureScanningExample from './PictureScanningExample';
import ScanningIkon from 'components/scanning-ikon/ScanningIkon';

import './pictureScanningGuide.less';

const bem = BEMHelper('pictureScanningGuide');

const PictureScanningGuide = () => {
    const intl = useIntl();
    const svgIconHeight = 100;
    return (
        <div className={bem.className}>
            <Systemtittel className={bem.element('title')}>
                <FormattedMessage id="taBildeAvVedlegg.innholdstittel" />
            </Systemtittel>

            <Undertittel className={bem.element('title')}>
                <FormattedMessage id="taBildeAvVedlegg.section1.tittel" />
            </Undertittel>
            <ul>
                <FormattedMessage tagName="li" id="taBildeAvVedlegg.section1.liste.punkt1" />
                <FormattedMessage
                    tagName="li"
                    id="taBildeAvVedlegg.section1.liste.punkt2"
                    values={{
                        i: (msg: any) => <i>{msg}</i>,
                    }}
                />
                <FormattedMessage tagName="li" id="taBildeAvVedlegg.section1.liste.punkt3" />
            </ul>
            <Undertittel className={bem.element('title')}>
                <FormattedMessage id="taBildeAvVedlegg.section2.tittel" />
            </Undertittel>
            <ul>
                <FormattedMessage tagName="li" id="taBildeAvVedlegg.section2.liste.punkt1" />
                <FormattedMessage tagName="li" id="taBildeAvVedlegg.section2.liste.punkt2" />
                <FormattedMessage tagName="li" id="taBildeAvVedlegg.section2.liste.punkt3" />
            </ul>
            <div className={bem.element('examples')}>
                <Undertittel tag="h3" className={bem.element('title')}>
                    <FormattedMessage id="taBildeAvVedlegg.icon.heading" />
                </Undertittel>
                <div className={bem.element('body')}>
                    <div className={bem.element('cell')}>
                        <PictureScanningExample
                            image={<ScanningIkon status="good" height={svgIconHeight} />}
                            status="suksess"
                            statusText={getMessage(intl, 'taBildeAvVedlegg.good')}
                            description={getMessage(intl, 'taBildeAvVedlegg.icon.label.good')}
                        />
                    </div>
                    <div className={bem.element('cell')}>
                        <PictureScanningExample
                            image={<ScanningIkon status="keystone" height={svgIconHeight} />}
                            status="feil"
                            statusText={getMessage(intl, 'taBildeAvVedlegg.bad')}
                            description={getMessage(intl, 'taBildeAvVedlegg.icon.label.keystone')}
                        />
                    </div>
                    <div className={bem.element('cell')}>
                        <PictureScanningExample
                            image={<ScanningIkon status="horizontal" height={svgIconHeight} />}
                            status="feil"
                            statusText={getMessage(intl, 'taBildeAvVedlegg.bad')}
                            description={getMessage(intl, 'taBildeAvVedlegg.icon.label.horizontal')}
                        />
                    </div>
                    <div className={bem.element('cell')}>
                        <PictureScanningExample
                            image={<ScanningIkon status="shadow" height={svgIconHeight} />}
                            status="feil"
                            statusText={getMessage(intl, 'taBildeAvVedlegg.bad')}
                            description={getMessage(intl, 'taBildeAvVedlegg.icon.label.shadow')}
                        />
                    </div>
                </div>
                <Lenke target="_blank" href={getMessage(intl, 'taBildeAvVedlegg.lenkepanel.url')}>
                    <FormattedMessage id="taBildeAvVedlegg.lenkepanel.text" />
                </Lenke>
            </div>
        </div>
    );
};
export default PictureScanningGuide;
