# bookshop

VueJS Webstore for a bookshop

## Table of Contents

- [Project Structure](#project-structure)
- [Recommended IDE Setup](#recommended-ide-setup)
- [Customize configuration](#customize-configuration)
- [Project Setup](#project-setup)
  - [Compile and Hot-Reload for Development](#compile-and-hot-reload-for-development)
  - [Compile and Minify for Production](#compile-and-minify-for-production)
  - [Run Unit Tests with Vitest](#run-unit-tests-with-vitest)
  - [Run End-to-End Tests with Cypress](#run-end-to-end-tests-with-cypress)
  - [Lint with ESLint](#lint-with-eslint)

## About

This is a webstore built with VueJs for front-end. It uses a MariaDB to store the data and a PHP API to communicate with the database and handle the requests. For more information about the API, please visit [this repository](https://github.com/jamal-alkharrat/bookshop-php-api).

## Features

- [x] Responsive design
- [x] Search for books
- [x] Add books to cart
- [x] Remove books from cart
- [x] Checkout (purchase using Stripe)
- [x] View all orders as admin
- [x] Change product quantity as admin
- [x] Authentication

## Technologies

- [VueJs](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [MariaDB](https://mariadb.org/)
- [PHP](https://www.php.net/)
- [Stripe](https://stripe.com/)
- [Vitest](https://vitest.dev/)

## Project Structure

The project is structured in the following way:

- `src` contains the source code of the project
  - `assets` contains the static assets of the project
  - `components` contains the Vue components of the project
  - `router` contains the Vue router configuration
  - `store` contains the Vuex store configuration
  - `views` contains the Vue views of the project
  - `App.vue` is the root component of the project
  - `main.ts` is the entry point of the project


## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```