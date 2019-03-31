# react-a11y-modal

> This accessible modal (dialog) for React was mainly built because I wanted to learn the recently introduced React Hooks. I also wanted to provide developers a decent-looking modal which they could use right away without worrying much about styling.

[![Build Status](https://travis-ci.com/pixelmanya/react-a11y-modal.svg?branch=master)](https://travis-ci.com/pixelmanya/react-a11y-modal)[![NPM](https://img.shields.io/npm/v/react-a11y-modal.svg)](https://www.npmjs.com/package/react-a11y-modal) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Install

```bash
npm install --save react-a11y-modal
yarn add react-a11y-modal

```

## Usage

More examples? Custom styles? Start with looking at the [props here](https://pixelmanya.github.io/react-a11y-modal/#props)!

```jsx
import React from 'react';
import { Modal } from 'react-a11y-modal';

const App = () => (
  <Modal.Container>
    {({ actions }) => (
      <>
        <Modal.Header>
          <h1>Title</h1>
          <button onClick={actions.close} />
        </Modal.Header>
        <Modal.Body>
          <p>Some text too.</p>
        </Modal.Body>
      </>
    )}
  </Modal.Container>
);
```

## Docs & Examples

For detailed docs and examples please check [this out](https://pixelmanya.github.io/react-a11y-modal)

## License

MIT © [pixelmanya](https://github.com/pixelmanya)
