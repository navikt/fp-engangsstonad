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

const isArrayOfAttachments = (object: object) => {
    return Array.isArray(object) && object.some((element) => element.filename);
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

const mapBarnForInnsending = (omBarnet: OmBarnetFormData): FodtBarn | UfodtBarn => {
    return omBarnet.erBarnetFødt === YesOrNo.YES
        ? {
              antallBarn: parseInt(omBarnet.antallBarn!, 10),
              erBarnetFødt: true,
              fødselsdatoer: [dayjs(omBarnet.fødselsdato!).toDate()],
          }
        : {
              antallBarn: parseInt(omBarnet.antallBarn!, 10),
              erBarnetFødt: false,
              termindato: dayjs(omBarnet.termindato).toDate(),
              terminbekreftelseDato: dayjs(omBarnet.terminbekreftelsedato).toDate(),
          };
};

const mapBostedUtlandTilUtenlandsopphold = (bostedUtland: BostedUtland[]): Utenlandsopphold[] => {
    return bostedUtland.map((bosted) => ({
        land: bosted.landkode,
        tidsperiode: {
            fom: dayjs(bosted.fom).toDate(),
            tom: dayjs(bosted.tom).toDate(),
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
    const barn: FodtBarn | UfodtBarn = mapBarnForInnsending(omBarnet);
    const utenlandsoppholdDto = mapUtenlandsoppholdForInnsending(utenlandsopphold);

    return {
        barn,
        type: 'endringssoknad',
        erEndringssøknad: false,
        informasjonOmUtenlandsopphold: utenlandsoppholdDto,
        søker: {
            språkkode: locale,
        },
        vedlegg: mapAttachments(state.søknad),
    };
};
