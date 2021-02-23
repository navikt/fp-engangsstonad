import * as React from 'react';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { EtikettLiten } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import { ISODateToMaskedInput } from 'util/date/dateUtils';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import getMessage from 'common/util/i18nUtils';
import { OmBarnetFormData } from 'app/steps/om-barnet/omBarnetFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { Block, DisplayTextWithLabel } from '@navikt/fp-common';
import { FieldArray } from 'formik';

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
            {barn.stebarnsadopsjon === YesOrNo.YES && (
                <div>
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.text.medAdopsjonsdato')}
                        text={ISODateToMaskedInput(barn.adopsjonsdato!)}
                    />
                    <FieldArray
                        name={'slødkf'}
                        render={() =>
                            [...Array(parseInt(barn.antallBarn!, 10))].map((_, index) => {
                                return (
                                    <DisplayTextWithLabel
                                        key={`${index}`}
                                        label={getMessage(intl, 'oppsummering.text.medFødselsdato')}
                                        text={ISODateToMaskedInput(barn.fødselsdato![index])}
                                    />
                                );
                            })
                        }
                    />

                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.text.medFødselsdato')}
                        text={ISODateToMaskedInput(barn.fødselsdato!)}
                    />
                    <div className="oppsummering__attachments">
                        <EtikettLiten className="textWithLabel__label">
                            {getMessage(intl, 'oppsummering.text.vedlagtTerminbekreftelse')}
                        </EtikettLiten>
                        <AttachmentList
                            attachments={barn.adopsjonBekreftelse.filter((a: Attachment) => !isAttachmentWithError(a))}
                        />
                    </div>
                </div>
            )}
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
        </Block>
    );
};
export default OmBarnetOppsummering;
