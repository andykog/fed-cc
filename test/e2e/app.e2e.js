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
  },
  clickACellAt: ({x, y}) => page.$$eval('td', (elements, _x, _y) => elements[_x + (_y * 3)].click(), x, y),
  getACellAt: ({x, y}) => page.$$eval('td', (elements, _x, _y) => elements[_x + (_y * 3)].innerText, x, y),
  getWinnerMessage: () => page.$eval('[data-hook="winner"]', el => el.innerText),
  isWinnerMessageVisible: async () => !!await page.$('[data-hook="winner"]'),
  saveGame: async () => {
    const buttonTestkit = await buttonTestkitFactory({dataHook: 'save-game', page});
    await buttonTestkit.click();
  },
  loadGame: async () => {
    const buttonTestkit = await buttonTestkitFactory({dataHook: 'load-game', page});
    await buttonTestkit.click();
  },
  getGameBoard: async () => await page.$('[data-hook="game-board"]'),
  getRegistrationForm: async () => await page.$('[data-hook="registration-form"]'),
  isPlayerNameVisible: async () => !!await page.$('[data-hook="current-player-name"]'),
  getCurrentPlayerName: async () => await page.$eval('[data-hook="current-player-name"]', el => el.innerText)
});

let driver;
let page;
describe('React application', () => {
  before(async () => {
    page = await browser.newPage();
    driver = appDriver({page});
  });

  beforeAndAfter();

  it('should start a new game', async () => {
    const player1 = 'Yaniv';
    const player2 = 'Computer';
    await driver.navigate();
    await driver.newGame({player1, player2});

    expect(await driver.getPlayer1Title()).to.equal(player1);
    expect(await driver.getPlayer2Title()).to.equal(player2);
  });

  it('should have "X" after first user click', async () => {
    const player1 = 'Yaniv';
    const player2 = 'Computer';
    await driver.navigate();
    await driver.newGame({player1, player2});
    expect(await driver.getACellAt({x: 0, y: 0})).to.equal('');
    await driver.clickACellAt({x: 0, y: 0});
    expect(await driver.getACellAt({x: 0, y: 0})).to.equal('X');
  });

  it('first user should win the game', async () => {
    const player1 = 'Yaniv';
    const player2 = 'Computer';
    await driver.navigate();
    await driver.newGame({player1, player2});
    await driver.clickACellAt({x: 0, y: 0});
    await driver.clickACellAt({x: 0, y: 1});
    expect(await driver.isWinnerMessageVisible()).to.equal(false);
    await driver.clickACellAt({x: 1, y: 0});
    await driver.clickACellAt({x: 1, y: 1});
    await driver.clickACellAt({x: 2, y: 0});
    expect(await driver.getWinnerMessage()).to.equal('Yaniv Won!');
  });

  it('second user should win the game', async () => {
    const player1 = 'Yaniv';
    const player2 = 'Computer';
    await driver.navigate();
    await driver.newGame({player1, player2});
    await driver.clickACellAt({x: 0, y: 1});
    await driver.clickACellAt({x: 0, y: 0});
    await driver.clickACellAt({x: 0, y: 2});
    await driver.clickACellAt({x: 1, y: 0});
    await driver.clickACellAt({x: 1, y: 1});
    expect(await driver.isWinnerMessageVisible()).to.equal(false);
    await driver.clickACellAt({x: 2, y: 0});
    // await page.screenshot({path: 'cat1.png'});
    expect(await driver.getWinnerMessage()).to.equal(`${player2} Won!`);
  });

  it('tie', async () => {
    const player1 = 'Yaniv';
    const player2 = 'Computer';
    await driver.navigate();
    await driver.newGame({player1, player2});
    await driver.clickACellAt({x: 0, y: 0});
    await driver.clickACellAt({x: 0, y: 1});
    await driver.clickACellAt({x: 0, y: 2});
    await driver.clickACellAt({x: 1, y: 0});
    await driver.clickACellAt({x: 1, y: 2});
    expect(await driver.isWinnerMessageVisible()).to.equal(false);
    await driver.clickACellAt({x: 1, y: 1});
    await driver.clickACellAt({x: 2, y: 0});
    await driver.clickACellAt({x: 2, y: 2});
    await driver.clickACellAt({x: 2, y: 1});
    await page.screenshot({path: 'cat1.png'});
    expect(await driver.getWinnerMessage()).to.equal(`Tie!`);
  });

  xit('should save a game', async () => {
    const player1 = 'Yaniv';
    const player2 = 'Computer';
    await driver.navigate();
    await driver.newGame({player1, player2});
    await driver.clickACellAt({x: 0, y: 0});
    await driver.saveGame();
    await driver.navigate();
    await driver.loadGame();
    expect(await driver.getPlayer1Title()).to.equal(player1);
    expect(await driver.getPlayer2Title()).to.equal(player2);
    expect(await driver.getACellAt({x: 0, y: 0})).to.equal('X');
  });

  it('shouldn\'t show game board at load', async () => {
    await driver.navigate();
    expect(await driver.getGameBoard()).to.equal(null);
  });

  it('should hide registration form after start', async () => {
    const player1 = 'Yaniv';
    const player2 = 'Computer';
    await driver.navigate();
    expect(await driver.getRegistrationForm()).to.not.equal(null);
    await driver.newGame({player1, player2});
    expect(await driver.getRegistrationForm()).to.equal(null);
  });

  it('should block cell from being clicked twice', async () => {
    const player1 = 'Yaniv';
    const player2 = 'Computer';
    await driver.navigate();
    await driver.newGame({player1, player2});
    await driver.clickACellAt({x: 0, y: 0});
    await driver.clickACellAt({x: 0, y: 0});
    expect(await driver.getACellAt({x: 0, y: 0})).to.equal('X');
  });

  it('should print first player\'s name at start', async () => {
    const player1 = 'Yaniv';
    const player2 = 'Computer';
    await driver.navigate();
    expect(await driver.isPlayerNameVisible()).to.equal(false);
    await driver.newGame({player1, player2});
    expect(await driver.isPlayerNameVisible()).to.equal(true);
    expect(await driver.getCurrentPlayerName()).to.equal('Yaniv');
  });
});
