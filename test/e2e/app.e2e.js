import {expect} from 'chai';
import {inputTestkitFactory, buttonTestkitFactory, labelTestkitFactory} from 'wix-style-react/dist/testkit/puppeteer';
import {beforeAndAfter, app} from './../environment';
import './e2e-common';

const appDriver = ({page}) => ({
  navigate: () => page.goto(app.getUrl('/')),
  newGame: async ({player1, player2}) => {
    const p1Testkit = await inputTestkitFactory({dataHook: 'p1-input', page});
    const p2Testkit = await inputTestkitFactory({dataHook: 'p2-input', page});
    const buttonTestkit = await buttonTestkitFactory({dataHook: 'new-game', page});
    await p1Testkit.enterText(player1);
    await p2Testkit.enterText(player2);
    await buttonTestkit.click();
  },
  getPlayer1Title: async () => {
    const p1LabelTestkit = await labelTestkitFactory({dataHook: 'p1-title', page});
    return p1LabelTestkit.getLabelText();
  },
  getPlayer2Title: async () => {
    const p2LabelTestkit = await labelTestkitFactory({dataHook: 'p2-title', page});
    return p2LabelTestkit.getLabelText();
  }
});

let driver;
let page;
describe('React application', () => {
  before(async () => {
    page = await browser.newPage();
    driver = appDriver({page});
  })

  beforeAndAfter();

  it('should start a new game', async () => {
    const player1 = 'Yaniv';
    const player2 = 'Computer';
    await driver.navigate();
    await driver.newGame({player1, player2});

    expect(await driver.getPlayer1Title()).to.equal(player1);
    expect(await driver.getPlayer2Title()).to.equal(player2);
  });
});
