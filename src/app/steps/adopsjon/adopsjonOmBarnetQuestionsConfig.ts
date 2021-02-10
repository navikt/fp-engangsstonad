import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { AdopsjonOmBarnetFormData, AdopsjonOmBarnetFormField } from './adopsjonOmBarnetFormConfig';

const AdopsjonOmBarnetFormConfig: QuestionConfig<AdopsjonOmBarnetFormData, AdopsjonOmBarnetFormField> = {
    [AdopsjonOmBarnetFormField.stebarnsadopsjon]: {
        isIncluded: () => true,
        isAnswered: ({ stebarnsadopsjon }) => stebarnsadopsjon !== YesOrNo.UNANSWERED,
    },
    [AdopsjonOmBarnetFormField.stebarnsadopsjondato]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.YES,
        isAnswered: ({ stebarnsadopsjondato }) => stebarnsadopsjondato !== undefined,
        visibilityFilter: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.YES,
    },
    [AdopsjonOmBarnetFormField.overtaomsorgdato]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.NO,
        isAnswered: ({ overtaomsorgdato }) => overtaomsorgdato !== undefined,
        visibilityFilter: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.NO,
    },
    [AdopsjonOmBarnetFormField.antallBarnAdoptert]: {
        isIncluded: () => true,
        isAnswered: ({ antallBarnAdoptert }) => antallBarnAdoptert !== undefined,
        visibilityFilter: ({ stebarnsadopsjon, stebarnsadopsjondato, overtaomsorgdato }) =>
            (stebarnsadopsjon !== YesOrNo.UNANSWERED && overtaomsorgdato !== undefined) ||
            stebarnsadopsjondato !== undefined,
        //visibilityFilter: ({ stebarnsadopsjon, stebarnsadopsjondato }) =>
        //    stebarnsadopsjon !== YesOrNo.UNANSWERED && stebarnsadopsjondato !== undefined,
    },
    [AdopsjonOmBarnetFormField.fødselsdato]: {
        isIncluded: () => true,
        isAnswered: ({ fødselsdato }) => fødselsdato !== undefined,
        visibilityFilter: ({ antallBarnAdoptert }) => antallBarnAdoptert !== undefined,
    },
    [AdopsjonOmBarnetFormField.terminbekreftelse]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.YES,
        isAnswered: ({ terminbekreftelse }) => terminbekreftelse.length > 0,
        visibilityFilter: ({ antallBarnAdoptert }) => antallBarnAdoptert !== undefined,
    },
    /*
    [AdopsjonOmBarnetFormField.fødselsdato]: {
        isIncluded: ({ erBarnetFødt, antallBarn }) => erBarnetFødt === YesOrNo.YES && antallBarn !== undefined,
        isAnswered: ({ fødselsdato }) => fødselsdato !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.YES,
    },
    [AdopsjonOmBarnetFormField.termindato]: {
        isIncluded: ({ erBarnetFødt, antallBarn }) => erBarnetFødt === YesOrNo.NO && antallBarn !== undefined,
        isAnswered: ({ termindato }) => termindato !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.NO,
    },
    [AdopsjonOmBarnetFormField.terminbekreftelse]: {
        isIncluded: ({ erBarnetFødt, termindato }) => erBarnetFødt === YesOrNo.NO && termindato !== undefined,
        isAnswered: ({ terminbekreftelse }) => terminbekreftelse.length > 0,
        visibilityFilter: ({ termindato, erBarnetFødt }) => termindato !== undefined && erBarnetFødt === YesOrNo.NO,
    },
    [AdopsjonOmBarnetFormField.terminbekreftelsedato]: {
        isIncluded: ({ termindato }) => termindato !== undefined,
        isAnswered: ({ terminbekreftelsedato }) => terminbekreftelsedato !== undefined,
        visibilityFilter: ({ termindato, terminbekreftelse, erBarnetFødt }) =>
            termindato !== undefined && terminbekreftelse.length > 0 && erBarnetFødt === YesOrNo.NO,
    },
    */
};

const adopsjonOmBarnetQuestionsConfig = Questions<AdopsjonOmBarnetFormData, AdopsjonOmBarnetFormField>(
    AdopsjonOmBarnetFormConfig
);

export default adopsjonOmBarnetQuestionsConfig;
