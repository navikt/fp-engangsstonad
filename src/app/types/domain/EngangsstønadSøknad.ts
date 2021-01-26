import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import { FodtBarn, UfodtBarn } from './Barn';
import { Attachment } from 'common/storage/attachment/types/Attachment';

interface EngangsstønadSøknad {
    type: string;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: FodtBarn | UfodtBarn;
    vedlegg?: Attachment[];
}

export interface EngangsstønadSøknadDto {
    type: string;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: FodtBarn | UfodtBarn;
    vedlegg?: Attachment[];
    søker: {
        språkkode: string;
    };
}

export default EngangsstønadSøknad;
