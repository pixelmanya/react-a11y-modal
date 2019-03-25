import {
  BasicModal,
  ConfirmationModal,
  HeaderAndFooterModal,
  FormModal
} from '.'

const Examples = [
  {
    name: 'basic-modal',
    label: 'Basic Modal',
    text: `
      A very basic modal.
    `,
    codeLink: 'https://github.com/pixelmanya/react-a11y-modal/blob/master/example/src/components/Examples/BasicModal.js',
    code: `
import React from 'react'
import { Modal } from 'react-a11y-modal'

const BasicModal = () =>
  <Modal.Container>
    { ({ actions }) =>
      <Modal.Body>
        <h1>
          Basic Modal
        </h1>
        <button onClick={actions.close}>
          <Close />
        </button>
        <p>
          This is a very basic modal…
        </p>
      </Modal.Body>
    }
  </Modal.Container>
    `,
    value: false,
    Component: BasicModal
  },
  {
    name: 'with-header-body-and-footer',
    label: 'Header, Body and Footer',
    value: false,
    Component: HeaderAndFooterModal,
    codeLink: 'https://github.com/pixelmanya/react-a11y-modal/blob/master/example/src/components/Examples/HeaderAndFooterModal.js',
    code: `
import React from 'react'
import { Modal } from 'react-a11y-modal'

const ModalWithHeaderAndFooter = () =>
  <Modal.Container>
    { ({ actions }) => (
      <>
        <Modal.Header>
          <h3 className='ModalHeader__title'>
            Modal With Header And Footer
          </h3>
        </Modal.Header>
        <Modal.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris a diam maecenas sed enim ut. Convallis a cras semper auctor. At lectus urna duis convallis convallis tellus id. Lectus vestibulum mattis ullamcorper velit. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Mauris sit amet massa vitae tortor condimentum lacinia quis. Odio facilisis mauris sit amet massa vitae tortor condimentum lacinia. Morbi tincidunt ornare massa eget egestas. Semper risus in hendrerit gravida rutrum quisque non tellus. Imperdiet dui accumsan sit amet nulla. Odio euismod lacinia at quis risus. Dignissim sodales ut eu sem integer vitae. Purus semper eget duis at tellus. Tristique et egestas quis ipsum suspendisse. Quis vel eros donec ac odio tempor orci dapibus. Morbi tristique senectus et netus et malesuada fames ac turpis. Ultricies tristique nulla aliquet enim tortor. Leo in vitae turpis massa sed.
          Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Diam sit amet nisl suscipit adipiscing bibendum est ultricies. Non pulvinar neque laoreet suspendisse interdum. Tempor nec feugiat nisl pretium fusce id. Ultricies leo integer malesuada nunc vel. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Faucibus et molestie ac feugiat sed lectus vestibulum. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Nulla posuere sollicitudin aliquam ultrices. Auctor neque vitae tempus quam. Magna fringilla urna porttitor rhoncus dolor purus non enim. Tristique senectus et netus et malesuada. Gravida neque convallis a cras. Sociis natoque penatibus et magnis dis parturient montes nascetur. Auctor eu augue ut lectus arcu.
          Vitae tempus quam pellentesque nec nam aliquam sem et tortor. Placerat vestibulum lectus mauris ultrices eros in. Vestibulum sed arcu non odio. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Bibendum arcu vitae elementum curabitur. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Gravida dictum fusce ut placerat orci nulla. Faucibus turpis in eu mi bibendum neque egestas. Sapien eget mi proin sed libero. Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Ut ornare lectus sit amet est placerat. Aliquam faucibus purus in massa. Platea dictumst vestibulum rhoncus est. Tellus id interdum velit laoreet id donec ultrices tincidunt. Cursus in hac habitasse platea dictumst quisque sagittis.
          Et netus et malesuada fames. In hac habitasse platea dictumst vestibulum rhoncus. Tempus iaculis urna id volutpat lacus laoreet non curabitur. Iaculis urna id volutpat lacus laoreet. Aenean sed adipiscing diam donec adipiscing tristique risus nec. Lobortis feugiat vivamus at augue eget arcu. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Tempor commodo ullamcorper a lacus. Sociis natoque penatibus et magnis dis parturient montes nascetur. Duis ut diam quam nulla porttitor. Tortor pretium viverra suspendisse potenti nullam. Sed id semper risus in hendrerit gravida. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Nisl condimentum id venenatis a condimentum. Nunc sed id semper risus in hendrerit gravida rutrum quisque.
          Metus dictum at tempor commodo ullamcorper a lacus vestibulum sed. Aenean euismod elementum nisi quis eleifend. Tristique senectus et netus et malesuada. Et malesuada fames ac turpis egestas integer. Tempor orci eu lobortis elementum nibh tellus molestie nunc. Lacus laoreet non curabitur gravida arcu ac tortor. Eu augue ut lectus arcu bibendum at varius vel. Ac placerat vestibulum lectus mauris ultrices eros in. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Turpis egestas integer eget aliquet nibh praesent tristique magna sit. Integer quis auctor elit sed vulputate mi sit amet mauris. Magna etiam tempor orci eu.
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={actions.close}
            className='ModalFooter__button ModalFooter__button--cancel'
          >
            Cancel and close
          </button>
          <button
            onClick={actions.close}
            className='ModalFooter__button ModalFooter__button--cta'
          >
            Save
          </button>
        </Modal.Footer>
      </>
    ) }
  </Modal.Container>
    `
  },
  {
    name: 'confirmation-modal',
    label: 'Confirmation Modal',
    text: `
      This example shows a custom Confirmation Modal.
    `,
    codeLink: 'https://github.com/pixelmanya/react-a11y-modal/blob/master/example/src/components/Examples/ConfirmationModal.js',
    code: `
import React from 'react'
import { Modal } from 'react-a11y-modal'

export const ConfirmationModal = () =>
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
    `,
    value: false,
    Component: ConfirmationModal
  },
  {
    name: 'sign-in-modal',
    label: 'Sign-in modal',
    value: false,
    text: `
      This example shows a custom Sign-in Modal which utilises custom CSS transition.
    `,
    Component: FormModal,
    codeLink: 'https://github.com/pixelmanya/react-a11y-modal/blob/master/example/src/components/Examples/FormModal.js',
    code: `
import React, { useState } from 'react'
import { withModal, Modal } from 'react-a11y-modal'
import { ReactComponent as Close } from '../../assets/icons/close.svg'
import '../../assets/styles/examples/SignInModal.scss'

const formState = [{
  name: 'username',
  label: 'Username',
  value: '',
  autoComplete: 'username'
}, {
  name: 'password',
  label: 'Password',
  value: '',
  type: 'password',
  autoComplete: 'current-password'
}]

const FormModal = ({
  mountTo,
  onAfterClose
}) => withModal(() => {
  const [fields, setFormFields] = useState(formState)
  const onFieldChange = event => {
    const { name, value } = event.target
    let state = fields.slice(0)
    state = state.map(item => item.name === name ? ({
      ...item,
      value
    }) : item)

    setFormFields(state)
  }
  const getFieldByName = name => fields.find(item => item.name === name)
  const Username = getFieldByName('username')
  const Password = getFieldByName('password')
  const hasInput = Username.value.length && Password.value.length

  return (
    <>
      <Modal.Header>
        { ({ actions }) =>
          <>
            <strong className='ModalHeader__title'>
              Sign in
            </strong>
            <button
              tabIndex='0'
              aria-label='Close'
              onClick={actions.close}
              className='CloseButton'
            >
              <Close className='CloseButton__icon' />
            </button>
          </>
        }
      </Modal.Header>
      <Modal.Body>
        <form className='Form' autoComplete='off'>
          { fields && fields.map(({
            name,
            label,
            value,
            ...attr
          }, idx) =>
            <div
              key={name}
              className='Form__row'
            >
              <label className='Form__label'>
                { label }
                <input
                  tabIndex={idx + 1}
                  name={name}
                  value={value}
                  onChange={onFieldChange}
                  className='Form__input'
                  {...attr}
                />
              </label>
            </div>
          ) }
        </form>
      </Modal.Body>
      <Modal.Footer>
        { ({ actions }) =>
          <button
            disabled={!hasInput}
            onClick={actions.close}
            className={\`
              Form__button
              \${!hasInput ? 'Form__button--disabled' : ''}
            \`}
          >
            Sign in
          </button>
        }
      </Modal.Footer>
    </>
  )
}, {
  mountTo,
  className: {
    'Modal--form': true
  },
  styles: {
    backdrop: {
      opacity: 0,
      transition: 'all .2s ease'
    },
    backdropAfterMount: {
      opacity: 0.2
    },
    backdropBeforeUnmount: {
      transitionDelay: '.35s',
      opacity: 0
    },
    container: {
      opacity: 0,
      transition: 'all .35s ease .2s',
      transform: 'translateY(-40%)'
    },
    containerAfterMount: {
      opacity: 1,
      transform: 'translateY(-50%)'
    },
    containerBeforeUnmount: {
      opacity: 0,
      transitionDelay: '0ms',
      transform: 'translateY(-40%)'
    }
  },
  waitUntilUnmountInMs: 450,
  onAfterClose
})

export default FormModal
    `
  }
]

export default Examples
