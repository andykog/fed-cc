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

const appDriver = () => {
  let wrapper;
  return {
    render: node => {
      wrapper = mount(node,
        {attachTo: document.createElement('div')}
      );
      return wrapper;
    },
    newGame: ({player1, player2}) => {
      const p1InputTestkit = enzymeInputTestkitFactory({wrapper, dataHook: 'p1-input'});
      const p2InputTestkit = enzymeInputTestkitFactory({wrapper, dataHook: 'p2-input'});
      const buttonTestkit = enzymeButtonTestkitFactory({wrapper, dataHook: 'new-game'});
      p1InputTestkit.enterText(player1);
      p2InputTestkit.enterText(player2);
      buttonTestkit.click();
    },
    clickACellAt: index => wrapper.find('td').at(index).simulate('click'),
    getACellAt: index => wrapper.find('td').at(index).text(),
    teardown: () => wrapper.detach()
  };
};

const i18nData = {
  lng: 'en',
  keySeparator: '$',
  resources: {
    en: {translation}
  }
};

describe('App', () => {
  let driver;

  beforeEach(() => {
    driver = appDriver();
  });

  afterEach(() => driver.teardown());
  it('should show "O" after second use clicks', () => {
    const player1 = 'Yaniv';
    const player2 = 'Computer';
    driver.render(
      <I18nextProvider i18n={i18next.init(i18nData)}>
        <App/>
      </I18nextProvider>
    );

    driver.newGame({player1, player2});
    driver.clickACellAt(0);
    driver.clickACellAt(1);

    expect(driver.getACellAt(1)).to.eq('O');
  });
});
