# Application bloglist-app for for part 11 (CI/CD) of the full stack open course

Link to the deployed application on render:

<https://full-stack-open-bloglist-app.onrender.com>

## General structure of the repository

```tree
.
├── README.md
├── package.json
├── .github
│   ├── workflows
├── backend
│   ├── controllers
│   ├── e2e-tests
│   ├── models
│   ├── tests
│   └── utils
├── frontend
│   └── src
│       ├── components
│       ├── hooks
│       ├── pages
│       ├── reducers
│       └── services
└── scripts
```

Folders and files overview

- README.md: Main project documentation.
- package.json: useful scripts to use in the project with the npm command
- frontend/: Folder that contains the source code of the frontend developed with Vite
- backend: Folder containing the backend source code.
- scripts/: Folder with useful scripts for deployment, installation and working with github.
- .github/workflows/: folder containing github workflows

## Commands

Start by running `npm install` inside the backend and frontend folders

- `npm start` to run the webpack dev server
- `npm test` to run tests (backend and frontend)
- `npm test:e2e` to run end to end tests 
- `npm run lint` to run eslint (backend and frontend)
- `npm run build` to make a production build
- `npm run start-prod` to run your production build
