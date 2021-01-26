import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import { bemUtils, LanguageToggle, intlUtils, Block, Locale, useDocumentTitle, Sidebanner } from '@navikt/fp-common';
import Veiviser from 'components/veiviser/VeiviserSvg';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { lenker } from 'util/lenker';
import {
    initialVelkommenValues,
    VelkommenFormComponents,
    VelkommenFormData,
    VelkommenFormField,
} from './velkommenFormConfig';
import { commonFieldErrorRenderer } from 'util/validation/validationUtils';
import { Hovedknapp } from 'nav-frontend-knapper';
import actionCreator from 'app/form/action/actionCreator';
import { useHistory } from 'react-router-dom';
import { useEngangsstønadContext } from 'app/form/hooks/useEngangsstønadContext';

import './velkommen.less';
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
    useDocumentTitle(intlUtils(intl, 'velkommen.standard.dokumenttittel'));
    const { dispatch } = useEngangsstønadContext();

    const onValidSubmit = (values: Partial<VelkommenFormData>) => {
        dispatch(
            actionCreator.setVelkommen({
                harForståttRettigheterOgPlikter: values.harForståttRettigheterOgPlikter!!,
            })
        );
        history.push('/soknad/om-barnet');
    };

    return (
        <VelkommenFormComponents.FormikWrapper
            initialValues={initialVelkommenValues}
            onSubmit={(values) => onValidSubmit(values)}
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
                        <Sidebanner
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
                                    <FormattedMessage id="velkommen.text.samtykkeIntro" />
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
