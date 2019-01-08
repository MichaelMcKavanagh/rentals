# One Day Car Rentals Api

Microservices demo

There is an exposed api (http://localhost/offer) with two private microservices which respond to offer requests, each for a different fake rental offer company.


## Installation

Run the following commands:

```
npm i yarn -g
git clone https://github.com/MichaelMcKavanagh/rentals.git
cd rentals
yarn install
```

## Docker

For a single instance of each service you can just do:
```
docker-compose up
```

However, you can optionally scale up multiple offer service instances.  Example below:
```
docker-compose up --scale offer-a-service=3 --scale offer-b-service=3
```

Other useful commands:
```
docker-compose down
docker-compose build
```

## Testing

Run unit tests:
```
yarn test
```

Run integration tests (These will only pass if the app is running locally):
```
yarn test:integration
```


## Logging

Unified logging files (`error.log` and `combined.log`) are available within the logger service, but currently you'll have to exec into the service to see them.

## Localhost

Quick verification check (note, multiple calls will result in api returing some offers from companyA, and some from companyB):

```
http://localhost/offer
```

# Author

Michael McKavanagh <michaelmckavanagh@gmail.com>
