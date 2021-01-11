import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { OmBarnetFormData, OmBarnetFormField } from './omBarnetFormConfig';

const OmBarnetFormConfig: QuestionConfig<OmBarnetFormData, OmBarnetFormField> = {
    [OmBarnetFormField.antallBarn]: {
        isIncluded: () => true,
        isAnswered: ({ antallBarn }) => antallBarn !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.fødselstidspunkt]: {
        isIncluded: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.YES,
        isAnswered: ({ fødselstidspunkt }) => fødselstidspunkt !== '' || fødselstidspunkt !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.YES,
    },
    [OmBarnetFormField.fødselsdato]: {
        isIncluded: () => true,
        isAnswered: ({ antallBarn }) => antallBarn !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.termindato]: {
        isIncluded: () => true,
        isAnswered: ({ antallBarn }) => antallBarn !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.terminbekreftelse]: {
        isIncluded: () => true,
        isAnswered: ({ antallBarn }) => antallBarn !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.terminbekreftelsedato]: {
        isIncluded: () => true,
        isAnswered: ({ antallBarn }) => antallBarn !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
    },
};

const omBarnetQuestionsConfig = Questions<OmBarnetFormData, OmBarnetFormField>(OmBarnetFormConfig);

export default omBarnetQuestionsConfig;
