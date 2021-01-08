import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import { bemUtils, LanguageToggle, VelkommenBanner, intlUtils, Block, Locale } from '@navikt/fp-common';
import Veiviser from 'components/veiviser/VeiviserSvg';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { lenker } from 'util/lenker';
import { initialVelkommenValues, VelkommenFormComponents, VelkommenFormField } from './velkommenFormConfig';
import { commonFieldErrorRenderer } from 'util/validation/validationUtils';
import { Hovedknapp } from 'nav-frontend-knapper';

import './velkommen.less';

interface Props {
    fornavn: string;
    onChangeLocale: (locale: Locale) => void;
    locale: Locale;
}

const Velkommen: FunctionComponent<Props> = ({ fornavn, locale, onChangeLocale }) => {
    const intl = useIntl();
    const bem = bemUtils('velkommen');

    return (
        <VelkommenFormComponents.FormikWrapper
            initialValues={initialVelkommenValues}
            onSubmit={() => null}
            renderForm={() => {
                return (
                    <VelkommenFormComponents.Form
                        includeButtons={false}
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                    >
                        <LanguageToggle
                            locale={locale}
                            availableLocales={['en', 'nb', 'nn']}
                            toggle={(l: Locale) => onChangeLocale(l)}
                        />
                        <VelkommenBanner
                            dialog={{
                                text: intlUtils(intl, 'intro.standard.bobletekst'),
                                title: intlUtils(intl, 'intro.standard.bobletittel', { name: fornavn }),
                            }}
                        />
                        <div className={bem.block}>
                            <Block padBottom="xl">
                                <div className={bem.element('tittel')}>
                                    <Innholdstittel>{intlUtils(intl, 'intro.standard.velkommentittel')}</Innholdstittel>
                                </div>
                            </Block>
                            <Block padBottom="xl">
                                <Ingress>{intlUtils(intl, 'intro.standard.ingress')}</Ingress>
                            </Block>
                            <Block padBottom="xl">
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
                                    label="Whatever"
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
                                />
                            </Block>
                            <div className={bem.element('startSøknadKnapp')}>
                                <Hovedknapp>Gå videre</Hovedknapp>
                            </div>
                        </div>
                    </VelkommenFormComponents.Form>
                );
            }}
        />
    );
};

export default Velkommen;
