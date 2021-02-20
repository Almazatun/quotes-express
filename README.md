# Blog posts server | 🏗 MERN

A blog posts server made with Typescript, Express, Node JS.

## Installation

1. Clone project

```
https://github.com/Almazatun/blog-posts-MERN.git
```

2. Download dependencies

```
yarn install
```

## Routes

### Plural routes
```
GET /posts
GET /posts/:id
DELETE posts/:id
PATCH posts/:id
```

## API
Returns middlewares used by Blog-posts Server
* options
  * `bodyParser` enable body-parser middleware
  * `Cors` enable CORS ( `credentials: true, origin: process.env.HOST || http://localhost:3000 `)
  * `Express`  enable express middleware
  * `Mongoose` provide to work with MongoDB database ( connection configuration: `{useNewUrlParser: true, useUnifiedTopology: true}` )

## Usage

You can start the server with yarn run dev then navigate to http://localhost:3010.

## 💡 Features
* Ability to register in the application
* Login
* Logout - client feature
* JSON Web Token
* Generate Token
* Authentication middleware
* Create post
* Delete post
* Update post
* Get particular post by id
* Get all posts

## Packages
This project is made up of 2 packages that share code using Yarn Workspaces.
* web 👁 🏗 ( React + Typescript + Redux-Toolkit + React-Router-Dom + React-Redux )
* server 🧬 🏗 ( MongoDB database + Express + NodeJS + Typescript + Mongoose)

## ▶️  Web Demo
![front](/src/public/prevVue.gif/)

### Usage Web Application 👨‍🚀
Fake account on the Web Application 
 * userName: person
 * password: 2223331
