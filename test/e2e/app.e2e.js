import {expect} from 'chai';
import {inputTestkitFactory, buttonTestkitFactory, labelTestkitFactory} from 'wix-style-react/dist/testkit/puppeteer';
import {beforeAndAfter, app} from './../environment';
import './e2e-common';

describe('React application', () => {
  beforeAndAfter();

  it('should start a new game', async () => {
    const player1 = 'Yaniv';
    const player2 = 'Computer';
    const page = await browser.newPage();
    await page.goto(app.getUrl('/'));
    const p1Testkit = await inputTestkitFactory({dataHook: 'p1-input', page});
    const p2Testkit = await inputTestkitFactory({dataHook: 'p2-input', page});
    const buttonTestkit = await buttonTestkitFactory({dataHook: 'new-game', page});
    const p1LabelTestkit = await labelTestkitFactory({dataHook: 'p1-title', page});
    const p2LabelTestkit = await labelTestkitFactory({dataHook: 'p2-title', page});

    await p1Testkit.enterText(player1);
    await p2Testkit.enterText(player2);
    await buttonTestkit.click();

    expect(await p1LabelTestkit.getLabelText()).to.equal(player1);
    expect(await p2LabelTestkit.getLabelText()).to.equal(player2);
  });
});
