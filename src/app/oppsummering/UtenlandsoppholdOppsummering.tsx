import * as React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { UtenlandsoppholdFormData } from 'app/utenlandsopphold/utenlandsoppholdFormTypes';
import dayjs from 'dayjs';
import DisplayTextWithLabel from 'app/components/display-text-with-label/DisplayTextWithLabel';
import getMessage from 'common/util/i18nUtils';
import { OmBarnetFormData } from 'app/om-barnet/omBarnetFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import LandOppsummering from './LandOppsummering';
import { Block } from '@navikt/fp-common';

interface Props {
    barn: OmBarnetFormData;
    informasjonOmUtenlandsopphold: UtenlandsoppholdFormData;
}

const erDatoITidsperiode = (dato: string, fom: string, tom: string) => {
    return dayjs(dato).isBetween(dayjs(fom), dayjs(tom), 'day', '[]');
};

const erFamiliehendelsedatoIEnUtenlandsoppholdPeriode = (
    familiehendelsedato: string,
    informasjonOmUtenlandsopphold: UtenlandsoppholdFormData
) => {
    return (
        informasjonOmUtenlandsopphold.utenlandsoppholdSiste12Mnd.some((tidligereOpphold) =>
            erDatoITidsperiode(familiehendelsedato, tidligereOpphold.fom, tidligereOpphold.tom)
        ) ||
        informasjonOmUtenlandsopphold.utenlandsoppholdNeste12Mnd.some((senereOpphold) =>
            erDatoITidsperiode(familiehendelsedato, senereOpphold.fom, senereOpphold.tom)
        )
    );
};

const UtenlandsoppholdOppsummering: React.FunctionComponent<Props> = ({ barn, informasjonOmUtenlandsopphold }) => {
    const intl = useIntl();

    return (
        <Block>
            {informasjonOmUtenlandsopphold.harBoddUtenforNorgeSiste12Mnd === YesOrNo.NO ? (
                <DisplayTextWithLabel label={getMessage(intl, 'oppsummering.text.boddSisteTolv')} text="Norge" />
            ) : (
                <div className="textWithLabel">
                    <EtikettLiten className="textWithLabel__label">
                        {getMessage(intl, 'oppsummering.text.boddSisteTolv')}
                    </EtikettLiten>
                    <LandOppsummering
                        utenlandsoppholdListe={informasjonOmUtenlandsopphold.utenlandsoppholdSiste12Mnd}
                    />
                </div>
            )}
            {informasjonOmUtenlandsopphold.skalBoUtenforNorgeNeste12Mnd === YesOrNo.NO ? (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.neste12mnd')}
                    text={getMessage(intl, 'medlemmskap.radiobutton.boNorge')}
                />
            ) : (
                <div className="textWithLabel">
                    <EtikettLiten className="textWithLabel__label">
                        {getMessage(intl, 'medlemmskap.text.oppsummering.neste12mnd')}
                    </EtikettLiten>
                    <LandOppsummering
                        utenlandsoppholdListe={informasjonOmUtenlandsopphold.utenlandsoppholdNeste12Mnd}
                    />
                </div>
            )}
            {barn.erBarnetFødt === YesOrNo.NO && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.ogKommerPåFødselstidspunktet')}
                    text={
                        erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(barn.termindato!, informasjonOmUtenlandsopphold)
                            ? getMessage(intl, 'medlemmskap.radiobutton.vareUtlandet')
                            : getMessage(intl, 'medlemmskap.radiobutton.vareNorge')
                    }
                />
            )}
            {barn.erBarnetFødt === YesOrNo.YES && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.varPåFødselstidspunktet')}
                    text={
                        erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                            barn.fødselsdato!,
                            informasjonOmUtenlandsopphold
                        )
                            ? getMessage(intl, 'oppsummering.utenlandsopphold.iUtlandet')
                            : getMessage(intl, 'oppsummering.utenlandsopphold.iNorge')
                    }
                />
            )}
        </Block>
    );
};

export default UtenlandsoppholdOppsummering;
