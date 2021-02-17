import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { OmBarnetFormData, OmBarnetFormField } from './omBarnetFormConfig';

interface OmBarnetQuestionPayload extends OmBarnetFormData {
    situasjon: string;
}

const OmBarnetFormConfig: QuestionConfig<OmBarnetQuestionPayload, OmBarnetFormField> = {
    /*
    [OmBarnetFormField.erBarnetFødt]: {
        isIncluded: () => true,
        isAnswered: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
    },
    */
    [OmBarnetFormField.antallBarn]: {
        isIncluded: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
        isAnswered: ({ antallBarn }) => antallBarn !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
    },
    /*
    [OmBarnetFormField.stebarnsadopsjon]: {
        isIncluded: () => true,
        isAnswered: ({ stebarnsadopsjon }) => stebarnsadopsjon !== YesOrNo.UNANSWERED,
    },
    */
    [OmBarnetFormField.antallBarnAdoptert]: {
        isIncluded: ({ stebarnsadopsjon, stebarnsadopsjondato, overtaomsorgdato }) =>
            (stebarnsadopsjon !== YesOrNo.UNANSWERED && stebarnsadopsjondato !== undefined) ||
            overtaomsorgdato !== undefined,
        isAnswered: ({ antallBarnAdoptert }) => antallBarnAdoptert !== undefined,
        visibilityFilter: ({ stebarnsadopsjon }) => stebarnsadopsjon !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.fødselsdato]: {
        isIncluded: ({ erBarnetFødt, antallBarn }) => erBarnetFødt === YesOrNo.YES && antallBarn !== undefined,
        isAnswered: ({ fødselsdato }) => fødselsdato !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.YES,
    },
    [OmBarnetFormField.adoptertFødselsDato]: {
        isIncluded: ({ stebarnsadopsjon, antallBarnAdoptert }) =>
            stebarnsadopsjon !== YesOrNo.UNANSWERED && antallBarnAdoptert !== undefined,
        isAnswered: ({ adoptertFødselsDato }) => adoptertFødselsDato !== undefined,
        visibilityFilter: ({ stebarnsadopsjon }) => stebarnsadopsjon !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.adopsjonBekreftelse]: {
        isIncluded: ({ stebarnsadopsjon, antallBarnAdoptert }) =>
            stebarnsadopsjon !== YesOrNo.UNANSWERED && antallBarnAdoptert !== undefined,
        isAnswered: ({ adopsjonBekreftelse }) => adopsjonBekreftelse.length > 0,
        visibilityFilter: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.YES,
    },
    [OmBarnetFormField.termindato]: {
        isIncluded: ({ erBarnetFødt, antallBarn }) => erBarnetFødt === YesOrNo.NO && antallBarn !== undefined,
        isAnswered: ({ termindato }) => termindato !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt !== YesOrNo.UNANSWERED,
    },
    [OmBarnetFormField.stebarnsadopsjondato]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.YES,
        isAnswered: ({ stebarnsadopsjondato }) => stebarnsadopsjondato !== undefined,
        visibilityFilter: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.YES,
    },
    [OmBarnetFormField.overtaomsorgdato]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.NO,
        isAnswered: ({ overtaomsorgdato }) => overtaomsorgdato !== undefined,
        visibilityFilter: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.NO,
    },
    [OmBarnetFormField.adoptertFraUtland]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.NO,
        isAnswered: ({ adoptertFraUtland }) => adoptertFraUtland !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ stebarnsadopsjon, antallBarnAdoptert }) =>
            stebarnsadopsjon === YesOrNo.NO && antallBarnAdoptert !== undefined,
    },
    [OmBarnetFormField.nårKommerBarnetDato]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.NO,
        isAnswered: ({ nårKommerBarnetDato }) => nårKommerBarnetDato !== undefined,
        visibilityFilter: ({ stebarnsadopsjon, adoptertFraUtland }) =>
            stebarnsadopsjon === YesOrNo.NO && adoptertFraUtland === YesOrNo.YES,
    },
    [OmBarnetFormField.adopsjonsbevillingen]: {
        isIncluded: ({ stebarnsadopsjon }) => stebarnsadopsjon === YesOrNo.NO,
        isAnswered: ({ adopsjonsbevillingen }) => adopsjonsbevillingen.length > 0,
        visibilityFilter: ({ stebarnsadopsjon, nårKommerBarnetDato, adoptertFraUtland }) =>
            stebarnsadopsjon === YesOrNo.NO && (nårKommerBarnetDato !== undefined || adoptertFraUtland === YesOrNo.NO),
    },
    [OmBarnetFormField.termindato]: {
        isIncluded: ({ erBarnetFødt, antallBarn }) => erBarnetFødt === YesOrNo.NO && antallBarn !== undefined,
        isAnswered: ({ termindato }) => termindato !== undefined,
        visibilityFilter: ({ erBarnetFødt }) => erBarnetFødt === YesOrNo.NO,
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
