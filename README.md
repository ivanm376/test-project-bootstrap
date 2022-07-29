## Test Project Bootstrap

Tech stack:

- Docker (two separate containers App and MongoDB)
- Webpack 5
- Express
- React Hooks/Redux
- Server-side rendering (SSR)
- Bootstrap 5
- Sass
- Winston logger
- PWA
- Tuned with [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- CSP (// TODO - CspHtmlWebpackPlugin)
- Jest testing (// TODO)

&nbsp;<p align="center"><kbd>
![Lighthouse](https://raw.githubusercontent.com/ivanm376/test-project-bootstrap/main/lighthouse.png)
</kbd></p>
&nbsp;

### DOCKER-COMPOSE (\*under root user):

> docker-compose up -d  
> docker-compose stop

### LINUX TIP

Check you have enough watchers - https://webpack.js.org/configuration/watch/#not-enough-watchers:

> cat /proc/sys/fs/inotify/max_user_watches  
> echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

### DEVELOPMENT MODE

Open two terminals with

> docker exec -it project1_webapp_container bash

Install packages

> npm install --also=dev

Run in each terminal, separately, server and webpack

> npm run server-dev  
> npm run webpack-dev

Open https://localhost:3000/

##### \*To test server ssr in development mode:

> npm run server-dev-ssr

##### \*To login as root:

> docker exec -u root -it project1_webapp_container bash

### BUILD PRODUCTION CLIENT BUNDLE

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
