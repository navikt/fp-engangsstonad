import BEMHelper from 'common/util/bem';
import React from 'react';

import './styles/engangsstonad.less';

const AppContainer = () => {
    const bem = BEMHelper('engangsstonad');

    return <div className={bem.className}>Hello world</div>;
};

export default AppContainer;
