import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { OmBarnetFormData, OmBarnetFormField } from './omBarnetFormConfig';

const OmBarnetFormConfig: QuestionConfig<OmBarnetFormData, OmBarnetFormField> = {
    [OmBarnetFormField.antallBarn]: {
        isIncluded: () => true,
        isAnswered: ({ antallBarn }) => antallBarn !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.fødselsdato]: {
        isIncluded: ({ erBarnetFødt, antallBarn }) => erBarnetFødt === YesOrNo.YES && antallBarn !== undefined,
        isAnswered: ({ fødselsdato }) => fødselsdato !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.YES,
    },
    [OmBarnetFormField.termindato]: {
        isIncluded: ({ erBarnetFødt, antallBarn }) => erBarnetFødt === YesOrNo.NO && antallBarn !== undefined,
        isAnswered: ({ termindato }) => termindato !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.NO,
    },
    [OmBarnetFormField.terminbekreftelse]: {
        isIncluded: ({ erBarnetFødt, termindato }) => erBarnetFødt === YesOrNo.NO && termindato !== undefined,
        isAnswered: ({ terminbekreftelse }) => terminbekreftelse !== undefined,
        visibilityFilter: ({ termindato }) => termindato !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.terminbekreftelsedato]: {
        isIncluded: () => true,
        isAnswered: ({ antallBarn }) => antallBarn !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
    },
};

const omBarnetQuestionsConfig = Questions<OmBarnetFormData, OmBarnetFormField>(OmBarnetFormConfig);

export default omBarnetQuestionsConfig;
