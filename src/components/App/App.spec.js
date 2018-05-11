import 'jsdom-global/register';
import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import i18next from 'i18next';
import {I18nextProvider} from 'react-i18next';
import App from './App';
import translation from '../../assets/locale/messages_en.json';
import {
  inputTestkitFactory as enzymeInputTestkitFactory,
  buttonTestkitFactory as enzymeButtonTestkitFactory
} from 'wix-style-react/dist/testkit/enzyme';


const i18nData = {
  lng: 'en',
  keySeparator: '$',
  resources: {
    en: {translation}
  }
};

describe('App', () => {
  let wrapper;

  afterEach(() => wrapper.detach());

  it('should show "O" after second use clicks', () => {
    const player1 = 'Yaniv';
    const player2 = 'Computer';
    wrapper = mount(
      <I18nextProvider i18n={i18next.init(i18nData)}>
        <App/>
      </I18nextProvider>,
      {attachTo: document.createElement('div')}
    );
    const p1InputTestkit = enzymeInputTestkitFactory({wrapper, dataHook: 'p1-input'});
    const p2InputTestkit = enzymeInputTestkitFactory({wrapper, dataHook: 'p2-input'});
    const buttonTestkit = enzymeButtonTestkitFactory({wrapper, dataHook: 'new-game'});
    p1InputTestkit.enterText(player1);
    p2InputTestkit.enterText(player2);
    buttonTestkit.click();

    wrapper.find('td').at(0).simulate('click');
    wrapper.find('td').at(1).simulate('click');

    expect(wrapper.find('td').at(1).text()).to.eq('O');
  });
});
