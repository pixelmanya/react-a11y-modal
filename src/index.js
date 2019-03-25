/** @jsx jsx */

import React, { useEffect, useContext, useRef } from 'react'
import ReactDOM from 'react-dom'
import { jsx } from '@emotion/core'
import styles from './styles'
import FocusTrap from 'focus-trap-react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import mapKeys from 'lodash/mapKeys'
import {
  ModalContext as Context,
  ModalContextProvider as Provider,
  ModalContextConsumer as Consumer
} from './context'
import {
  createElement,
  filterAllowedChildren,
  getMapOfChildrenUsed,
  applyStyles
} from './helper'

export const defaultProps = {
  namespace: 'Modal',
  backdropTagName: 'div',
  containerTagName: 'dialog',
  className: '',
  mountTo: null,

  shallHide: false,
  isOpen: true,
  shouldCloseOnBackdropClick: true,
  shouldCloseOnEscClick: true,
  classNameWhenOpenend: 'modal-is-opened',
  waitUntilUnmountInMs: 0,

  styles: {
    backdrop: {},
    backdropAfterMount: {},
    backdropBeforeUnmount: {},
    container: {},
    containerAfterMount: {},
    containerBeforeUnmount: {},
    header: {},
    body: {},
    footer: {}
  },

  onBeforeShow: () => {},
  onAfterShow: () => {},
  onBeforeClose: () => {},
  onAfterClose: () => {},
  onEscClick: () => {},
  onBackdropClick: () => {},
  onClose: false,

  refs: {
    backdrop: () => {},
    container: () => {},
    header: () => {},
    body: () => {},
    footer: () => {}
  }
}

const Modal = {
  Header: createElement('Header'),
  Body: createElement('Body'),
  Footer: createElement('Footer'),
  Container ({
    children,
    ...props
  }) {
    return (
      <Provider>
        <Container {...props}>
          { children }
        </Container>
      </Provider>
    )
  }
}

