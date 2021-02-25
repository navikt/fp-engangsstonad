import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { OmBarnetFormData, OmBarnetFormField } from './omBarnetFormConfig';

interface OmBarnetQuestionPayload extends OmBarnetFormData {
    situasjon: string;
}

const OmBarnetFormConfig: QuestionConfig<OmBarnetQuestionPayload, OmBarnetFormField> = {
    [OmBarnetFormField.antallBarn]: {
        isIncluded: () => true,
        isAnswered: ({ antallBarn }) => antallBarn !== undefined,
        visibilityFilter: ({ erBarnetFødt, stebarnsadopsjon, adopsjonsdato }) =>
            erBarnetFødt !== YesOrNo.UNANSWERED ||
            (stebarnsadopsjon !== YesOrNo.UNANSWERED && adopsjonsdato !== undefined),
    },
    [OmBarnetFormField.adopsjonsdato]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon !== YesOrNo.UNANSWERED,
        isAnswered: ({ adopsjonsdato }) => adopsjonsdato !== undefined,
        visibilityFilter: ({ situasjon, stebarnsadopsjon }) =>
            situasjon === 'adopsjon' && stebarnsadopsjon !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.fødselsdato]: {
        isIncluded: ({ antallBarn, erBarnetFødt, stebarnsadopsjon }) =>
            (antallBarn !== undefined && erBarnetFødt === YesOrNo.YES) || stebarnsadopsjon !== undefined,
        isAnswered: ({ fødselsdato }) => fødselsdato !== undefined,
        visibilityFilter: ({ erBarnetFødt, antallBarn, adopsjonsdato }) =>
            erBarnetFødt === YesOrNo.YES || (adopsjonsdato !== undefined && antallBarn !== undefined),
    },
    [OmBarnetFormField.termindato]: {
        isIncluded: ({ situasjon, erBarnetFødt, antallBarn }) =>
            situasjon === 'fødsel' && erBarnetFødt === YesOrNo.NO && antallBarn !== undefined,
        isAnswered: ({ termindato }) => termindato !== undefined,
        visibilityFilter: ({ situasjon, erBarnetFødt }) => situasjon === 'fødsel' && erBarnetFødt === YesOrNo.NO,
    },
    [OmBarnetFormField.adopsjonBekreftelse]: {
        isIncluded: ({ stebarnsadopsjon, antallBarn }) =>
            stebarnsadopsjon !== YesOrNo.UNANSWERED && antallBarn !== undefined,
        isAnswered: ({ adopsjonBekreftelse }) => adopsjonBekreftelse.length > 0,
        visibilityFilter: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.YES,
    },
    [OmBarnetFormField.adoptertFraUtland]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.NO,
        isAnswered: ({ adoptertFraUtland }) => adoptertFraUtland !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ stebarnsadopsjon, antallBarn }) =>
            stebarnsadopsjon === YesOrNo.NO && antallBarn !== undefined,
    },
    [OmBarnetFormField.nårKommerBarnetDato]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.NO,
        isAnswered: ({ nårKommerBarnetDato }) => nårKommerBarnetDato !== undefined,
        visibilityFilter: ({ stebarnsadopsjon, adoptertFraUtland }) =>
            stebarnsadopsjon === YesOrNo.NO && adoptertFraUtland === YesOrNo.YES,
    },
    [OmBarnetFormField.adopsjonsbevilling]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.NO,
        isAnswered: ({ adopsjonsbevilling }) => adopsjonsbevilling.length > 0,
        visibilityFilter: ({ stebarnsadopsjon, nårKommerBarnetDato, adoptertFraUtland }) =>
            stebarnsadopsjon === YesOrNo.NO && (nårKommerBarnetDato !== undefined || adoptertFraUtland === YesOrNo.NO),
    },
    [OmBarnetFormField.terminbekreftelse]: {
        isIncluded: ({ erBarnetFødt, termindato }) => erBarnetFødt === YesOrNo.NO && termindato !== undefined,
        isAnswered: ({ terminbekreftelse }) => terminbekreftelse.length > 0,
        visibilityFilter: ({ termindato, erBarnetFødt }) => termindato !== undefined && erBarnetFødt === YesOrNo.NO,
    },
    [OmBarnetFormField.terminbekreftelsedato]: {
        isIncluded: ({ termindato }) => termindato !== undefined,
        isAnswered: ({ terminbekreftelsedato }) => terminbekreftelsedato !== undefined,
        visibilityFilter: ({ termindato, terminbekreftelse, erBarnetFødt }) =>
            termindato !== undefined && terminbekreftelse.length > 0 && erBarnetFødt === YesOrNo.NO,
    },
};

const omBarnetQuestionsConfig = Questions<OmBarnetQuestionPayload, OmBarnetFormField>(OmBarnetFormConfig);

export default omBarnetQuestionsConfig;
