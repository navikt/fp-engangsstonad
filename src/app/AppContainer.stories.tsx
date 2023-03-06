import React from 'react';
import { Story } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';

import AppContainer from './AppContainer';
import { foreldrepengersoknadApi } from './api/api';


export default {
  title: 'AppContainer',
  component: AppContainer,
};

const Template: Story<any> = () => {
    const apiMock = new MockAdapter(foreldrepengersoknadApi);
    apiMock.onGet('/personinfo').reply(200, {
      fnr: '11111111111',
      fornavn: 'Henrikke',
      etternavn: 'Ibsen',
      kjønn: 'K',
      fødselsdato: '1979-01-28',
      ikkeNordiskEøsLand: true,
      bankkonto: {
          kontonummer: '49875234987',
          banknavn: 'Storebank',
      },
  });

  apiMock.onPost('/soknad');

  return (
    <AppContainer />
  )
  };

export const VisApp = Template.bind({});
