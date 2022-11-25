# CohortRecruitmentTool

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Due to the setting `baseHref` is `/`, a parameter must be added to build to generate a relative-path-workable build:

```
ng build --base-href="./"
```

Then you can serve the build in a sub-folder than root folder. For example:

```
https://example.com/CDT/
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Development 

Run Google Chrome without CORS requirements for debugging by adding the `--disable-web-security` flag

On Windows (Please replace the path to `chrome.ext` with the actual path in your environment):

```bash
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
```

On Ubuntu (make sure the `google-chrome` command is in the `PATH`):

```bash
google-chrome --disable-web-security
```

On MacOS:

```bash
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
