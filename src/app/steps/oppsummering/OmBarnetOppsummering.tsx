import * as React from 'react';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { EtikettLiten } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import getMessage from 'common/util/i18nUtils';
import { OmBarnetFormData } from 'app/steps/om-barnet/omBarnetFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { Block, DisplayTextWithLabel, formatDate } from '@navikt/fp-common';
import Labeltekst from 'common/components/labeltekst/Labeltekst';

interface Props {
    barn: OmBarnetFormData;
}

const OmBarnetOppsummering: React.FunctionComponent<Props> = ({ barn }) => {
    const intl = useIntl();

    let antallBarnSummaryText;
    if (barn.antallBarn === '1') {
        antallBarnSummaryText = getMessage(intl, 'oppsummering.omBarnet.ettBarn');
    } else if (barn.antallBarn === '2') {
        antallBarnSummaryText = getMessage(intl, 'oppsummering.omBarnet.tvillinger');
    } else {
        antallBarnSummaryText = getMessage(intl, 'oppsummering.omBarnet.flereBarn', {
            antall: barn.antallBarn,
        });
    }

    return (
        <Block>
            <DisplayTextWithLabel
                label={getMessage(intl, 'oppsummering.text.soknadenGjelder')}
                text={antallBarnSummaryText}
            />
            {barn.stebarnsadopsjon !== YesOrNo.UNANSWERED && (
                <div>
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.text.medAdopsjonsdato')}
                        text={formatDate(barn.adopsjonsdato!)}
                    />

                    <EtikettLiten className="textWithLabel__label">
                        {barn.fødselsdatoer.length > 1
                            ? getMessage(intl, 'oppsummering.text.medFødselsdatoer')
                            : getMessage(intl, 'oppsummering.text.medFødselsdato')}
                    </EtikettLiten>
                    {barn.fødselsdatoer.map((_, index) => {
                        return (
                            <div key={index}>
                                <Labeltekst>{formatDate(barn.fødselsdatoer![index])}</Labeltekst>
                                <br />
                            </div>
                        );
                    })}
                </div>
            )}
            {barn.stebarnsadopsjon === YesOrNo.YES && (
                <div className="oppsummering__attachments">
                    <EtikettLiten className="textWithLabel__label">
                        {getMessage(intl, 'oppsummering.text.vedlagtAdopsjonBekreftelse')}
                    </EtikettLiten>
                    <AttachmentList
                        attachments={barn.adopsjonBekreftelse.filter((a: Attachment) => !isAttachmentWithError(a))}
                    />
                </div>
            )}
            {barn.stebarnsadopsjon === YesOrNo.NO && (
                <div>
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.text.adoptertFraUtland')}
                        text={
                            barn.adoptertFraUtland === YesOrNo.YES
                                ? getMessage(intl, 'oppsummering.text.adoptertFraUtland.Ja')
                                : getMessage(intl, 'oppsummering.text.adoptertFraUtland.Nei')
                        }
                    />
                    {barn.adoptertFraUtland === YesOrNo.YES && (
                        <DisplayTextWithLabel
                            label={getMessage(intl, 'oppsummering.text.nårKommerBarnetDato')}
                            text={formatDate(barn.nårKommerBarnetDato!)}
                        />
                    )}
                    <div className="oppsummering__attachments">
                        <EtikettLiten className="textWithLabel__label">
                            {getMessage(intl, 'oppsummering.text.vedlagtAdopsjonsBevilling')}
                        </EtikettLiten>
                        <AttachmentList
                            attachments={barn.adopsjonsbevilling.filter((a: Attachment) => !isAttachmentWithError(a))}
                        />
                    </div>
                </div>
            )}
            {barn.erBarnetFødt === YesOrNo.YES && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.medFødselsdato')}
                    text={formatDate(barn.fødselsdatoer[0])}
                />
            )}
            {barn.erBarnetFødt === YesOrNo.NO && barn.termindato && barn.terminbekreftelsedato && (
                <div>
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.text.medTermindato')}
                        text={formatDate(barn.termindato)}
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
                        text={formatDate(barn.terminbekreftelsedato)}
                    />
                </div>
            )}
        </Block>
    );
};
export default OmBarnetOppsummering;
