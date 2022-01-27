# covid-19 mongodb

## importgin database
start mongodb locally on your machine and naviage to the follwoing directory
```sh
cd COVID-19
mongorestore --username <username> --password <password> --authenticationDatabase admin --db <database_name> /covid-19-dump


```

## Installation

clone the repo and start mongodb locally on your machine
enter the database credentials in src/index.ts file

```sh
const connectionOptions =  {
    authSource: 'admin',
    dbName: 'covid-19',
    user: 'yourusername',
    pass: 'yourpassword',
    
}

```

Install the dependencies and devDependencies and start the server.

```sh
cd COVID-19
npm i
npm run build
npm run start:dev
```
## postman collection
```sh
https://www.getpostman.com/collections/2741fa47e58f2c2e08c0
```



