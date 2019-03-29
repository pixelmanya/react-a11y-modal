/** @jsx jsx */

import React, { useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import { jsx } from '@emotion/core';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import mapKeys from 'lodash/mapKeys';
import get from 'lodash/get';
import {
  ModalContext as Context,
  ModalContextProvider as Provider,
  ModalContextConsumer as Consumer
} from './context';
import {
  createElement,
  filterAllowedChildren,
  getMapOfChildrenUsed,
  applyStyles
} from './helper';

export const defaultProps = {
  namespace: 'Modal',
  backdropTagName: 'div',
  containerTagName: 'dialog',
  className: null,
  mountTo: document.body,

  ariaAppRoot: null,
  ariaLabelledBy: null,
  ariaLabel: null,
  ariaDescribedBy: null,

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
};

const Modal = {
  Header: createElement('Header'),
  Body: createElement('Body'),
  Footer: createElement('Footer'),
  Container({ children, ...props }) {
    return (
      <Provider>
        <Container {...props}>{children}</Container>
      </Provider>
    );
  }
};

function Container({ children, mountTo }) {
  const { state, actions } = useContext(Context);
  const backdropRef = useRef(null);
  const containerRef = useRef(null);

  // when we got passed a function as children
  // then lets execute it and pass the actions
  children = typeof children === 'function' ? children({ actions }) : children;

  // check children against blacklisted elements
  // and remove any if necessary
  children = filterAllowedChildren({
    children,
    blacklist: [Modal.Container]
  });

  // mapOfChildrenUsed tells us which components
  // have been used => { Header: true, Body: true, Footer: false, ... }
  const mapOfChildrenUsed = getMapOfChildrenUsed({
    children,
    Modal
  });
  const hasHeaderBodyAndFooter =
    mapOfChildrenUsed.Header &&
    mapOfChildrenUsed.Body &&
    mapOfChildrenUsed.Footer;

  // effect for applying potential styles
  // to backdrop and container
  useEffect(() => {
    let styles = {};

    if (actions.getStyle('backdropAfterMount')) {
      styles = {
        ...styles,
        backdrop: {
          ...state.styles.backdrop,
          ...state.styles.backdropAfterMount
        },
        backdropAfterMount: {}
      };
    }

    if (actions.getStyle('containerAfterMount')) {
      styles = {
        ...styles,
        container: {
          ...state.styles.container,
          ...state.styles.containerAfterMount
        },
        containerAfterMount: {}
      };
    }

    if (Object.keys(styles).length) {
      applyStyles({
        state,
        actions,
        styles
      });
    }
  });

  // handle key down (escape)
  const handleKeyDown = e => {
    if (state.isOpen && (e.key === 'Escape' || e.key === 'Esc')) {
      e.preventDefault();
      e.stopPropagation();

      if (state.onEscClick) {
        state.onEscClick(e);
      }

      if (state.shouldCloseOnEscClick) {
        if (state.onClose) {
          state.onClose();
        } else {
          actions.close();
        }
      }
    }
  };

  // effect for refs
  useEffect(() => {
    state.refs.backdrop(backdropRef.current);
    state.refs.container(containerRef.current);
  });

  // effect for adding class to
  // body element
  useEffect(() => {
    document.body.classList.add(state.classNameWhenOpenend);

    return () => document.body.classList.remove(state.classNameWhenOpenend);
  });

  // effect for adding aria-hidden prop to
  // ariaAppRoot element
  useEffect(() => {
    if (state.ariaAppRoot && state.isOpen) {
      state.ariaAppRoot.setAttribute('aria-hidden', true);
    }

    return () => {
      if (state.ariaAppRoot && state.isOpen) {
        state.ariaAppRoot.removeAttribute('aria-hidden');
      }
    };
  });

  const getClassName = prop => {
    const defaultClassNames = (additionalProps = {}) =>
      classNames({
        [state.namespace]: true,
        ...mapKeys(
          mapOfChildrenUsed,
          (value, key) => `${state.namespace}-has-${key.toLowerCase()}`
        ),
        ...additionalProps
      });

    if (typeof prop === 'string') {
      const keys = prop.split(' ');
      const props = {
        [prop]: true
      };

      if (keys.length > 1) {
        keys.map(key => {
          props[key] = true;
        });
      }

      return defaultClassNames(props);
    }

    return defaultClassNames(prop);
  };

  const customStyles = {
    backdrop: actions.getStyle('backdrop'),
    container: args => actions.getStyle('container', args)
  };

  // this array holds our
  // backdrop & container elements
  // for render
  let Wrapper = (
    <FocusTrap>
      <div className={state.namespace} tabIndex="-1" onKeyDown={handleKeyDown}>
        {jsx(state.backdropTagName, {
          key: 1,
          tabIndex: '-1',
          ref: backdropRef,
          className: `${state.namespace}Backdrop`,
          css: customStyles.backdrop,
          onClick: state.shouldCloseOnBackdropClick
            ? state.onClose
              ? state.onClose
              : actions.close
            : state.onBackdropClick
        })}
        {jsx(
          state.containerTagName,
          {
            role: 'dialog',
            'aria-modal': true,
            'aria-labelledby': state.ariaLabelledBy,
            'aria-label': state.ariaLabel,
            'aria-describedby': state.ariaDescribedBy,
            open: state.isOpen,
            ref: containerRef,
            className: getClassName(state.className),
            css: customStyles.container({
              hasHeaderBodyAndFooter
            })
          },
          children
        )}
      </div>
    </FocusTrap>
  );

  // finally render
  return state.isOpen ? ReactDOM.createPortal(Wrapper, mountTo) : null;
}

Container.defaultProps = defaultProps;

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
  ariaAppRoot: PropTypes.instanceOf(document.Element),
  ariaLabelledBy: (props, key) =>
    props.ariaLabel && props[key]
      ? new Error(`You cannot use ariaLabel and ${key} at the same time!`)
      : null,
  ariaLabel: (props, key) =>
    props.ariaLabelledBy && props[key]
      ? new Error(`You cannot use ariaLabelledBy and ${key} at the same time!`)
      : null,
  ariaDescribedBy: PropTypes.string,
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

  onClose: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
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
};

export const withModal = (WrappedComponent, props = {}) => (
  <Modal.Container {...props}>
    <WrappedComponent />
  </Modal.Container>
);

const ModalContext = {
  Context,
  Provider,
  Consumer
};

export { Modal, ModalContext };
