# First Redis Server

Deployed Node.js app that uses Redis Server to cache responses.

## Setup Instructions
- Install WSL or use a Linux system
- ```sudo apt install gcc make pkg-config```
- ```npm install && npm start``

## Steps to Create
- npm init
- npm i redis express cross-fetch
- write app.js to use Redis
- wrote deploy/build_redis.sh to deploy on Heroku
- removed deploy/build_redis.sh since Heroku does not allow running sh scripts
- added commmands to heroku-postbuild
- fixed error "redis-server is not found" by navigating to directory where installed and running executable
  - Tested script on WSL Ubuntu
    - Installed on Ubuntu - ```sudo apt install gcc make pkg-config```
  - added info to scripts/ for clarity
- got new app.js code from different tutorial - https://www.sitepoint.com/using-redis-node-js/
- ```npm i concurrently``` - to start both Redis & Express servers at the same time
=> Need to pay to use on Heroku - different machines build vs serve your code
  - therefore, unable to run wget installed

## Issues
- Heroku uses different machines for "heroku-postbuild" & serving code, therefore, need to install Redis on machine that's serving code rather than run inside "heroku-postbuild"
- Heroku terminates if app doesn't start in 60 seconds (wget sometimes takes longer than 60 seconds to download & unzip)
- Heroku thinks my start command failed when it succeeded -  ```Timed out running buildpack Node.js```
- Every time it starts, it runs install for Redis