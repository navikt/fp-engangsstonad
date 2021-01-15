import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { OmBarnetFormData, OmBarnetFormField } from './omBarnetFormConfig';

const OmBarnetFormConfig: QuestionConfig<OmBarnetFormData, OmBarnetFormField> = {
    [OmBarnetFormField.erBarnetFødt]: {
        isIncluded: () => true,
        isAnswered: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
    },
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
        isAnswered: ({ terminbekreftelse }) => terminbekreftelse.length > 0,
        visibilityFilter: ({ termindato }) => termindato !== undefined,
    },
    [OmBarnetFormField.terminbekreftelsedato]: {
        isIncluded: ({ termindato }) => termindato !== undefined,
        isAnswered: ({ terminbekreftelsedato }) => terminbekreftelsedato !== undefined,
        visibilityFilter: ({ termindato, terminbekreftelse }) =>
            termindato !== undefined && terminbekreftelse.length > 0,
    },
};

const omBarnetQuestionsConfig = Questions<OmBarnetFormData, OmBarnetFormField>(OmBarnetFormConfig);

export default omBarnetQuestionsConfig;
