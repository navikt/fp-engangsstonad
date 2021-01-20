import * as React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { UtenlandsoppholdFormData } from 'app/utenlandsopphold/utenlandsoppholdFormTypes';
import dayjs from 'dayjs';
import DisplayTextWithLabel from 'app/components/display-text-with-label/DisplayTextWithLabel';
import getMessage from 'common/util/i18nUtils';
import { OmBarnetFormData } from 'app/om-barnet/omBarnetFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { Tidsperiode } from 'app/types/domain/InformasjonOmUtenlandsopphold';
import LandOppsummering from './LandOppsummering';
import { Block } from '@navikt/fp-common';

interface Props {
    barn: OmBarnetFormData;
    informasjonOmUtenlandsopphold: UtenlandsoppholdFormData;
}

// TODO fjerne denne  logikken og bruke funksjonalitet fra datovelgeren v4
const erDatoITidsperiode = (dato: Date, tidsperiode: Tidsperiode) => {
    return dayjs(dato).isBetween(dayjs(tidsperiode.fom), dayjs(tidsperiode.tom), 'day', '[]');
};

const erFamiliehendelsedatoIEnUtenlandsoppholdPeriode = (
    familiehendelsedato: string,
    informasjonOmUtenlandsopphold: UtenlandsoppholdFormData
) => {
    const famDato = dayjs(familiehendelsedato).toDate();
    return (
        informasjonOmUtenlandsopphold.utenlandsoppholdSiste12Mnd.some((tidligereOpphold) =>
            erDatoITidsperiode(famDato, { fom: tidligereOpphold.fom, tom: tidligereOpphold.tom })
        ) ||
        informasjonOmUtenlandsopphold.utenlandsoppholdNeste12Mnd.some((senereOpphold) =>
            erDatoITidsperiode(famDato, { fom: senereOpphold.fom, tom: senereOpphold.tom })
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
                            ? getMessage(intl, 'medlemmskap.radiobutton.iUtlandet')
                            : getMessage(intl, 'medlemmskap.radiobutton.iNorge')
                    }
                />
            )}
        </Block>
    );
};

export default UtenlandsoppholdOppsummering;
