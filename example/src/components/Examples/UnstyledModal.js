import React from 'react';
import { Modal } from 'react-a11y-modal';
import { ReactComponent as Close } from '../../assets/icons/close.svg';

const UnstyledModal = ({ onAfterClose }) => (
  <Modal.Container styles={null} onAfterClose={onAfterClose}>
    {({ actions }) => (
      <Modal.Body>
        <h1 className="ModalHeader__title">Unstyled Modal</h1>
        <button onClick={actions.close} className="CloseButton">
          <Close className="ConfirmationModalClose__icon" />
        </button>
        <p>
          This modal has literally no style. You just need to pass a falsy value
          for <span className="CodeHighlight">styles</span> and it's all yours.
        </p>
      </Modal.Body>
    )}
  </Modal.Container>
);

export default UnstyledModal;
