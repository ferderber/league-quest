# leaguequest

League Quest is a Vue.js web application for League of Legends. 

It tracks users as they progress through *quests* and allows them to compete with others.

## Features

- Login
- Quest progress page
- Leaderboards *(soon)*
- User settings *(soon)*
- Detailed per user stats page
- Detailed overall stats page

### Requirements

- `Node > 7`
- yarn/npm
- poi, `yarn global add poi`

### Folder structure

- `src/`: App files
  - `components/`: Components directory
  - `store/`: Vuex stores directory
    - `modules/`: Vuex stores seperated into modules
  - `index.js`: App entry file
- `poi.config.js`: Config file for poi
- `package.json`: App manifest
- `.gitignore`: Ignore git files

### Development

- `yarn`: Download dependencies
- `yarn dev`: Run in development mode
- `yarn build`: Build in production mode
- `yarn test`: Run tests
- `yarn lint`: Run eslint
