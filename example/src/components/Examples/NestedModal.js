import React, { useState } from 'react'
import { Modal } from 'react-a11y-modal'
import { ReactComponent as Close } from '../../assets/icons/close.svg'

const OtherModal = ({
  onClose,
  mountTo
}) =>
  <Modal.Container
    mountTo={mountTo}
    className='BasicModal'
  >
    <Modal.Body>
      <h1 className='ModalHeader__title'>
        The nested modal
      </h1>
      <button
        onClick={onClose}
        className='CloseButton'
      >
        <Close className='ConfirmationModalClose__icon' />
      </button>
      <p>
        Great! Now click the <span className='CodeHighlight'>esc</span> key.
      </p>
    </Modal.Body>
  </Modal.Container>

const NestedModal = ({
  mountTo,
  onAfterClose
}) => {
  const [showModal, setShowModal] = useState(false)

  const toggleModalOnClick = () => setShowModal(!showModal)

  return (
    <Modal.Container
      className='BasicModal'
      mountTo={mountTo}
      onAfterClose={onAfterClose}
    >
      { ({ actions }) =>
        <>
          <Modal.Body>
            <h1 className='ModalHeader__title'>
              Nested modal
            </h1>
            <button
              onClick={actions.close}
              className='CloseButton'
            >
              <Close className='ConfirmationModalClose__icon' />
            </button>
            <p>
              You just have to see the modal on top of this one!
              <br />
              Just <a onClick={toggleModalOnClick} className='Link'>click this link</a> to let it appear.
            </p>
            { showModal && <OtherModal mountTo={mountTo} onClose={toggleModalOnClick} /> }
          </Modal.Body>
        </>
      }
    </Modal.Container>
  )
}

export default NestedModal
