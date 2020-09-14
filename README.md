## The Shoppies API

Node API created for [the Shoppies](https://github.com/JessieW0010/Shoppies) frontend application. Authenticated users can search the api for movies and add them to their list of nominations. Powered by the [OMDB API](http://www.omdbapi.com).

## Installation and Setup Instructions

To clone this repository you will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`    

Configuration:

* You need to add your own `.env` file to the root directory containing all the variables listed in the `.env.example`. This includes an OMDB API key which you can get for free by following [this link](http://www.omdbapi.com/apikey.aspx) as well as a secret JWT key which you can set to anything. 
* To connect the server to a local/ hosted database you will need to toggle the development configurations found in the `knexfile.js` at the root of the project.

To Start Server:

`npm start` 

## Endpoints

### Register account

#### Request

`POST /auth/register`

    curl --location --request POST 'http://localhost:8000/auth/register'
         --header 'Content-Type: application/json'
         --data-raw '{"first_name":"John","last_name":"Doe","email":"johndoe@email.com","password":"123123"}'

#### Response

`Status: 200`

    {"msg": "Account created!", "token": "eyskjfoisudfw234234jksdfjsaklfjl125sdfas4s"}}

`Status: 409`

    {"msg": "Email already exists."}}
    
`Status: 500`

    {"msg": "Internal server error."}}
    
### Login (returning users)

#### Request

`POST /auth/login`

    curl --location --request POST 'http://localhost:8000/auth/login'
         --header 'Content-Type: application/json' \
         --data-raw '{ "email": "jodo@gmail.com", "password": "123123" }'

#### Response

`Status: 200`

    {"msg": "Login successful", "token": "eyskjfoisudfw234234jksdfjsaklfjl125sdfas4s"}}

`Status: 401`

    {"msg": "Invalid Credentials."}}
    
`Status: 500`

    {"msg": "Internal server error."}}
    
### Search movie by title

#### Request

`POST /search/title`
* note that page is an optional parameter

    curl --location --request POST 'http://localhost:8000/search/title'
         --header 'Content-Type: application/json'
         --header 'Authorization: Bearer eyskjfoisudfw234234jksdfjsaklfjl125sdfas4s'
         --data-raw '{ "title": "rambo", "page": 2 }'

#### Response

`Status: 200`

    { "movies": [{
          "Title":"Rambo",
          "Year":"2008",
          "imdbID":"tt0462499",
          "Type":"movie",
          "Poster":"https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_SX300.jpg"},...],
      "totalResults":"36"
    }

`Status: 500`

    {"msg": "Internal server error."}}

### Search movie by id

#### Request

`POST /search/id`

    curl --location --request POST 'http://localhost:8000/search/id'
         --header 'Content-Type: application/json'
         --header 'Authorization: Bearer eyskjfoisudfw234234jksdfjsaklfjl125sdfas4s'
         --data-raw '{ "id": "ghd83" }'

#### Response

`Status: 200`

    {"movie": {
        "Title":"Rambo",
        "Year":"2008",
        "Rated":"R",
        "Released":"25 Jan 2008",
        "Runtime":"92 min",
        "Genre":"Action, Thriller",
        "Director":"Sylvester Stallone",
        "Writer":"Art Monterastelli, Sylvester Stallone, David Morrell (character)",
        "Actors":"Sylvester Stallone, Julie Benz, Matthew Marsden, Graham McTavish",
        "Plot":"Vietnam veteran John Rambo has survived many harrowing ordeals in his lifetime and has since withdrawn into a simple and...",
        "Language":"English, Burmese, Thai",
        "Country":"Germany, USA, Thailand",
        "Awards":"1 win & 1 nomination.",
        "Poster":"https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_SX300.jpg",
        "Ratings":[{"Source":"Internet Movie Database","Value":"7.0/10"},{"Source":"Rotten Tomatoes","Value":"38%"},{"Source":"Metacritic","Value":"46/100"}],
        "Metascore":"46","imdbRating":"7.0",
        "imdbVotes":"215,187",
        "imdbID":"tt0462499",
        "Type":"movie",
        "DVD":"27 May 2008",
        "BoxOffice":"$42,724,402",
        "Production":"Lionsgate",
        "Website":"N/A","Response":"True"
    }}

`Status: 500`

    {"msg": "Internal server error."}}

### Nominate a movie

#### Request

`POST /nominate`

    curl --location --request POST 'http://localhost:8000/nominate'
         --header 'Content-Type: application/json'
         --header 'Authorization: Bearer eyskjfoisudfw234234jksdfjsaklfjl125sdfas4s'
         --data-raw '{ "imdbIDs": ["1dj37", "93hj23", "1hg45"] }'

#### Response

`Status: 200`

    {"msg": "Successfully nominated movies."}

`Status: 500`

    {"msg": "Internal server error."}}

### Unnominate a movie

#### Request

`POST /nominate/undo`

    curl --location --request POST 'http://localhost:8000/nominate/undo'
         --header 'Content-Type: application/json'
         --header 'Authorization: Bearer eyskjfoisudfw234234jksdfjsaklfjl125sdfas4s'
         --data-raw '{ "imdbID": "1dj37" }'

#### Response

`Status: 200`

    {"msg": "Successfully deleted nomination."}

`Status: 500`

    {"msg": "Internal server error."}}
    
### Get all user's nominated movies

#### Request

`GET /nominate`

    curl --location --request GET 'http://localhost:8000/nominate'
         --header 'Content-Type: application/json'
         --header 'Authorization: Bearer eyskjfoisudfw234234jksdfjsaklfjl125sdfas4s'

#### Response

`Status: 200`

    {"nominated": [{
          "Title":"Rambo",
          "Year":"2008",
          "imdbID":"tt0462499",
          "Type":"movie",
          "Poster":"https://m.media-amazon.com/images/M/MV5BMTI5Mjg1MzM4NF5BMl5BanBnXkFtZTcwNTAyNzUzMw@@._V1_SX300.jpg"}, ...]
     }

`Status: 500`

    {"msg": "Internal server error."}}
