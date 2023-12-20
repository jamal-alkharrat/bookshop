# bookshop

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

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


### DB

To run command line interface:

```sh
docker exec -it bookshop-db mariadb --user=root --password=<password>
```

To show all databases:

```sh
SHOW DATABASES;
```

To create a new database:

```sh
CREATE DATABASE bookshop;
```

To use a database:

```sh
USE bookshop;
```

To create a new table:

```sh
CREATE TABLE buecher (
    ProduktID INT PRIMARY KEY,
    Produktcode VARCHAR(255),
    Produkttitel VARCHAR(255),
    Autorname VARCHAR(255),
    Verlagsname VARCHAR(255),
    PreisNetto DECIMAL(10, 2),
    Mwstsatz DECIMAL(10, 2),
    PreisBrutto DECIMAL(10, 2),
    Lagerbestand INT,
    Kurzinhalt TEXT,
    Gewicht DECIMAL(10, 2),
    LinkGrafikdatei VARCHAR(255)
);
```

To add new rows:

```sh
INSERT INTO buecher (ProduktID, Produktcode, Produkttitel, Autorname, Verlagsname, PreisNetto, Mwstsatz, PreisBrutto, Lagerbestand, Kurzinhalt, Gewicht, LinkGrafikdatei)
VALUES 
(1, 'PHP1', 'PHP im Überblick', 'Dr. Mustermann', 'Rheinwerk Verlag', 100, 19, 119.000, 100, 'sehr gutes Buch zu PHP mit vielen Beispielen', 1.5, '...'),
(2, 'PHP1', 'Java im Überblick', 'Dr. Mustermann', 'Rheinwerk Verlag', 50, 19, 58.500, 30, 'sehr gutes Buch zu Java mit vielen Beispielen', 1.7, '...'),
(3, 'PHP1', 'JavaScript im Überblick', 'Tom Meier', 'Springer Verlag', 100, 19, 119.000, 40, 'sehr gutes Buch zu JavaScript mit vielen Beispielen', 1.7, '...');
```

To show all rows:

```sh
SELECT * FROM buecher;
```