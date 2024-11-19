# Home Library Service

## Downloading

```
git clone https://github.com/YauhenMurachou/nodejs2024Q3-service
```

switch on docker branch

## Installing NPM modules

```
npm install
```

## Creation .env file

```
create file .env with content from .env.example
```

## Running application

You can run application directly

```
npm start
```
Or you can run application with docker

```
docker-compose -f ./docker-compose.yml up -d
```

Application runs by default on http://localhost:4000

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
