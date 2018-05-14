import 'regenerator-runtime/runtime';
import wixRunMode from 'wix-run-mode';
import ejs from 'ejs';
import wixExpressCsrf from 'wix-express-csrf';
import wixExpressRequireHttps from 'wix-express-require-https';
import {readFileSync} from 'fs';
import bodyParser from 'body-parser';

module.exports = (app, context) => {
  const config = context.config.load('fed-crash-course-tdd');
  const templatePath = './src/index.ejs';
  const templateFile = readFileSync(templatePath, 'utf8');
  const isProduction = wixRunMode.isProduction();

  app.use(wixExpressCsrf());
  app.use(wixExpressRequireHttps);
  app.use(bodyParser.json());
  let leaderBoard = {};
  app.post('/api/game', (req, res) => {
    res.end();
  });

  app.post('/api/flush', (req, res) => {
    leaderBoard = {};
    res.send('ok');
  })

  app.get('/api/game', (req, res) => {
    res.json({
      player1: 'Yaniv',
      player2: 'Computer',
      board: [['X', '', ''], ['', '', ''], ['', '', '']],
    });
  });

  app.get('/api/leader-board', (req, res) => {
    res.json(leaderBoard);
  });

  app.post('/api/leader-board',  (req, res) => {
    const {name} = req.body;
    if (leaderBoard[name] === undefined) {
      leaderBoard[name] = 1;
    } else {
      leaderBoard[name] += 1;
    }
    res.json(leaderBoard);
  });

  app.get('/', (req, res) => {
    const renderModel = getRenderModel(req);
    const html = ejs.render(templateFile, renderModel, {cache: isProduction, filename: templatePath});
    res.send(html);
  });

  function getRenderModel(req) {
    return {
      locale: req.aspects['web-context'].language,
      basename: req.aspects['web-context'].basename,
      debug: req.aspects['web-context'].debug || process.env.NODE_ENV === 'development',
      clientTopology: config.clientTopology,
      title: 'Wix Full Stack Project Boilerplate',
      leaderBoard: JSON.stringify(leaderBoard)
    };
  }

  return app;
};
