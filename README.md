
# Welcome to the Crash Course TDD session

### About

This session contains Crash Course first two days - TDD with React and Node.
We will build a [tic-tac-toe](https://www.google.co.il/search?q=tic+tac+toe&oq=tic+tac+toe&aqs=chrome..69i57j35i39j0l4.2088j1j7&sourceid=chrome&ie=UTF-8) game, including a node server, for saving / loading last game, and persisting the leaderboard.

### From the beginning

We are using the Fullstack generator in order to start a new project:

```bash
npm i -g generator-wix-js
yo wix-js
```

Choose Fullstack Javascript (babel) project

```bash
npm i
npm test
```

### Sessions / steps

#### Part 1, class live coding (#part1 branch)

- "Baby steps" for a working skelaton, first player win:

  - Browser (e2e) test for new game
  - Browser (e2e) test for clicking an "X"
  - Browser (e2e) test for first player win

- Introducing Component test for second player click (and WallabyJS!!!)

#### Part 2, workshop (for solution look at #part2-solution)

- Write a component test for second player win (can be easily written as e2e, but: 1. no need for e2e here. 2. I want you to practice component test)

- Refactor game win logic to a separate method and add unit test for it

- Write unit tests and finish game logic (rows/columns/diagonals/tie)
- Add an e2e test for hiding game at start
- Add an e2e test for hiding registration after game starts
- Add a component test for tie
- Add a component test for marking next player
- Add a component test for blocking a cell from being clicked twice

#### part 5, class live coding

- Add buttons for saving / loading last game (using a server with in memory object. Don't forget to have a 'flush' method in dev mode, for cleaning this object)

#### part 6, workshop

- Add leaderboard, using a server in memory array
- Sort leaderboard
- Add a unique id for each user while saving / loading a game
- Add a 'new game' button
