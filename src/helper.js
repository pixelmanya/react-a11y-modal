/** @jsx jsx */

import React, { useContext, useRef } from 'react';
import { jsx } from '@emotion/core';
import styles from './styles';
import get from 'lodash/get';
import { ModalContext } from './context';

export const createElement = type => ({
  children,
  tagName = 'div',
  ...rest
}) => {
  const { state, actions } = useContext(ModalContext);
  const ref = useRef(null);
  const prop = type.toLowerCase();

  return jsx(
    tagName,
    {
      className: `${state.namespace}${type}`,
      css: actions.getStyle(prop),
      ref: node => {
        ref.current = node;

        if (state && state.refs && state.refs[prop]) {
          state.refs[prop](node);
        }
      },
      ...rest
    },
    typeof children === 'function'
      ? children({
          actions
        })
      : children
  );
};

export const filterAllowedChildren = ({ children, blacklist = [] }) => {
  if (!Array.isArray(children)) {
    return children;
  }

  return children
    .map(child => {
      if (React.isValidElement(child) && Array.isArray(child.props.children)) {
        return React.cloneElement({
          ...child,
          props: {
            ...child.props,
            children: filterAllowedChildren({
              children: child.props.children,
              blacklist
            })
          }
        });
      }

      return child;
    })
    .filter(child => !blacklist.includes(child.type));
};

export const findChildByType = children => type =>
  !!(Array.isArray(children) && children.find(item => item.type === type));

export const getMapOfChildrenUsed = ({ children, Modal }) => {
  const childrenContains = {};

  if (!children) {
    return childrenContains;
  }

  if (
    !Array.isArray(children) &&
    (children.props && !Array.isArray(children.props.children))
  ) {
    children = [children];
  }

  const findByType = findChildByType(
    Array.isArray(children)
      ? children
      : children.props && Array.isArray(children.props.children)
      ? children.props.children
      : false
  );

  Object.keys(Modal).map(
    type => (childrenContains[type] = findByType(Modal[type]))
  );

  return childrenContains;
};

export const applyStyles = ({ styles, state, actions }) => {
  if (state && state.styles) {
    actions.setState({
      styles: {
        ...state.styles,
        ...styles
      }
    });
  }
};
