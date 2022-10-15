# Collection page

This app is a full page with posibilities to search and create collections.

Made using Node.js, Express.js and React.js.

## Table of contents

* [Functionalities](#functionalities)
* [Setup](#setup)

<a href="collectionspage.vercel.appn" target="_blank">Link to deployed app</a>
(in progress, backend not connected)

## Functionalities

Right now we have:
    
  On Backend site -
  
  *full user auth api, rest api for user, collections, items and comments api which specified endpoits,
  which let user to create, delete, update and get informations using specified thing id.*

  On Frontend site -

  *Work in Progress*

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
