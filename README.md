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

### Folder structure
- `src/`: App files
  - `components/`: Components directory
  - `store/`: Vuex stores directory
    - `modules/`: Vuex stores seperated into modules
  - `index.js`: App entry file
- `vbuild.config.js`: Config file for vbuild
- `package.json`: App manifest
- `.gitignore`: Ignore git files

### Development
- `yarn dev`: Run in development mode
- `yarn build`: Build in production mode
- `yarn lint`: Run eslint
