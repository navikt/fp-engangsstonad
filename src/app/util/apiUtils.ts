import { Attachment } from 'common/storage/attachment/types/Attachment';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import { EngangsstønadSøknadDto } from 'app/types/domain/EngangsstønadSøknad';
import { EngangsstønadContextState } from 'app/context/EngangsstønadContextConfig';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { FodtBarn, UfodtBarn } from 'app/types/domain/Barn';
import { OmBarnetFormData } from 'app/steps/om-barnet/omBarnetFormConfig';
import { UtenlandsoppholdFormData } from 'app/steps/utenlandsopphold/utenlandsoppholdFormTypes';
import InformasjonOmUtenlandsopphold, { Utenlandsopphold } from 'app/types/domain/InformasjonOmUtenlandsopphold';
import { BostedUtland } from 'app/steps/utenlandsopphold/bostedUtlandListAndDialog/types';
import dayjs from 'dayjs';
import { Locale } from '@navikt/fp-common';
import { OvertaOmsorg, Stebarn } from 'app/types/domain/Adopsjon';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const isArrayOfAttachments = (attachment: Attachment) => {
    return Array.isArray(attachment) && attachment.some((element: Attachment) => element.filename);
};

const removeAttachmentsWithUploadError = (attachments: Attachment[]) =>
    attachments.filter((a: Attachment) => !isAttachmentWithError(a));

export const mapAttachments = (object: object): Attachment[] => {
    const foundAttachments = [] as Attachment[];
    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                foundAttachments.push(...removeAttachmentsWithUploadError(object[key]));
                delete object[key];
            } else {
                foundAttachments.push(...mapAttachments(object[key]));
            }
        }
    });
    return foundAttachments;
};

const mapBarnForInnsending = (omBarnet: OmBarnetFormData): FodtBarn | UfodtBarn | Stebarn | OvertaOmsorg => {
    if (omBarnet.stebarnsadopsjon !== YesOrNo.UNANSWERED) {
        if (omBarnet.stebarnsadopsjon === YesOrNo.YES) {
            return {
                stebarnsadopsjon: true,
                adopsjonsdato: dayjs(omBarnet.adopsjonsdato).toDate(),
                antallBarn: parseInt(omBarnet.antallBarn!, 10),
                fødselsdatoer: [dayjs(omBarnet.fødselsdatoer![0]).toDate()],
            };
        }
        if (omBarnet.stebarnsadopsjon === YesOrNo.NO && omBarnet.adoptertFraUtland === YesOrNo.YES) {
            return {
                stebarnsadopsjon: false,
                adopsjonsdato: dayjs(omBarnet.adopsjonsdato).toDate(),
                antallBarn: parseInt(omBarnet.antallBarn!, 10),
                fødselsdatoer: [dayjs(omBarnet.fødselsdatoer![0]).toDate()],
                adoptertFraUtland: true,
                nårKommerBarnetDato: dayjs(omBarnet.nårKommerBarnetDato).toDate(),
            };
        }
        if (omBarnet.stebarnsadopsjon === YesOrNo.NO && omBarnet.adoptertFraUtland === YesOrNo.NO) {
            return {
                stebarnsadopsjon: false,
                adopsjonsdato: dayjs(omBarnet.adopsjonsdato).toDate(),
                antallBarn: parseInt(omBarnet.antallBarn!, 10),
                fødselsdatoer: [dayjs(omBarnet.fødselsdatoer![0]).toDate()],
                adoptertFraUtland: false,
            };
        }
    }
    return omBarnet.erBarnetFødt === YesOrNo.YES
        ? {
              antallBarn: parseInt(omBarnet.antallBarn!, 10),
              erBarnetFødt: true,
              fødselsdatoer: [dayjs.utc(omBarnet.fødselsdatoer![0]).toDate()],
          }
        : {
              antallBarn: parseInt(omBarnet.antallBarn!, 10),
              erBarnetFødt: false,
              termindato: dayjs.utc(omBarnet.termindato).toDate(),
              terminbekreftelseDato: dayjs.utc(omBarnet.terminbekreftelsedato).toDate(),
          };
};

const mapBostedUtlandTilUtenlandsopphold = (bostedUtland: BostedUtland[]): Utenlandsopphold[] => {
    return bostedUtland.map((bosted) => ({
        land: bosted.landkode,
        tidsperiode: {
            fom: dayjs.utc(bosted.fom).toDate(),
            tom: dayjs.utc(bosted.tom).toDate(),
        },
    }));
};

const mapUtenlandsoppholdForInnsending = (
    utenlandsopphold: UtenlandsoppholdFormData
): InformasjonOmUtenlandsopphold => {
    return {
        senereOpphold: mapBostedUtlandTilUtenlandsopphold(utenlandsopphold.utenlandsoppholdNeste12Mnd),
        tidligereOpphold: mapBostedUtlandTilUtenlandsopphold(utenlandsopphold.utenlandsoppholdSiste12Mnd),
        iNorgeNeste12Mnd: utenlandsopphold.skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES,
        iNorgeSiste12Mnd: utenlandsopphold.harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES,
    };
};

export const mapStateForInnsending = (state: EngangsstønadContextState, locale: Locale): EngangsstønadSøknadDto => {
    const { omBarnet, utenlandsopphold } = state.søknad;
    const barn: FodtBarn | UfodtBarn | Stebarn | OvertaOmsorg = mapBarnForInnsending(omBarnet);
    const utenlandsoppholdDto = mapUtenlandsoppholdForInnsending(utenlandsopphold);

    return {
        barn,
        type: 'engangsstønad',
        erEndringssøknad: false,
        informasjonOmUtenlandsopphold: utenlandsoppholdDto,
        søker: {
            språkkode: locale,
        },
        vedlegg: mapAttachments(JSON.parse(JSON.stringify(state.søknad))),
    };
};
