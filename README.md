# ozip-test-requirement-monorepo

# Prerequisite
1. Install Node.js and NPM <br>
If you haven't already installed Node.js and npm (Node Package Manager), you need to install them. You can download and install Node.js from the official website: [Node.js Downloads](https://nodejs.org/en/download). Or if you use Ubuntu as your operating system,  you can go to [this pages](https://github.com/nvm-sh/nvm). The minimum node version for this project is v18.
2. Install Yarn (recommended) <br>
I use yarn for developing these apps, and it’s recommended to use 1 package manager in a project.
You can download and install from the official website: [Yarn Downloads](https://yarnpkg.com/)
3. Setup Postgresql <br>
I’m using postgresql for the databases, if you don’t have Postgresql installed on your device, you can check their official website [here](https://www.postgresql.org/download/). Or if you use Ubuntu for your operating system, you can follow this website on [how to set up Postgresql on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart).

# Quickstart

1. Run script
```shell
yarn install
```
or if you using npm instead of yarn
```shell
npm install
```
2. Run the project <br>
- Default port for FE is 3000, and BE is 3100
- Run these scripts in terminal
```shell
yarn workspace query-browser-frontend dev
yarn workspace query-browser-backend start
```
