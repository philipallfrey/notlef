# Notlef

This repository contains the code for my entry in the 2020 <a href="https://github.com/acdh-oeaw/ACDHchHackathon2020">ACDH-CH Virtual Hackathon</a>. The task was to design and implement a creative visualisation of the data and metadata contained in the <a href="https://dhcr.clarin-dariah.eu/">Digital Humanities Course Registry</a>.

A live version can be found at https://notlef-dhcr.web.app

## Installation
* You will need access to a **terminal/command line** to run many of the commands to install or run this code. Mac and Linux users have this installed already. I use a Git bash shell within [ConEmu](https://conemu.github.io/) on Windows.
* You will need **Node.js** and **npm** to run the code and install dependencies. If you do not have these installed already, I recommend installing the Node Version Manager (nvm) following the instructions at https://github.com/nvm-sh/nvm. Once this is installed you can simply type `nvm install node` in your favourite terminal to install the latest version, then `nvm use 13.9.0` or whatever your version number is. Alternatively you can install Node.js directly from https://nodejs.org/en/
* The code in this repository is an **Angular** app written in **Typescript**. If you don't use this framework or language, you will probably find it most convenient to install them (plus the associated linter) globally via npm:
`npm install -g @angular/cli typescript tslint`
I used version 9.0.4 of the Angular CLI.
* Once these prerequisites have been installed you need to **copy the source code** from this repository into a working directory on your computer. If you have a GitHub account, the easiest way is to type `git clone https://github.com/philipallfrey/notlef.git`, otherwise you can download a zip file using the green "Clone or download" button in the Github web interface, and unzip it into your directory.
* The final step is to **install all the dependencies**, for which you just need to type `npm install`

## Running locally
Run `ng serve --open` to run start a web server which will run the Notlef app on your computer. The `--open` flag automatically opens a browser tab to `http://localhost:4200/` where the app is running. It will automatically reload if you change any of the source files.

## Code structure
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.4.

Most of the relevant code is in `src/app`.
* `app.module` bootstraps the app.
* `app-routing.module` defines the permitted routes (i.e. URLs).
* `app.component` in this case just holds a `<router-outlet>` container to display the component that matches the route.
* Each route (overview, courses, etc) corresponds to a view, which are contained in the `views` directory. Here a view is just a special case of a component.
* Each view may be made up of reusable components, which are contained in the `components` directory.
* The charts are another special case of components, and are in their own `charts` directory for convenience.
* Within each component are three files: `.html` which contains the template for rendering, `.css` which contains the style rules, and `.ts` which contains the business logic for the component.
* I have tried to follow the principle of separation of responsibilities, and put functions which are not related to the display of data within a component in a service. These are in the `services` folder. E.g. the `CoursesViewComponent` only deals with setting up the variables to display, and defers the parsing of the data to the `CoursesViewDataService`, which in turn defers the fetching of data to the `ApiService`.
* Data models are defined as `Interfaces` in the `models` directory.
* Certain string constants are defined once in files in the `constants` directory, from where they can be imported into the files that require them, rather than being hardcoded into components.


## Generating new elements
The Angular command `ng generate component component-name` will generate the skeleton of a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module` to generate other elements.

To generate the skeleton for a new chart component, the analogous command is
`ng generate ng2-charts-schematics:line chart-name`, where `line` is the type of chart. See https://github.com/valor-software/ng2-charts for more details.

## Building
Run `ng build --prod` to build the project and compile to javascript. The built files will be stored in the `dist/` directory. The `--prod` flag indicates a production build. These files can then be deployed to a web server to make the available online.

## Deployment
I have deployed the live example to Firebase, which provides free https hosting. Instructions for deploying a project to Firebase can be found at https://firebase.google.com/docs/hosting/deploying
The short version is
* `npm install -g firebase-tools`
* `firebase login`
* `firebase init hosting`
* `ng build --prod`
* `firebase deploy`
