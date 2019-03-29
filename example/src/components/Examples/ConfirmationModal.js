import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-a11y-modal';
import { Fade } from './Transitions';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import '../../assets/styles/examples/ConfirmationModal.scss';

export const ConfirmationModal = ({ onAfterClose, onClose }) => {
  return (
    <Modal.Container
      onAfterClose={!onClose ? onAfterClose : () => {}}
      onClose={onClose}
      className={{
        ConfirmationModal: true
      }}
    >
      {({ actions }) => (
        <>
          <div className="ConfirmationModal__title">
            Are you sure you want to delete this element?
          </div>
          <button
            aria-label="Close"
            onClick={onClose || actions.close}
            className="ConfirmationModalClose"
          >
            <Close className="ConfirmationModalClose__icon" />
          </button>
          <div className="ConfirmationModalFooter">
            <button
              onClick={onClose || actions.close}
              className="ConfirmationModalFooter__button"
            >
              No
            </button>
            <button
              onClick={onClose || actions.close}
              className="ConfirmationModalFooter__button ConfirmationModalFooter__button--primary"
            >
              Yes
            </button>
          </div>
        </>
      )}
    </Modal.Container>
  );
};

export const AnimatedConfirmationModal = ({ onAfterClose, mountTo }) => {
  const [visible, setVisible] = useState(true);
  const hide = () => setVisible(false);

  return ReactDOM.createPortal(
    <Fade
      appear
      in={visible}
      timeout={{
        enter: 0,
        exit: 200
      }}
      onExited={onAfterClose}
    >
      <ConfirmationModal isOpen={visible} onClose={hide} />
    </Fade>,
    mountTo
  );
};
