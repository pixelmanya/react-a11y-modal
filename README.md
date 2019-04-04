# react-a11y-modal

[![Build Status](https://travis-ci.com/pixelmanya/react-a11y-modal.svg?branch=master)](https://travis-ci.com/pixelmanya/react-a11y-modal) [![NPM](https://img.shields.io/npm/v/react-a11y-modal.svg)](https://www.npmjs.com/package/react-a11y-modal) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

An accessible & customizable modal dialog for [React](https://reactjs.org) built with [Hooks](https://reactjs.org/docs/hooks-intro.html) under the hood. It provides developers a decent-looking modal which they can use right away without worrying much about styling. However, if you need custom styles, it's of course possible.

## Contents

* [Installation](#installation)
* [Usage](#usage)
* [Docs](#docs)
* [Examples](#examples)
* [Accessibility](#accessibility)
* [License](#license)

## Installation

Use either [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

```bash
npm install --save react-a11y-modal
yarn add react-a11y-modal

```

## Usage

There are plenty of [props](https://pixelmanya.github.io/react-a11y-modal/#props) available, which you can pass to `<Modal.Container />`.

### Basic modal

```jsx
import { Modal } from 'react-a11y-modal';

<Modal.Container>
  <h1>Title</h1>
  <button>Close</button>
</Modal.Container>
```

### Header, Body and Footer

```jsx
import { Modal } from 'react-a11y-modal';

const HeaderBodyAndFooterModal = () => (
  <Modal.Container>
    <Modal.Header>
      <h1>Title</h1>
      <button>Close</button>
    </Modal.Header>
    <Modal.Body>
      <p>Body</p>
    </Modal.Body>
    <Modal.Footer>
      <button>Footer button</button>
    </Modal.Footer>
  </Modal.Container>
);

export default HeaderBodyAndFooterModal;
```

## Docs

For detailed documentation there is [page](https://pixelmanya.github.io/react-a11y-modal) with everything you need to know.

## Examples

* [Basic Modal](https://pixelmanya.github.io/react-a11y-modal/#basic-modal)
* [Modal with Header, Body and Footer](https://pixelmanya.github.io/react-a11y-modal/#with-header-body-and-footer)
* [Unstyled Modal](https://pixelmanya.github.io/react-a11y-modal/#unstyled-modal)
* [Nested Modal](https://pixelmanya.github.io/react-a11y-modal/#nested-modal)
* [Confirmation Modal](https://pixelmanya.github.io/react-a11y-modal/#confirmation-modal) (custom)
* [Sign-in Modal](https://pixelmanya.github.io/react-a11y-modal/#sign-in-modal) (custom)

## Accessibility

react-a11y-modal was designed to follow the [W3C Specification](https://www.w3.org/TR/wai-aria-practices/#dialog_modal). 

## License

MIT © [pixelmanya](https://github.com/pixelmanya)
