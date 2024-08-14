# API Doc
DOC: [link](https://documenter.getpostman.com/view/6566451/2sA3s6EUpg)

# Seetickets Backend test

Welcome to the Seetickets backend test for new Hires (Mid Level). The purpose of this test is to evaluate a few assigned tasks given a codebase.

## Tech Stack

- Node 18.16.0 -> We want you to use this version of Node JS
- Express JS
- Postgres
- Mongo DB
- Docker

This API uses 2 data sources, one SQL and one NoSQL. Events and Tickets are stored in a SQL database while the settings should be stored as documents in Mongo DB.

## What will you need to have installed to do this test

- Docker (With docker compose to run the containers for the DBs)
- NVM to use the node version in the project

## Installing and running the project

- Fork this repository into your own GitHub
- Clone the fork in your machine
- Run yarn install to install the packages (We don't want to use NPM as all of our projects use yarn)
- Run `docker compose up` to get the databases up and running

### Running migrations for the Postgres DB

- Run `yarn migrations:latest` to migrate the DB
- Run `yarn db:seed` at least 2 times to create some data in the database, The more you run it the more data you will have to work with

### Run the API

- Run `yarn start` to start the express API (it uses nodemon to listen to code changes)
