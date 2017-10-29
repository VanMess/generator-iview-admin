# generator-iview-admin
A yo generator with [iView](https://www.iviewui.com/) from tecvan.

## Installation

First, install [Yeoman](http://yeoman.io) and **generator-iview-admin** using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-iview-admin
```

Then generate your new project:

```bash
yo iview-admin
```
## What do you get?

Scaffolds out a complete generator directory structure for you:

```
.
├── .gitignore
├── .jshintrc
├── README.md
├── app.js
├── lib
│   ├── const
│   │   └── index.js
│   ├── controllers
│   │   └── index.js
│   ├── db
│   │   ├── mysql-redis-cache.js
│   │   ├── mysql.js
│   │   └── redis.js
│   ├── index.js
│   ├── logger
│   │   └── index.js
│   ├── middlewares
│   │   ├── filter.js
│   │   ├── koa-log4js.js
│   │   ├── request-id.js
│   │   └── x-response-time.js
│   ├── models
│   │   └── index.js
│   ├── routes
│   │   └── index.js
│   ├── schemas
│   │   └── index.js
│   ├── services
│   │   └── index.js
│   └── utils
│       ├── helper.js
│       ├── qiniu.js
│       └── resp-code-handler.js
├── package.json
├── pm2.json
└── public
```

## Run the demo

After the installation, we could run script to start server (http://localhost:8080).

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Versions

### 1.0.0

Just a simply yo template with: vue iview eslint and karma.
I translate the [vue webpack template](https://github.com/VanMess/webpack) from vue context to yo, and additionally define the base layout like this:
![v1 layout](./assets/v1-screen-capture.png).So you could start up CMS liked system more quickly.


## Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License
MIT © tecvan