function Container({
  children,
  mountTo
}) {
  const { state, actions } = useContext(Context)
  const backdropRef = useRef(null)
  const containerRef = useRef(null)

  // when we got passed a function as children
  // then lets execute it and pass the actions
  children = typeof children === 'function'
    ? children({ actions })
    : children

  // check children against blacklisted elements
  // and remove any if necessary
  children = filterAllowedChildren({
    children,
    blacklist: [ Modal.Container ]
  })

  // mapOfChildrenUsed tells us which components
  // have been used => { Header: true, Body: true, Footer: false, ... }
  const mapOfChildrenUsed = getMapOfChildrenUsed({
    children,
    Modal
  })
  const hasHeaderBodyAndFooter =
    mapOfChildrenUsed.Header &&
    mapOfChildrenUsed.Body &&
    mapOfChildrenUsed.Footer

  // effect for applying potential styles
  // to backdrop and container
  useEffect(() => {
    let myStyles = {}

    if (actions.hasStyles('backdropAfterMount')) {
      myStyles = {
        ...myStyles,
        backdrop: {
          ...styles.Backdrop.styles,
          ...state.styles.backdrop,
          ...state.styles.backdropAfterMount
        },
        backdropAfterMount: {}
      }
    }

    if (actions.hasStyles('containerAfterMount')) {
      myStyles = {
        ...myStyles,
        container: {
          ...state.styles.container,
          ...state.styles.containerAfterMount
        },
        containerAfterMount: {}
      }
    }

    if (Object.keys(myStyles).length) {
      applyStyles({
        state,
        actions,
        styles: myStyles
      })
    }
  })

  // effect for shouldCloseOnEscClick
  useEffect(() => {
    const onKeyDown = e => {
      if (
        state.isOpen &&
        (e.key === 'Escape' || e.key === 'Esc')
      ) {
        e.preventDefault()

        if (state.onEscClick) {
          state.onEscClick(e)
        }

        if (state.shouldCloseOnEscClick) {
          if (state.onClose) {
            state.onClose()
          } else {
            actions.close()
          }
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  })

  // effect for refs
  useEffect(() => {
    state.refs.backdrop(backdropRef.current)
    state.refs.container(containerRef.current)
  })

  // effect for adding class to
  // body element
  useEffect(() => {
    document.body.classList.add(state.classNameWhenOpenend)

    return () =>
      document.body.classList.remove(state.classNameWhenOpenend)
  })

  const getCreateElementFn = prop => actions.hasStyles(prop) ? React.createElement : jsx
  const getClassName = prop => {
    const defaultClassNames = (additionalProps = {}) => classNames({
      [state.namespace]: true,
      ...mapKeys(mapOfChildrenUsed, (value, key) => `${state.namespace}-has-${key.toLowerCase()}`),
      ...additionalProps
    })

    if (typeof prop === 'string') {
      const keys = prop.split(' ')
      const props = {
        [prop]: true
      }

      if (keys.length > 1) {
        keys.map(key => {
          props[key] = true
        })
      }

      return defaultClassNames(props)
    }

    return defaultClassNames(prop)
  }

  // this array holds our
  // backdrop & container elements
  // for render
  let Wrapper =
    <FocusTrap>
      <div className={state.namespace}>
        {
          getCreateElementFn('backdrop')(state.backdropTagName, {
            key: 1,
            tabIndex: '-1',
            ref: backdropRef,
            className: `${state.namespace}Backdrop`,
            style: state.styles.backdrop,
            css: !actions.hasStyles('backdrop') ? styles.Backdrop : undefined,
            onClick:
              state.shouldCloseOnBackdropClick
                ? state.onClose
                  ? state.onClose
                  : actions.close
                : state.onBackdropClick
          })
        }
        {
          getCreateElementFn('container')(state.containerTagName, {
            role: 'dialog',
            'aria-modal': true,
            'aria-labelledby': 'my-dialog', // TODO: add aria settings to props
            open: state.isOpen,
            ref: containerRef,
            style: state.styles.container,
            className: getClassName(state.className),
            css: state.styles && !actions.hasStyles('container')
              ? styles.Container({ hasHeaderBodyAndFooter })
              : undefined
          }, children)
        }
      </div>
    </FocusTrap>

  // finally render
  return (
    state.isOpen
      ? mountTo
        // If we've got a DOM element
        // passed we will render it
        // there instead…
        ? ReactDOM.createPortal(
          Wrapper,
          mountTo
        )
        // otherwise right here
        : Wrapper
      : null
  )
}

Container.defaultProps = defaultProps

Container.propTypes = {
  namespace: PropTypes.string,
  backdropTagName: PropTypes.string,
  containerTagName: PropTypes.string,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  isOpen: PropTypes.bool,
  classNameWhenOpenend: PropTypes.string,
  mounTo: PropTypes.instanceOf(document.Element),
  shouldCloseOnBackdropClick: PropTypes.bool,
  shouldCloseOnEscClick: PropTypes.bool,
  waitUntilUnmountInMs: PropTypes.number,

  styles: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      backdrop: PropTypes.object,
      backdropAfterMount: PropTypes.object,
      backdropBeforeUnmount: PropTypes.object,
      container: PropTypes.object,
      containerAfterMount: PropTypes.object,
      containerBeforeUnmount: PropTypes.object,
      header: PropTypes.object,
      body: PropTypes.object,
      footer: PropTypes.object
    })
  ]),

  onClose: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  onBeforeOpen: PropTypes.func,
  onAfterOpen: PropTypes.func,
  onBeforeClose: PropTypes.func,
  onAfterClose: PropTypes.func,
  onEscClick: PropTypes.func,
  onBackdropClick: PropTypes.func,

  refs: PropTypes.shape({
    backdrop: PropTypes.func,
    container: PropTypes.func,
    header: PropTypes.func,
    body: PropTypes.func,
    footer: PropTypes.func
  })
}

export const withModal = (WrappedComponent, props = {}) =>
  <Modal.Container
    {...props}
  >
    <WrappedComponent />
  </Modal.Container>

const ModalContext = {
  Context,
  Provider,
  Consumer
}

export {
  Modal,
  ModalContext
}
