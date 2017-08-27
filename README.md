 <!-- [![Build Status][travis-badge]][travis-badge-url] 
[![Coverage Status][coveralls-badge]][coveralls-badge-url]
[![Dependency Status][david-badge]][david-badge-url]
[![devDependency Status][david-dev-badge]][david-dev-badge-url]

[travis-badge]: https://travis-ci.org/fjrd84/health-nlp-frontend.svg?branch=master
[travis-badge-url]: https://travis-ci.org/fjrd84/health-nlp-frontend
[coveralls-badge]: https://coveralls.io/repos/github/fjrd84/health-nlp-frontend/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/fjrd84/health-nlp-frontend?branch=master
[david-badge]: https://david-dm.org/fjrd84/health-nlp-frontend.svg
[david-badge-url]: https://david-dm.org/fjrd84/health-nlp-frontend
[david-dev-badge]: https://david-dm.org/fjrd84/health-nlp-frontend/dev-status.svg
[david-dev-badge-url]: https://david-dm.org/fjrd84/health-nlp-frontend?type=dev -->

# HealthNlpFrontend (React)

This repository contains the frontend part of the ***health-nlp*** project.

The ***health-nlp*** project is an NLP (Natural Language Processing) demo composed by the following repositories:

- [health-nlp-react](https://github.com/fjrd84/health-nlp-react): frontend part. It displays the results of the analysis (stored in firebase) and explains everything about the project. It is a react+redux web application.
- [health-nlp-node](https://github.com/fjrd84/health-nlp-node): nodeJS/express backend for the health-nlp-angular frontend. It takes new job requests and sends them to the beanstalkd job queue.
- [health-nlp-analysis](https://github.com/fjrd84/health-nlp-analysis) (this repository): it processes jobs from beanstalkd and sends the results to firebase. It is a Python project.

This project is still on an early stage of development. As soon as there's an online demo available, you'll find a link here.

[Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.31 was used to scaffold the first commit of this repository.

## Development server

Run `npm start` or `yarn start` to start a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `yarn test` to run the unit tests.

## Create React App

This project has been scaffolded with [create-react-app](https://github.com/facebookincubator/create-react-app). Visit its repository for more information.