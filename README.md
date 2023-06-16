# Blog App

[View Live](https://shirsho-blog.netlify.app)

[API Repository](https://github.com/ShirshoDipto/blog-api)

There will be a gif here.

## Technologies used

1. MongoDB (with mongoose)
1. Express
1. React
1. Node.js
1. TinyMCE
1. Passpost.js
1. JWT
1. Html react parser
1. Multer
1. Express Validator

and more

## Features

The following are the main features of this app.

### 1. Authentication

- Login and Signup with username and password.
- Login and Signup form validation using express validator.
- Logout

### 2. Posts, Comments, Likes

- CRUD for posts, comments, likes

### 3. TinyMCE Advance features

- Include images with posts
- Add tables to posts' contents
- Add iframes with posts

May be a gif here.

## Running Locally

To run the API locally, follow the instructions given in the [API Repository](https://github.com/ShirshoDipto/blog-api)

### Clone Repository

```
git clone git@github.com:ShirshoDipto/blog-client.git
```

```
cd blog-client
```

### Set up local variables

```
TINY_KEY = <An API key optained from TinyMCE account>

REACT_APP_ROOT = <Address of the client, e.g http://localhost:3000>

REACT_APP_PROXY = <Address of the api proxy, e.g http://localhost:5000/api>

REACT_APP_SERVERROOT = <Address of api server, e.g http://localhost:5000>
```

### Install packages and start

```
npm install
```

```
npm run build
```

```
npm install -g serve
```

```
serve -s build
```
