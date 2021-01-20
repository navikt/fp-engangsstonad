import CountryListElement from 'app/components/country-picker/CountryListElement';
import { Utenlandsopphold } from 'app/types/domain/InformasjonOmUtenlandsopphold';
import React from 'react';

const LandOppsummering: React.FunctionComponent = () => {
    return <div>HEPP</div>;
};
export default LandOppsummering;

interface CountryListProps {
    utenlandsoppholdListe: Utenlandsopphold[];
}

export const CountrySummaryList: React.FunctionComponent<CountryListProps> = (props) => (
    <ul className="countryList countryList--summary">
        {props.utenlandsoppholdListe.map((periode: Utenlandsopphold, index: number) => (
            <CountryListElement key={index} utenlandsopphold={periode} />
        ))}
    </ul>
);
