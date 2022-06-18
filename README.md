### Features

- **Sentry** catch errors.
- **API Documentation** using **Swagger**.
- **Basic Security Features** using Helmet, hpp and xss clean.
- **Validation** using class-validator
- **class base routing** using routing-controllers
  ...

<br />

## Getting Started

1- install dependencies

```bash
yarn
```

2- use docker-compose, if you prefer to only run mongodb inside container and run Node.js app locally, you can run the below command.

```bash
yarn docker:db
```

3- set `.env.development.local` file with your credentials.

4- run the app

```bash
yarn dev
```

<br />

you can access swagger documentation at `http://localhost:3000/api-docs`

<br>
<br>
<br>
