import React from 'react';
import { useIntl } from 'react-intl';
import { getCountryName } from '@navikt/sif-common-formik';
import { BostedUtland } from './types';
import { ActionLink, bemUtils, ItemList } from '@navikt/fp-common';
import { prettifyDateExtended } from 'util/validation/validationUtils';
import dayjs from 'dayjs';

import './bostedUtlandList.less';

interface Props {
    bosteder: BostedUtland[];
    onEdit?: (opphold: BostedUtland) => void;
    onDelete?: (opphold: BostedUtland) => void;
}

const bem = bemUtils('bostedUtlandList');

const BostedUtlandList: React.FunctionComponent<Props> = ({ bosteder, onDelete, onEdit }) => {
    const intl = useIntl();
    const renderBostedUtlandLabel = (opphold: BostedUtland): React.ReactNode => {
        const navn = getCountryName(opphold.landkode, intl.locale);
        return (
            <div className={bem.element('label')}>
                <span className={bem.element('land')}>
                    {onEdit && <ActionLink onClick={() => onEdit(opphold)}>{navn}</ActionLink>}
                    {!onEdit && <span>{navn}</span>}
                </span>
                <span className={bem.element('dato')}>
                    {prettifyDateExtended(dayjs(opphold.fom).toDate())} -{' '}
                    {prettifyDateExtended(dayjs(opphold.tom).toDate())}
                </span>
            </div>
        );
    };

    return (
        <ItemList<BostedUtland>
            getItemId={(opphold: BostedUtland) => opphold.id}
            getItemTitle={(opphold: BostedUtland) => getCountryName(opphold.landkode, intl.locale)}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderBostedUtlandLabel}
            items={bosteder}
        />
    );
};

export default BostedUtlandList;