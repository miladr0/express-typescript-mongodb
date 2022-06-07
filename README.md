### Features

- **DataDog** trace performance.
- **Sentry** catch errors.
- **API Documentation** using **Swagger**.
- **Basic Security Features** using Helmet and hpp.
- **Validation** using class-validator
- **class base routing** using routing-controllers
  ...

<br />

## ❯ Getting Started

1- install dependencies

```bash
yarn
```

2- use docker-compose, if you prefer to only run mongodb inside container and run Node.js app locally, you can comment it out in docker-compose file.

```bash
docker-compose up
```

3- set `.env.development.local` file with your credentials.

4- run the app

```bash
yarn run dev
```

<br />

you can access swagger documentation at `http://localhost:3000/api-docs`


<br>
<br>
<br>

### Code Review Comments

1- No `package-lock.json` file.

- The goal of package-lock.json file is to keep track of the exact version of every package that is installed so that a product is 100% reproducible. So I added it. actually I used yarn instead.

2- analyze of `package.json` file.

 - `main` point to none existing path. added appropriate path.
 - `private` not set to prevent accident publish to npm.
 - `engine` sets which versions of Node.js this package/app works on
 - `repository` set version controls to git and added github address.
 - `bug` Links to the package issue tracker
 - `homepage` added link to home page
 - `author` updated
 - some of dependency were unused like `luxon`, `chart.js` or `express-handlebars`, I removed them.
 - updated some dependencies to latest versions. like `mongoose`, `ts-node-dev`, `dotenv`...
 - moved @types to `devDependencies`. along with other packages that no needs to be part of `dependencies` like typescript, ts-node-dev...
 
3- added eslint, prettier configuration and package to have consistent code style.

4- added absolute path to `tsconfig.json` file. to have more clear file path.

5- updated `target` to next js to avoid extra polyfill.

6- added PM2 and its ecosystem.config for deploy with PM2.

7- added tests using jest.

8- added `helmet` to add security headers.

9- added `hpp` to prevent parameter pollution.

10- there is no `.gitignore` file. to prevent accident push to git.

11- added `.env.development` file to store your credentials for different environments.

12- there wasn't any documentation for API so I added swagger documentation.

14- moved routes and their controllers to separate files.

15- define a code structure for the project. for example for for each middleware, common types, exceptions, etc.

16- moved current route APIs to under `v1` prefix. this way later we can introduce eg. `v2` and we don't need to be worry about old APIs.

17- removed `var` and redundant `express` and `cors` from `simulator.router`

18-  moved database interaction to service layer and split it from controller. its give us better control, and easier to test.

19- define interfaces for models, this way we can use power of typescript inside our services to have better implmention like what will be type of a return for functions.

20- there wasn't any validation so I've added `class-validator` to validate use inputs.

21- some routes under the hoods are using `find` which will return all docs on MongoDB and if number of docs are huge then its not good for performance, I've added pagination to returns data.

22- `console.log` is not good for log the things, instead we can use `winston` and `morgan` or cloud logs.

23- in `seed.ts` file script try to insert none-exist fields like `start_date`, `check_date` removed them and replace them defined fields like `dateRecorded`.

24- as `profile_id` is a reference, I defined it as ref inside `simulator` and `favorite` models.

25- many operation in monetary world use big numbers to be precise which outside the range of safe values to use in javascript thus on MongoDB level we can define our numbers with `Decimal128` type and on js side we can use BigNumber... packages.