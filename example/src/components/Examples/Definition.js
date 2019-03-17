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
    name: 'confirmationModal',
    label: 'Confirmation Modal',
    text: `
      This example is using a basic fade transition utilizing <Transition /> by react-transition-group.
    `,
    value: false,
    Component: ConfirmationModal
  },
  {
    name: 'animatedConfirmationModal',
    label: 'Confirmation Modal',
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
