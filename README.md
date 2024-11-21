# Product APIS

This express app contains all the APIs of Product microservices of an e-comming application.

## Setup/Run App

1. Clone the repo
2. Install NodeJS
3. Open terminal, go to the project directory and run below commands
   
        npm i
        npm start

## Build Docker Image & Run

Build the docker images  by running following:

1. Make sure dockerd is up & running
2. Navigate to the home directory say 
```shell
cd <..>/product-apis
```

3. Build docker image
```shell
docker build -t product-apis .
```
4. Run generated image
```shell
docker run -d -p 4003:4003 product-apis
```