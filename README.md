# DBS2Frontend

Frontend pro projekt pro KIKM/DBS2 a KIT/TNPW2.

- [backend projektu](https://github.com/jsfraz/dbs2)

Tento projekt byl vytvořen pomocí [Angular CLI](https://github.com/angular/angular-cli) verze 19.2.0.

## Vývojový server

Chcete-li spustit místní vývojový server, spusťte:

```bash
ng serve
```

Po spuštění serveru otevřete prohlížeč a přejděte na adresu `http://localhost:4200/`. Aplikace se automaticky znovu načte, kdykoli změníte některý ze zdrojových souborů.

## Instalace a spuštění OpenAPI CLI generátoru ([zdroj1](https://www.npmjs.com/package/ng-openapi-gen), [zdroj2](https://github.com/cyclosproject/ng-openapi-gen/issues/330#issuecomment-2403937683))

<!--
```bash
npm install -g ng-openapi-gen
ng-openapi-gen
```
-->

```bash
npm install -g ng-openapi-gen
npm run apigen
```

Použitá konfigurace je uložena v souboru [ng-openapi-gen.json](ng-openapi-gen.json).

<!--
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
-->