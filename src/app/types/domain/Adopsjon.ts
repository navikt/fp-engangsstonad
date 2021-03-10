import { Attachment } from 'common/storage/attachment/types/Attachment';

interface Adopsjon {
    adopsjonsdato: Date | undefined;
    antallBarn?: number | undefined;
    fødselsdatoer: Date[];
    adopsjonAvEktefellesBarn?: boolean;
    omsorgsovertakelse: Attachment[];
}

export default Adopsjon;
