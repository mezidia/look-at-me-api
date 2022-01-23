# look-at-me-api

## About repository
This is the api for [look-at-me](https://github.com/mezidia/look-at-me) platform.

The api implements P2P connection using WebRTC standard. 

Tech stack: f[astify](https://www.fastify.io/), [socket.io](https://socket.io/).

## Docker
There is a docker-compose.yml file. It can be used to run application locally. For that you have to download [docker-compose.yml](https://github.com/mezidia/look-at-me-api/blob/main/docker-compose.yml). In file's directory run command:
``` 
$ docker-compose up -d
```
After that, the app will be running on port 3000, so the platform will be available at http://localhost:3000/

## Run locally 
To run locally, the two repositores have to be cloned: 
- [look-at-me-api](https://github.com/mezidia/look-at-me-api)
- [look-at-me](https://github.com/mezidia)
