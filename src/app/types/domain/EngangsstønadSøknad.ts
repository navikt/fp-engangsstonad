import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import { FodtBarn, UfodtBarn } from './Barn';
import { Adopsjon /* Stebarn, OvertaOmsorg */ } from './Adopsjon';
import { Attachment } from 'common/storage/attachment/types/Attachment';

interface EngangsstønadSøknad {
    type: string;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: FodtBarn | UfodtBarn | Adopsjon /*| Stebarn | OvertaOmsorg */;
    vedlegg?: Attachment[];
}

export interface EngangsstønadSøknadDto {
    type: string;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: FodtBarn | UfodtBarn | Adopsjon /* | Stebarn | OvertaOmsorg */;
    vedlegg?: Attachment[];
    søker: {
        språkkode: string;
    };
}

export default EngangsstønadSøknad;
