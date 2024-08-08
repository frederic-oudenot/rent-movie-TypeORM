<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. Experimental try on NestJs and TypeORM.

     Create a reminder to customers with differents time :
     - day d-5 at noon
     - day d-3 at noon
     And we have to send e-mails to all customers
     (in this example simulating by log)

    - Add and modify customer account
    - rent one or several movie(s)
    - List all scheduling planned
    - Launch manually a scheduling planned
    - Check state for each scheduling planned

Using partially data from : [Sakila data](https://github.com/jOOQ/sakila/tree/main/postgres-sakila-db)

Using four entities : Customer, Film, Inventory, Rental

Swagger is installed : http://localhost:3000/api-docs

Enjoy !

## Installation

```bash
$ npm install
```

Do not forget to integrate data into .env file

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Stay in touch

- Portfolio - [Frédéric OUDENOT](https://frederic-oudenot.netlify.app/)
- Linkedin - [Frédéric OUDENOT](https://www.linkedin.com/in/frederic-oudenot/)

## License

Nest is [MIT licensed](LICENSE).
