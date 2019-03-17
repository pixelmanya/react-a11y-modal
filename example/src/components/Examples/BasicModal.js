import React from 'react'
import { Modal } from 'react-a11y-modal'
import { ReactComponent as Close } from '../../assets/icons/close.svg'

const BasicModal = ({
  mountTo,
  onAfterClose
}) => (
  <Modal.Container
    mountTo={mountTo}
    onAfterClose={onAfterClose}
  >
    { ({ actions }) =>
      <>
        <Modal.Header>
          <h1 className='ModalHeader__title'>
            Basic Modal
          </h1>
          <button
            onClick={actions.close}
            className='CloseButton'
          >
            <Close className='ConfirmationModalClose__icon' />
          </button>
        </Modal.Header>
        <Modal.Body>
          <p>
            This is a very basic modal. As defined in the W3C Dialog Modal Specification, the
            focus should move to an element within the opened modal. That said, you will, under all
            circumstances, need to place a toggable element inside of the modal. Typically this could be
            a button which closes the modal again.
          </p>
        </Modal.Body>
      </>
    }
  </Modal.Container>
)

export default BasicModal
