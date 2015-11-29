# React & Redux Start Kit

React + Redux + Webpack + Hot Reloading

**Main packages**
- [react](https://facebook.github.io/react/docs/getting-started)
- [react-router](https://rackt.github.io/react-router/)
- [react-redux](https://github.com/gaearon/react-redux)
- [redux](http://rackt.github.io/redux)
- [redux-simple-router](https://github.com/jlongster/redux-simple-router)
- [redux-api](https://github.com/lexich/redux-api)

## Setup

### Installing

Grab the repo
```shell
git clone git@github.com:loklaan/react-redux-kit.git react-redux-kit
```

Install npm dependencies
```
$ npm i
```

### IDE

#### Linting
If you want linting, it is best to set that up in your IDE or Editor.

#### Autocompletion
Specifically with WebStorm, you can enable Autocompletion for third party programs via typescript definition stubs, found in `Languages & Frameworks` > `JavaScript` > `Libraries`.

This can be useful when using `lodash`. Also useful for `redux` and `react` / `react-dom`.

## Directory Structure

Here is the quick and easy about directories you'll likely be using.

```
.
├── bin                     // Webpack Server
├── build                   // Webpack Configuration
├── config                  // Project Configuration
├── dist                    // Dist files, from builds
├── src                     // Where the magic begins
│   ├── actions                 // Redux ActionCreators
│   ├── components              // Dumb React components
│   ├── constants               // Project / ActionType constants
│   ├── containers              // Smart React components
│   ├── reducers                // Redux Reducers
│   ├── services                // API Services, using redux-api
│   ├── styles                  // CSS Styles - css-modules enabled
│   ├── utils                   // Utility functions
│   ├── views                   // Top-level React Route components
│   ├── readme.md               // You're reading
│   ├── routes.js               // React & Redux route handling
│   ├── index.html              // Bootstrap html
│   └── app.js                  // App bootstrap
└── tests                   // Tests, which probably won't exist
```
