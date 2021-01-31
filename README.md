# 💫 Quotes Server
## Routes
HTTP Methods
* Get  ```/quotes/```
* Post ✔```/quotes/new``` and body ```{
  "content": "some text",
  "author": "Author name"
  }```
* Get ```/quotes/get/:id```
* Delete ❌ ```/quotes/delete/:id```
* Get ```/quotes/random```
* Patch ✏```/quotes/update/:id``` and body ```{"content": "new title"}```

## Project setup
```
yarn install
```
### Compiles
```
yarn start
```
