import React, { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import {
    bemUtils,
    LanguageToggle,
    VelkommenBanner,
    intlUtils,
    Block,
    Locale,
    useDocumentTitle,
} from '@navikt/fp-common';
import Veiviser from 'components/veiviser/VeiviserSvg';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { lenker } from 'util/lenker';
import { initialVelkommenValues, VelkommenFormComponents, VelkommenFormField } from './velkommenFormConfig';
import { commonFieldErrorRenderer } from 'util/validation/validationUtils';
import { Hovedknapp } from 'nav-frontend-knapper';

import './velkommen.less';
import { useHistory } from 'react-router-dom';
import getMessage from 'common/util/i18nUtils';

interface Props {
    fornavn: string;
    onChangeLocale: (locale: Locale) => void;
    locale: Locale;
}

const Velkommen: FunctionComponent<Props> = ({ fornavn, locale, onChangeLocale }) => {
    const intl = useIntl();
    const bem = bemUtils('velkommen');
    const history = useHistory();
    const [, setIsPlikterModalOpen] = useState<boolean>(false);
    useDocumentTitle(intlUtils(intl, 'velkommen.standard.dokumenttittel'));

    const onValidSubmit = () => {
        history.push('/soknad/om-barnet');
    };

    const openPlikterModal = (e: React.SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        setIsPlikterModalOpen(true);
    };

    return (
        <VelkommenFormComponents.FormikWrapper
            initialValues={initialVelkommenValues}
            onSubmit={() => null}
            renderForm={() => {
                return (
                    <VelkommenFormComponents.Form
                        includeButtons={false}
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                        onValidSubmit={onValidSubmit}
                    >
                        <LanguageToggle
                            locale={locale}
                            availableLocales={['en', 'nb', 'nn']}
                            toggle={(l: Locale) => onChangeLocale(l)}
                        />
                        <VelkommenBanner
                            dialog={{
                                text: intlUtils(intl, 'velkommen.standard.bobletekst'),
                                title: intlUtils(intl, 'velkommen.standard.bobletittel', { name: fornavn }),
                            }}
                        />
                        <div className={bem.block}>
                            <Block padBottom="xl">
                                <div className={bem.element('tittel')}>
                                    <Innholdstittel>
                                        {intlUtils(intl, 'velkommen.standard.velkommentittel')}
                                    </Innholdstittel>
                                </div>
                            </Block>
                            <Block padBottom="xl">
                                <Ingress>{intlUtils(intl, 'velkommen.standard.ingress')}</Ingress>
                            </Block>
                            <Block padBottom="xl">
                                <Veilederpanel kompakt={true} svg={<Veiviser />}>
                                    <FormattedMessage id="velkommen.text.veiviser" />
                                    <br />
                                    <br />
                                    <FormattedMessage
                                        id="velkommen.text.veiviser.lenke"
                                        values={{
                                            a: (msg: any) => (
                                                <a
                                                    className="lenke"
                                                    rel="noopener noreferrer"
                                                    href={lenker.veiviser}
                                                    target="_blank"
                                                >
                                                    {msg}
                                                </a>
                                            ),
                                        }}
                                    />
                                </Veilederpanel>
                            </Block>
                            <Block padBottom="xl">
                                <VelkommenFormComponents.ConfirmationCheckbox
                                    name={VelkommenFormField.harForståttRettigheterOgPlikter}
                                    label={getMessage(intl, 'velkommen.text.samtykke')}
                                    validate={(value) => {
                                        let result;
                                        if (value !== true) {
                                            result = intlUtils(
                                                intl,
                                                'valideringsfeil.velkommen.bekreftLestOgForståttRettigheter'
                                            );
                                        }
                                        return result;
                                    }}
                                >
                                    <FormattedMessage
                                        id="velkommen.text.samtykkeIntro"
                                        values={{
                                            link: (
                                                <a className="lenke" href="#" onClick={(e) => openPlikterModal(e)}>
                                                    <FormattedMessage id="velkommen.text.samtykke.link" />
                                                </a>
                                            ),
                                        }}
                                    />
                                </VelkommenFormComponents.ConfirmationCheckbox>
                            </Block>
                            <div className={bem.element('startSøknadKnapp')}>
                                <Hovedknapp>{getMessage(intl, 'velkommen.button.startSøknad')}</Hovedknapp>
                            </div>
                        </div>
                    </VelkommenFormComponents.Form>
                );
            }}
        />
    );
};

export default Velkommen;
