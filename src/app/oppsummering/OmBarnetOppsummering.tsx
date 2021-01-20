import * as React from 'react';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { EtikettLiten } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import { ISODateToMaskedInput } from 'util/date/dateUtils';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import getMessage from 'common/util/i18nUtils';
import { OmBarnetFormData } from 'app/om-barnet/omBarnetFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik/lib';

interface Props {
    barn: OmBarnetFormData;
}

const OmBarnetOppsummering: React.FunctionComponent<Props> = ({ barn }) => {
    const intl = useIntl();

    let antallBarnSummaryText;
    if (barn.antallBarn === '1') {
        antallBarnSummaryText = getMessage(intl, 'relasjonBarn.radiobutton.ettbarn');
    } else if (barn.antallBarn === '2') {
        antallBarnSummaryText = getMessage(intl, 'relasjonBarn.radiobutton.tvillinger');
    } else {
        antallBarnSummaryText = getMessage(intl, 'oppsummering.text.flereAntallBarn', {
            antall: barn.antallBarn,
        });
    }

    return (
        <div className=" blokk-m">
            <DisplayTextWithLabel
                label={getMessage(intl, 'oppsummering.text.soknadenGjelder')}
                text={antallBarnSummaryText}
            />
            {barn.erBarnetFødt === YesOrNo.YES && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.medFødselsdato')}
                    text={ISODateToMaskedInput(barn.fødselsdato!)}
                />
            )}
            {barn.erBarnetFødt === YesOrNo.NO && barn.termindato && barn.terminbekreftelsedato && (
                <div>
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.text.medTermindato')}
                        text={ISODateToMaskedInput(barn.termindato)}
                    />
                    <div className="oppsummering__attachments">
                        <EtikettLiten className="textWithLabel__label">
                            {getMessage(intl, 'oppsummering.text.vedlagtTerminbekreftelse')}
                        </EtikettLiten>
                        <AttachmentList
                            attachments={barn.terminbekreftelse.filter((a: Attachment) => !isAttachmentWithError(a))}
                        />
                    </div>
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.text.somErDatert')}
                        text={ISODateToMaskedInput(barn.terminbekreftelsedato)}
                    />
                </div>
            )}
        </div>
    );
};
export default OmBarnetOppsummering;
