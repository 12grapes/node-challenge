<p align="center">
  <img height="100px" src="https://bunch.ai/wp-content/themes/bunch/images/bunch-logo-rgb.svg" alt="Bunch" />
</p>

# Node.js Coding Challenge

## Background

This repository contains:

* a Koa API
* Docker configuration to run Elasticsearch and Kibana

The Koa API exposes two routes, `/health` and `/health/weekly-report`. The first one is a route that logs incoming requests in elasticsearch, including the request's IP, timestamp and other information. The second route allows to do weekly reports on the health of this service.

While this might not be a realistic scenario (the aggregates can be done using Kibana dashboards, and the logs collected with tools such as `fluentd`), it allows to perform tasks that will be pretty common when working on our Node.js backend stack. We use elasticsearch a lot to index documents and perform aggregations, while exposing them on Node.js APIs with good test coverage.

## Build & Run

```sh
docker-compose up -d elasticsearch kibana
yarn install
yarn dev
# once the API is dockerized
docker-compose build
docker-compose up
```

## Linting

Standard is used to lint this project.

```sh
yarn lint
yarn lint:fix
```

## Testing

Use the following scripts to run tests:

```sh
# Lint & run tests with NODE_ENV=test
yarn test
# console coverage + HTML report in ./coverage/index.html
yarn test:cover
# update snapshots
yarn test:update
# Watch all changes
yarn test:watch
```

## Challenge tasks

You can perform a search on "TODO:" in all files to obtain the emplacement of each of the following tasks:

* Dockerize the API. A `docker-compose` file is already provided, once the application is dockerized, it will have access to elasticsearch (available through http://elastic:9200). If you cannot Dockerize the API, you can do the following to continue the challenge:

```sh
# Starts the required infrastructure
docker-compose up -d elasticsearch kibana
# Starts the API with a file watch, works on all platform
yarn dev
```

* Write unit tests for the all the `/health` routes. The other part of the application do not need to be tested for this challenge. This should also bring the coverage above the thresholds specified in `package.json`.

* Implement the `GET /health/weekly-report` route by writing a single elasticsearch query to retrieve a weekly aggregate of healthchecks, grouped by requesting IP and URL. To generate data, perform a few calls to the `GET /health` endpoint, you can visualize the data with Kibana (running with `docker-compose` on http://localhost:5601/app/kibana)

* (Bonus) Write a middleware to log HTTP requests in the application. It must contain the response status code, request path and time taken to process the request server-side. Additionaly, you can also set a custom HTTP header to indicate the time taken to the client.

* (Bonus) Write an error logging middleware. When in development (`NODE_ENV=development`), it should log the entire `error` and include it in the reponse. When in production (`NODE_ENV=production`), it should only return the `error.message`.

* (Bonus) Build a CI pipeline with the tool of your choice. We like to run tests within containers in CI environments.

* (Bonus) Add a Redis instance in `docker-compose` and cache results of the `GET /health/weekly-report` requests with an expiration of 10 minutes.

## Deliverables

Submit the result either by either sharing your fork of this repository on Github or by sending your local repository as a compressed archive via email/gist (if you want the challenge to remain private).

## Expected time

We expect you to spend 2-4 hours on this challenge. If you find yourself spending more time on it, you can send your results as it should be enough to evaluate. The Bonus questions will take the challenge clearly out of this 2-4 hours timeframe, so it's completely OK if you don't have enough free time to do them.

**Tips:**

* Make sure to remain focused and not get side-tracked, or the challenge will take more than 4 hours to complete.
* We are also not expecting production ready code, so you can leave out some aspects you would otherwise consider important (however, documenting these decisions is always a plus).
