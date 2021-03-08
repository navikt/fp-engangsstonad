import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { OmBarnetFormData, OmBarnetFormField } from './omBarnetFormConfig';

interface OmBarnetQuestionPayload extends OmBarnetFormData {
    situasjon: string;
}

const OmBarnetFormConfig: QuestionConfig<OmBarnetQuestionPayload, OmBarnetFormField> = {
    [OmBarnetFormField.stebarnsadopsjon]: {
        isIncluded: ({ situasjon }) => situasjon === 'adopsjon',
        isAnswered: ({ stebarnsadopsjon }) => stebarnsadopsjon !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ situasjon }) => situasjon === 'adopsjon',
    },
    [OmBarnetFormField.erBarnetFødt]: {
        isIncluded: ({ situasjon }) => situasjon === 'fødsel',
        isAnswered: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ situasjon }) => situasjon === 'fødsel',
    },
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
        visibilityFilter: ({ stebarnsadopsjon }) => stebarnsadopsjon !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.fødselsdatoer]: {
        isIncluded: ({ erBarnetFødt, stebarnsadopsjon }) =>
            erBarnetFødt === YesOrNo.YES || stebarnsadopsjon !== YesOrNo.UNANSWERED,
        isAnswered: ({ fødselsdatoer }) => fødselsdatoer.length > 0 && fødselsdatoer[0] !== '',
        visibilityFilter: ({ antallBarn }) => antallBarn !== undefined,
    },
    [OmBarnetFormField.adopsjonBekreftelse]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.YES,
        isAnswered: ({ adopsjonBekreftelse }) => adopsjonBekreftelse.length > 0,
        visibilityFilter: ({ antallBarn }) => antallBarn !== undefined,
    },
    [OmBarnetFormField.adoptertFraUtland]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.NO,
        isAnswered: ({ adoptertFraUtland }) => adoptertFraUtland !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ antallBarn }) => antallBarn !== undefined,
    },
    [OmBarnetFormField.adopsjonsbevilling]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.NO,
        isAnswered: ({ adopsjonsbevilling }) => adopsjonsbevilling.length > 0,
        visibilityFilter: ({ adoptertFraUtland }) => adoptertFraUtland === YesOrNo.NO,
    },
    [OmBarnetFormField.termindato]: {
        isIncluded: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.NO,
        isAnswered: ({ termindato }) => termindato !== undefined,
        visibilityFilter: ({ antallBarn }) => antallBarn !== undefined,
    },
    [OmBarnetFormField.terminbekreftelse]: {
        isIncluded: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.NO,
        isAnswered: ({ terminbekreftelse }) => terminbekreftelse.length > 0,
        visibilityFilter: ({ termindato }) => termindato !== undefined,
    },
    [OmBarnetFormField.terminbekreftelsedato]: {
        isIncluded: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.NO,
        isAnswered: ({ terminbekreftelsedato }) => terminbekreftelsedato !== undefined || terminbekreftelsedato === '',
        visibilityFilter: ({ terminbekreftelse }) => terminbekreftelse.length > 0,
    },
};

const omBarnetQuestionsConfig = Questions<OmBarnetQuestionPayload, OmBarnetFormField>(OmBarnetFormConfig);

export default omBarnetQuestionsConfig;
