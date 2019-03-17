import {
  BasicModal,
  AcceptTermsAndConditionsModal,
  ConfirmationModal,
  AnimatedConfirmationModal,
  HeaderAndFooterModal,
  FormModal
} from '.'

const Examples = [
  {
    name: 'basicModal',
    label: 'Basic Modal',
    text: `
      A very basic modal.
    `,
    code: `
import React from 'react'
import { Modal } from 'react-a11y-modal'

const BasicModal = () =>
  <Modal.Container>
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
            This is a very basic modal…
          </p>
        </Modal.Body>
      </>
    }
  </Modal.Container>
    `,
    value: false,
    Component: BasicModal
  },
  {
    name: 'animatedConfirmationModal',
    label: 'Confirmation Modal',
    text: `
      This example uses a fade transition utilizing <Transition /> by react-transition-group.
    `,
    code: `
import React from 'react'
import { Modal } from 'react-a11y-modal'

export const ConfirmationModal = () => {
  return (
    <Modal.Container
      className={{
        ConfirmationModal: true
      }}
    >
      { ({ actions }) =>
        <>
          <div className='ConfirmationModal__title'>
            Are you sure you want to delete this element?
          </div>
          <button
            aria-label='Close'
            onClick={actions.close}
            className='ConfirmationModalClose'
          >
            <Close className='ConfirmationModalClose__icon' />
          </button>
          <div className='ConfirmationModalFooter'>
            <button
              onClick={actions.close}
              className='ConfirmationModalFooter__button'
            >
              No
            </button>
            <button
              onClick={actions.close}
              className='ConfirmationModalFooter__button ConfirmationModalFooter__button--primary'
            >
              Yes
            </button>
          </div>
        </>
      }
    </Modal.Container>
  )
}

export const AnimatedConfirmationModal = ({
  onAfterClose,
  mountTo
}) => {
  const [visible, setVisible] = useState(true)
  const hide = () => setVisible(false)

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
      <ConfirmationModal
        isOpen={visible}
        onClose={hide}
      />
    </Fade>,
    mountTo
  )
}

    `,
    value: false,
    Component: AnimatedConfirmationModal
  },
  {
    name: 'withHeaderAndFooterModal',
    label: 'Header, Body and Footer',
    value: false,
    Component: HeaderAndFooterModal
  },
  {
    name: 'justText',
    label: 'Form modal (with CSS transition)',
    value: false,
    Component: FormModal
  },
  {
    name: 'acceptTermsAndConditionsModal',
    label: 'Accept Terms & Conditions',
    value: false,
    Component: AcceptTermsAndConditionsModal
  }
]

export default Examples
