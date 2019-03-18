import React, { useState, useRef, useEffect } from 'react'

import { Definition as Examples } from './Examples'
import Navigation from './Navigation'
import Section from './Section'
import Highlighter from './Highlighter'

import '../assets/styles/App.scss'

function App () {
  // Examples state (handling visibility of modals)
  const [state, setState] = useState(Examples)
  const toggleState = name => visible => {
    let newState = [...state]
    const index = state.indexOf(
      state.find(item => item.name === name)
    )

    newState[index].value = visible !== undefined
      ? visible
      : !newState[index].value

    newState = newState.map((item, idx) => {
      return {
        ...item,
        value: idx !== index ? false : item.value
      }
    })

    return setState(newState)
  }
  const modalContainerRef = useRef(null)
  const navRef = useRef(null)
  const bodyClassList = document.body.classList

  const toggleNavigationIsVisibleClass = element => {
    if (
      navRef.current.contains(element) &&
      bodyClassList.contains('navigation-is-visible')
    ) {
      bodyClassList.remove('navigation-is-visible')
    }
  }

  // effect for toggling body.navigation-is-visible
  // when clicking on switch
  useEffect(() => {
    const onDocClick = event => {
      toggleNavigationIsVisibleClass(event.target)
    }

    document.addEventListener('click', onDocClick)

    return () => document.removeEventListener('click', onDocClick)
  })

  return (
    <>
      <div className='App'>
        <Navigation navRef={navRef} />
        <main className='Content'>
          <div className='SocialButtons'>
            <iframe
              className='SocialButtons__item SocialButtons__item--twitter'
              title='Tweet'
              frameBorder='0'
              scrolling='no'
              src='http://platform.twitter.com/widgets/tweet_button.html?text=https%3A%2F%2Fgithub.com%2Fpixelmanya%2Freact-a11y-modal%2F&amp;count=horizontal'
              width='62px'
              height='20px'
            />
            <iframe
              className='SocialButtons__item'
              title='Star on Github'
              src='https://ghbtns.com/github-btn.html?user=pixelmanya&repo=react-a11y-modal&type=star'
              width='50px'
              height='22px'
              frameBorder='0'
              scrolling='0'
            />
          </div>
          <div className='Content__wrapper'>
            <h1 className='Title'>react-a11y-modal</h1>
            <Section
              id='foreword'
            >
              <blockquote className='Introduction'>
                <strong>Foreword</strong><br />
              I've built this accessible modal dialog for React mainly because I wanted to learn the recently
              officially introduced <a href='https://reactjs.org/docs/hooks-intro.html' target='blank'>React Hooks</a> (16.8.0). I also wanted to give developers a modal which they could use right away
              without worrying much about styling.
              </blockquote>
            </Section>
            <Section
              id='installation'
              title='Installation'
              emoji='⚒'
              text='To install the latest stable version use npm or yarn.'
            >
              <Highlighter language='bash'>
                {`
$ npm install react-a11y-modal
$ yarn add react-a11y-modal
                `}
              </Highlighter>
            </Section>
            <Section
              id='usage'
              title='Usage'
              emoji='🤔'
              text='All props are entirely optional. However you can find a detailed overview below:'
            >
              <Highlighter>
                {`
import { Modal } from 'react-a11y-modal'

<Modal.Container
  // @string Used for producing HTML classNames
  // (.ModalBackdrop, .Modal, .ModalHeader, etc.)
  // @default "Modal"
  namespace="Modal"
  // @string Used for backdrop tag element
  // @default "div"
  backdropTagName="div"
  // @string Used for container tag element
  // @default "dialog"
  containerTagName="dialog"
  // @(string|array|object) Additional classNames for Container
  // @default {}
  className={{}}
  // @domElement to mount the modal (DOM element)
  // @default none
  mountTo={element}
  // @boolean flag if modal should be opened
  // @default true
  isOpen={true}
  // @boolean flag if click on backdrop should close the modal
  // @default true
  shouldCloseOnBackdropClick={true}
  // @boolean flag if click on escape key should close the modal
  // @default true
  shouldCloseOnEscClick={true}
  // @string which is added to document.body's
  // classList while modal is being open
  // @default "modal-is-opened"
  whenOpenedAddClassNameToBody="modal-is-opened"
  // @number in milliseconds determining when the modal
  // should unmount (useful for custom css transitions)
  // @default 0
  waitUntilUnmountInMs={0}
  // @object with CSS styles for each element of the modal
  // @default {}
  styles: {
    backdrop: {}, // general styles for backdrop
    backdropAfterMount: {}, // styles for backdrop after mount
    backdropBeforeUnmount: {}, // styles for backdrop before unmount
    container: {}, // general styles for <Modal.Container />
    containerAfterMount: {}, // …
    containerBeforeUnmount: {}, // …
    header: {}, // general styles for <Modal.Header />
    body: {}, // general styles for <Modal.Body />
    footer: {} // general styles for <Modal.Footer />
  },
  // @function will be called before modal is shown
  // @default () => {}
  onBeforeShow={() => {}},
  // @function will be called after modal was shown
  // @default () => {}
  onAfterShow={() => {}},
  // @function will be called before modal is closed
  // @default () => {}
  onBeforeClose={() => {}},
  // @function will be called after modal was closed
  // @default () => {}
  onAfterClose={() => {}},
  // @function will be called when user clicks ESC key while modal is shown
  // @default () => {}
  onEscClick={() => {}},
  // @function will be called when user clicks on backdrop
  // @default () => {}
  onBackdropClick={() => {}},
  // @object containing callback function for each element being used
  // @default {}
  refs={{
    backdrop: node => {},
    container: node => {},
    header: node => {},
    body: node => {},
    footer: node => {}
  }}
>
  // react-a11y-modal ships with
  // an skeleton like the following.
  // It's completely optional though.
  // The only mandatory element is
  // <Modal.Container />
  <Modal.Header>
    <h1>My Modal Title</h1>
  </Modal.Header>
  <Modal.Body>
    <p>Some content</p>
  </Modal.Body>
  <Modal.Footer>
    <h1>Additional footer</h1>
  </Modal.Footer>
</Modal.Container>
                `}
              </Highlighter>
            </Section>
            <Section
              id='accessibility'
              title='Accessibility'
              emoji='♿️'
              text='Pellentesque dignissim ultrices ipsum, nec viverra nunc molestie nec. Sed consequat semper libero, at scelerisque nibh. Quisque eu aliquet elit. Nam mattis sem orci, a mattis odio bibendum a. Proin et mollis massa. In et leo pulvinar, ultrices tellus quis, porttitor libero. Vestibulum ac finibus purus, eleifend semper turpis. Suspendisse vitae consequat ligula, ut scelerisque felis. Ut quis scelerisque augue, a laoreet nisl. Nullam id auctor elit, ut vestibulum dolor. Quisque varius finibus odio, non euismod dolor varius ut. Vivamus placerat ac odio vel imperdiet. Vivamus lacinia nisi sit amet lorem posuere suscipit. Nam velit arcu, lacinia id laoreet et, congue at urna. Nullam rhoncus, diam a vestibulum consectetur, nisi neque malesuada velit, in scelerisque ligula est et turpis.'
            />
            <Section
              id='styling'
              title='Styling'
              emoji='💅'
              text='Pellentesque dignissim ultrices ipsum, nec viverra nunc molestie nec. Sed consequat semper libero, at scelerisque nibh. Quisque eu aliquet elit. Nam mattis sem orci, a mattis odio bibendum a. Proin et mollis massa. In et leo pulvinar, ultrices tellus quis, porttitor libero. Vestibulum ac finibus purus, eleifend semper turpis. Suspendisse vitae consequat ligula, ut scelerisque felis. Ut quis scelerisque augue, a laoreet nisl. Nullam id auctor elit, ut vestibulum dolor. Quisque varius finibus odio, non euismod dolor varius ut. Vivamus placerat ac odio vel imperdiet. Vivamus lacinia nisi sit amet lorem posuere suscipit. Nam velit arcu, lacinia id laoreet et, congue at urna. Nullam rhoncus, diam a vestibulum consectetur, nisi neque malesuada velit, in scelerisque ligula est et turpis.'
            />
            { state && state.map(({
              name,
              label,
              text,
              code,
              value,
              Component
            }) => {
              const setState = toggleState(name)

              return (
                <Section
                  id={name}
                  title={label}
                  text={text}
                  emoji='👈 👀'
                  key={name}
                >
                  <button
                    onClick={() => setState(true)}
                    className='ExampleButton'
                  >
                    Show me
                  </button>
                  { code && (
                    <Highlighter>
                      { code }
                    </Highlighter>
                  ) }
                  { value && Component &&
                  <Component
                    mountTo={modalContainerRef.current}
                    onAfterClose={() => setState(false)}
                  />
                  }
                </Section>
              )
            }) }
          </div>
        </main>
        <footer className='Footer'>
          <span className='info'>
            v1.0.5 ~ last published on 2019/03/11
          </span>
          <p className='credits'>
            Handcrafted with <span role='img'>❤️</span> by <a href='http://pixelmanya.com' target='blank'>Dominik Mertz</a> in 2019
          </p>
        </footer>
      </div>
      <div className='AppModalContainer' ref={modalContainerRef} />
    </>
  )
}

export default App
