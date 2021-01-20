import * as React from 'react';
//import { CountrySummaryList } from 'components/country-picker/CountryList';
import { EtikettLiten } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { UtenlandsoppholdFormData } from 'app/utenlandsopphold/utenlandsoppholdFormTypes';
import dayjs from 'dayjs';
import DisplayTextWithLabel from 'app/components/display-text-with-label/DisplayTextWithLabel';
import getMessage from 'common/util/i18nUtils';
import { OmBarnetFormData } from 'app/om-barnet/omBarnetFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
//import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
//import InformasjonOmUtenlandsopphold, {
//    Tidsperiode,
//    Utenlandsopphold,
//} from '../../types/domain/InformasjonOmUtenlandsopphold';
//import * as moment from 'moment';
//import Barn, { FodtBarn, UfodtBarn } from '../../types/domain/Barn';
//import getMessage from 'common/util/i18nUtils';

//import '../../styles/engangsstonad.less';

interface Props {
    barn: OmBarnetFormData;
    informasjonOmUtenlandsopphold: UtenlandsoppholdFormData;
}

// TODO fjerne denne  logikken og bruke funksjonalitet fra datovelgeren v4
/*const erDatoITidsperiode = (dato: Date, tidsperiode: Tidsperiode) => {
    return moment(dato).isBetween(moment(tidsperiode.fom), moment(tidsperiode.tom), 'day', '[]');
};
*/
const erFamiliehendelsedatoIEnUtenlandsoppholdPeriode = (
    familiehendelsedato: string,
    informasjonOmUtenlandsopphold: UtenlandsoppholdFormData
) => {
    const d = dayjs(familiehendelsedato).toDate();
    return (
        informasjonOmUtenlandsopphold.utenlandsoppholdSiste12Mnd.some((utenlandsoppholdSiste12Mnd: any ) 
        /*
        informasjonOmUtenlandsopphold.utenlandsoppholdSiste12Mnd
        informasjonOmUtenlandsopphold.utenlandsoppholdNeste12Mnd
        informasjonOmUtenlandsopphold.skalBoUtenforNorgeNeste12Mnd
        informasjonOmUtenlandsopphold.harBoddUtenforNorgeSiste12Mnd
        */

        /*
        informasjonOmUtenlandsopphold.harBoddUtenforNorgeSiste12Mnd.some((tidligereOpphold: Utenlandsopphold) =>
            erDatoITidsperiode(d, tidligereOpphold.tidsperiode)
        ) ||
        informasjonOmUtenlandsopphold.senereOpphold.some((senereOpphold: Utenlandsopphold) =>
            erDatoITidsperiode(d, senereOpphold.tidsperiode)
        )
        */
    );
};

const UtenlandsoppholdOppsummering: React.FunctionComponent<Props> = ({ barn, informasjonOmUtenlandsopphold }) => {
    //const { iNorgeNeste12Mnd, iNorgeSiste12Mnd, tidligereOpphold, senereOpphold } = informasjonOmUtenlandsopphold;

    //skalBoUtenforNorgeNeste12Mnd, harBoddUtenforNorgeSiste12Mnd, utenlandsoppholdSiste12Mnd, utenlandsoppholdNeste12Mnd]: YesOrNo;
    
    const intl = useIntl();

    return (
        <div className="blokk-m">
            {informasjonOmUtenlandsopphold.harBoddUtenforNorgeSiste12Mnd ? (
                <DisplayTextWithLabel label={getMessage(intl, 'oppsummering.text.boddSisteTolv')} text="Norge" />
            ) : (
                <div className="textWithLabel">
                    <EtikettLiten className="textWithLabel__label">
                        {getMessage(intl, 'oppsummering.text.boddSisteTolv')}
                    </EtikettLiten>
                    {/*<CountrySummaryList utenlandsoppholdListe={informasjonOmUtenlandsopphold.utenlandsoppholdSiste12Mnd} />*/}
                </div>
            )}
            {informasjonOmUtenlandsopphold.skalBoUtenforNorgeNeste12Mnd ? (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.neste12mnd')}
                    text={getMessage(intl, 'medlemmskap.radiobutton.boNorge')}
                />
            ) : (
                <div className="textWithLabel">
                    <EtikettLiten className="textWithLabel__label">
                        {getMessage(intl, 'medlemmskap.text.oppsummering.neste12mnd')}
                    </EtikettLiten>
                    {/*<CountrySummaryList utenlandsoppholdListe={informasjonOmUtenlandsopphold.utenlandsoppholdNeste12Mnd} />*/}
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
        </div>
    );
};
export default UtenlandsoppholdOppsummering;
