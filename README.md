# Collection page

This app is a full page with posibilities to search and create collections.

Made using Node.js, Express.js and React.js.

## Table of contents

* [Functionalities](#functionalities)
* [Setup](#setup)

<a href="collectionspage.vercel.appn" target="_blank">Link to deployed app</a>
(in progress, backend not connected)

## Functionalities

Right now we have full user auth backend site, rest api for user, collection and for item (*in progress*)

## Setup

To run this project, do the following steps:

* download repository files

```
 cd ../downloadLocation
 cd ../backend
    npm install
    mkdir .env ( here create POST=5000 variable, ACCESS_TOKEN_SECRET variable 
    and link MONGO_URL and frontend link  [default http:localhost:3000] )
    node server.mjs
    
 cd ../public
    npm install
    npm start
    
```
