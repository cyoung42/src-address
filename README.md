# SRC Address Book

### Installation
Run `npm install` inside of repo directory
This assumes you have a running mysql/mariadb instance on the localhost at 127.0.0.1 with user 'root' and empty password.


### Full system
Run `npm run start` to build Angular and then start the Node server for interaction with mariadb. Navigate to `http://localhost:3000`

### Angular
Run `ng serve` for just the angular front-end. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Express & Node
Run `node server.js` or `nodemon server.js` to run the node server and express API to connect to mariadb
