import React from 'react';
import { Transition } from 'react-transition-group';

const defaultProps = {
  in: false,
  timeout: 0
};

const defaultStyle = {
  position: 'absolute'
};

export const MyTransition = ({ styles, children, ...props }) => {
  return (
    <Transition {...props}>
      {state => (
        <div
          style={{
            ...defaultStyle,
            ...styles.default,
            ...styles[state]
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};

export const Fade = props => {
  const duration = 350;
  const styles = {
    default: {
      transition: `opacity ${duration}ms ease`,
      opacity: 0
    },
    entering: { opacity: 0 },
    entered: { opacity: 1 }
  };

  return <MyTransition {...props} styles={styles} />;
};

Fade.defaultProps = defaultProps;
