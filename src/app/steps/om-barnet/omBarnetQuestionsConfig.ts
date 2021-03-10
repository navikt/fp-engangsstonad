import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { OmBarnetFormData, OmBarnetFormField } from './omBarnetFormConfig';

interface OmBarnetQuestionPayload extends OmBarnetFormData {
    situasjon: string;
}

const OmBarnetFormConfig: QuestionConfig<OmBarnetQuestionPayload, OmBarnetFormField> = {
    [OmBarnetFormField.adopsjonAvEktefellesBarn]: {
        isIncluded: ({ situasjon }) => situasjon === 'adopsjon',
        isAnswered: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
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
        visibilityFilter: ({ erBarnetFødt, adopsjonAvEktefellesBarn, adopsjonsdato }) =>
            erBarnetFødt !== YesOrNo.UNANSWERED ||
            (adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED && adopsjonsdato !== undefined),
    },
    [OmBarnetFormField.adopsjonsdato]: {
        isIncluded: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        isAnswered: ({ adopsjonsdato }) => adopsjonsdato !== undefined,
        visibilityFilter: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.fødselsdatoer]: {
        isIncluded: ({ erBarnetFødt, adopsjonAvEktefellesBarn }) =>
            erBarnetFødt === YesOrNo.YES || adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        isAnswered: ({ fødselsdatoer }) => fødselsdatoer.length > 0 && fødselsdatoer[0] !== '',
        visibilityFilter: ({ antallBarn }) => antallBarn !== undefined,
    },
    [OmBarnetFormField.omsorgsovertakelse]: {
        isIncluded: ({ adopsjonAvEktefellesBarn }) => adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED,
        isAnswered: ({ omsorgsovertakelse }) => omsorgsovertakelse.length > 0,
        visibilityFilter: ({ antallBarn, fødselsdatoer }) =>
            antallBarn !== undefined || (fødselsdatoer.length > 0 && fødselsdatoer[0] !== ''),
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
