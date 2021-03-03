# react-ruler

> Made with create-storybook-react-library

[![NPM](https://img.shields.io/npm/v/react-ruler.svg)](https://www.npmjs.com/package/react-ruler) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://img.shields.io/travis/com/hentai-miao/react-ruler)](https://travis-ci.com/github/hentai-miao/react-ruler) [![Codecov](https://img.shields.io/codecov/c/github/hentai-miao/react-ruler)](https://codecov.io/gh/hentai-miao/react-ruler)

## Intro

This is a component for react.

## Feature

- [x] Easy-to-use
- [x] Typescript Support
- [x] Storybook UI component

## Install

```bash
npm install --save react-ruler
```

## Usage

```tsx
import React, { Component } from 'react'

import MyComponent from 'react-ruler'
import 'react-ruler/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

For Details: See Example

## Developing and running on localhost

First install dependencies and then install peerDeps for storybook dev:

```sh
npm install
npm run install-peers
```

To run Example in hot module reloading mode:

```sh
npm start   # or npm run storybook
```

To create a bundle library module build:

```sh
npm run build
```

## Testing

To run unit tests:

```sh
npm test
```

## License

MIT © [hentai-miao](https://github.com/hentai-miao)
