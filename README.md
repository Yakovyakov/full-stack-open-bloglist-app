# Application bloglist-app for for the CI/CD module of the Full stack open course

Link to the deployed application on render:

<https://full-stack-open-bloglist-app.onrender.com>

**Note:** Initial users are "root", "hellas" and "mluukkai" all have the password "sekret".

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

### General commands

- `npm run test` to run tests (backend and frontend)
- `npm run "test:e2e"` to run end to end tests
- `npm run lint` to run eslint (backend and frontend)
- `npm run build` to make a production build
- `npm run start-prod` to run your production build

### Backend commands

- `npm run "test:backend"` to run tests on the backend
- `npm run "dev:backend"` to run backend in develoment mode
- `npm run "lint:backend"` to run eslint on the backend

### Frontend commands

- `npm run "test:frontend"` to run tests on the frontend
- `npm run "dev:frontend"` to run frontend in develoment mode
- `npm run "lint:frontend"` to run eslint on the frontend
