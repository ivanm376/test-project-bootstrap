## Test Project Bootstrap

- Docker (two separate containers App and MongoDB)
- Webpack
- Express
- Winston
- React/Redux
- Sass
- Bootstrap
- Tuned with [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- PWA
- CSP (// TODO - CspHtmlWebpackPlugin)

### DOCKER-COMPOSE (\*under root user):

> docker-compose up -d  
> docker-compose stop

### LINUX TIP

Check you have enough watchers - https://webpack.js.org/configuration/watch/#not-enough-watchers.

### DEVELOPMENT MODE

Open two terminals with

> docker exec -it project1_webapp_container bash

Install packages

> npm install --also=dev

Run, in each, separately server and webpack

> npm run server-dev  
> npm run webpack-watch

\*To run server with breakpoint on first line (--inspect-brk):

> npm run server-brk

\*To test server ssr in development mode:

> npm run server-ssr

##### \*To login as root:

> docker exec -u root -it project1_webapp_container bash

### BUILD PRODUCTION BUNDLE

> npm run webpack-build

### DEPLOYMENT TO PRODUCTION

To skip devDependencies installation:

> npm install --production

To start server in production mode (\*\*\*TODO pm2\*\*\*):

> npm run server-production

### Links

- https://expressjs.com/en/advanced/best-practice-performance.html
- https://reactjs.org/docs/code-splitting.html
- https://reactjs.org/docs/optimizing-performance.html

### Server-side rendering (non-available)

> npm run server-ssr
> npm run build-ssr
