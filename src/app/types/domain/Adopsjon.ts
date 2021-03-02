import { Attachment } from 'common/storage/attachment/types/Attachment';

interface Adopsjon {
    adopsjonsdato: Date | undefined;
    antallBarn?: number | undefined;
    fødselsdatoer: Date[];
    stebarnsadopsjon?: boolean;
}

export interface Stebarn extends Adopsjon {
    adopsjonBekreftelse?: Attachment[];
}

export interface OvertaOmsorg extends Adopsjon {
    adoptertFraUtland?: boolean;
    nårKommerBarnetDato: Date | undefined;
    adopsjonsbevilling?: Attachment[];
}
/*
export const isUfødtBarn = (barn: Barn): barn is UfodtBarn => {
    return (barn as UfodtBarn).termindato !== undefined;
};

export const isFødtBarn = (barn: Barn): barn is FodtBarn => {
    return (barn as FodtBarn).fødselsdatoer !== undefined;
};
*/
export default Adopsjon;
