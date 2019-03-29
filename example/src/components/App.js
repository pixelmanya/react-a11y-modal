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
              src='https://platform.twitter.com/widgets/tweet_button.html?text=https%3A%2F%2Fgithub.com%2Fpixelmanya%2Freact-a11y-modal%2F&amp;count=horizontal'
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
            <h1 id='start' className='Title'>react-a11y-modal</h1>
            <Section
              id='introduction'
            >
              <blockquote className='Introduction'>
                <strong>Welcome!</strong><span role='image'>👋</span><br />
                This <a href='#accessibility'>accessible</a> modal (dialog) for <a href='https://reactjs.org' target='blank'>React</a> was mainly built because I wanted to learn the recently
                introduced <a href='https://reactjs.org/docs/hooks-intro.html' target='blank'>React Hooks</a>. Furthermore I wanted to provide developers a decent-looking modal which they could use right away
                without worrying much about styling and stuff.
                <br /><br />
                Enough talk! <a href='#examples'>Click here</a> if you want to jump straight to the examples section.
              </blockquote>
            </Section>
            <Section
              id='installation'
              title='Installation'
              emoji='⚒'
              Text='To install the latest stable version use npm or yarn.'
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
              Text='This is the very basic setup.'
            >
              <Highlighter>
                {`
import { Modal } from 'react-a11y-modal'

export default () =>
  <Modal.Container>
    // you can pass a function as
    // direct child which will receive
    // an object with action methods (e.g. close)
    {({ actions }) =>
      <>
        <Modal.Header>
          <h1>Title</h1>
          <button onClick={actions.close}>Close</h1>
        </Modal.Header>
        <Modal.Body>
          <p>Content</p>
        </Modal.Body>
        <Modal.Footer>
          <button>Button</button>
        </Modal.Footer>
      </>
    }
  </Modal.Container>

// The above produces the following mark-up:
//
// <div className='Modal'>
//   <div className='ModalBackdrop' />
//   <dialog className='ModalContainer'>
//     <div className='ModalHeader'>
//       <h1>Title</h1>
//       …
//     </div>
//     <div className='ModalBody'>
//       <p>Content</p>
//     </div>
//     <div className='ModalFooter'>
//       <button>Button</button>
//     </div>
//   </dialog>
// </div>
                `}
              </Highlighter>
              <blockquote className='Hint'>
                <strong>Oh, by the way</strong><span role='image'>☝️</span><br />
                If you pass all of the child components <code className='CodeHighlight'>{`<Modal.Header />`}</code>, <code className='CodeHighlight'>{`<Modal.Body />`}</code> and <code className='CodeHighlight'>{`<Modal.Footer />`}</code> then the Header and Footer will be sticky and the Body will be scrollable by default.
                <br /><br /><a href='#with-header-body-and-footer'>Check the demo.</a>
              </blockquote>
            </Section>
            <Section
              id='props'
              title='Props'
              emoji='🤓'
              Text='All props are entirely optional. However you can find a detailed overview below:'
            >
              <div className='TableWrapper'>
                <div className='Table'>
                  <div className='TableHead'>
                    <div className='TableHead__row'>
                      <div className='TableHead__cell' />
                      <div className='TableHead__cell'>
                        Type
                      </div>
                      <div className='TableHead__cell'>
                        Default
                      </div>
                      <div className='TableHead__cell'>
                        Description
                      </div>
                    </div>
                  </div>
                  <div className='TableBody'>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        isOpen
                      </div>
                      <div className='TableBody__cell'>
                        Boolean
                      </div>
                      <div className='TableBody__cell'>
                        true
                      </div>
                      <div className='TableBody__cell'>
                        Determines if the modal should be shown
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        namespace
                      </div>
                      <div className='TableBody__cell'>
                        String
                      </div>
                      <div className='TableBody__cell'>
                        Modal
                      </div>
                      <div className='TableBody__cell'>
                        Used for producing HTML classNames
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        styles
                      </div>
                      <div className='TableBody__cell'>
                        Object
                      </div>
                      <div className='TableBody__cell'>
                        {`{}`}
                      </div>
                      <div className='TableBody__cell'>
                        Object with CSS properties for modal elements.
                        <br />
                        <pre>
                          {`
{
  backdrop: {},
  container: {},
  header: {},
  body: {},
  footer: {},
  backdropAfterMount: {},
  backdropBeforeUnmount: {},
  containerAfterMount: {},
  containerBeforeUnmount: {}
}
  `}
                        </pre>
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        refs
                      </div>
                      <div className='TableBody__cell'>
                        Object
                      </div>
                      <div className='TableBody__cell'>
                        {`{}`}
                      </div>
                      <div className='TableBody__cell'>
                        Object as shown below.
                        As value it accepts a function and passes the DOM element as first argument.
                        <pre>
                          {`
{
  backdrop: node => {},
  container: node => {},
  header: node => {},
  body: node => {},
  footer: node => {}
}
  `}
                        </pre>
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        className
                      </div>
                      <div className='TableBody__cell'>
                        String
                      </div>
                      <div className='TableBody__cell'>
                        -
                      </div>
                      <div className='TableBody__cell'>
                        Additional classNames for Container
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        classNameWhenOpened
                      </div>
                      <div className='TableBody__cell'>
                        String
                      </div>
                      <div className='TableBody__cell'>
                        modal-is-opened
                      </div>
                      <div className='TableBody__cell'>
                        Classname which will be added to document.body when modal is shown
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        mountTo
                      </div>
                      <div className='TableBody__cell'>
                        DOM Element
                      </div>
                      <div className='TableBody__cell'>
                        -
                      </div>
                      <div className='TableBody__cell'>
                        DOM Element which will be used as the modals root (see <a href='https://reactjs.org/docs/portals.html' target='blank'>React Portal</a>)
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        ariaAppRoot
                      </div>
                      <div className='TableBody__cell'>
                        DOM Element
                      </div>
                      <div className='TableBody__cell'>
                        -
                      </div>
                      <div className='TableBody__cell'>
                        This element will receive <span className="CodeHighlight">aria-hidden="true"</span> when the modal is shown. It's helpful for screenreaders to understand what's going on. <a href='https://www.w3.org/TR/wai-aria-1.1/#aria-hidden' target='blank'>Learn more</a>
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        ariaLabelledBy
                      </div>
                      <div className='TableBody__cell'>
                        String
                      </div>
                      <div className='TableBody__cell'>
                        -
                      </div>
                      <div className='TableBody__cell'>
                        The id of the element that should be used as the modal's accessible title. You cannot use this in combination with <span className="CodeHighlight">ariaLabel</span>! <a href='https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby' target='blank'>Learn more</a>
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        ariaLabel
                      </div>
                      <div className='TableBody__cell'>
                        String
                      </div>
                      <div className='TableBody__cell'>
                        -
                      </div>
                      <div className='TableBody__cell'>
                        The title of your modal if you don't have one which is visible (on the screen). You cannot use this in combination with <span className="CodeHighlight">ariaLabelledBy</span>! <a href='https://www.w3.org/TR/wai-aria-1.1/#aria-label' target='blank'>Learn more</a>
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        ariaDescribedBy
                      </div>
                      <div className='TableBody__cell'>
                        String
                      </div>
                      <div className='TableBody__cell'>
                        -
                      </div>
                      <div className='TableBody__cell'>
                        Gives the dialog an accessible description by referring to the dialog content that describes the primary message or purpose of the dialog. <a href='https://www.w3.org/TR/wai-aria-1.1/#aria-describedby' target='blank'>Learn more</a>
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        backdropTagName
                      </div>
                      <div className='TableBody__cell'>
                        String
                      </div>
                      <div className='TableBody__cell'>
                        div
                      </div>
                      <div className='TableBody__cell'>
                        Element type for backdrop
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        containerTagName
                      </div>
                      <div className='TableBody__cell'>
                        String
                      </div>
                      <div className='TableBody__cell'>
                        div
                      </div>
                      <div className='TableBody__cell'>
                        Element type for container
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        shouldCloseOnBackdropClick
                      </div>
                      <div className='TableBody__cell'>
                        Boolean
                      </div>
                      <div className='TableBody__cell'>
                        true
                      </div>
                      <div className='TableBody__cell'>
                        Determines if the modal should be closed on backdrop click
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        shouldCloseOnEscClick
                      </div>
                      <div className='TableBody__cell'>
                        Boolean
                      </div>
                      <div className='TableBody__cell'>
                        true
                      </div>
                      <div className='TableBody__cell'>
                        Determines if the modal should be closed on escape key click
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        onEscClick
                      </div>
                      <div className='TableBody__cell'>
                        Function
                      </div>
                      <div className='TableBody__cell'>
                        () => {`{}`}
                      </div>
                      <div className='TableBody__cell'>
                        Callback which will be invoked when user clicked on escape key
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        onBackdropClick
                      </div>
                      <div className='TableBody__cell'>
                        Function
                      </div>
                      <div className='TableBody__cell'>
                        () => {`{}`}
                      </div>
                      <div className='TableBody__cell'>
                        Callback which will be invoked when user clicked on backdrop
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        waitUntilUnmountInMs
                      </div>
                      <div className='TableBody__cell'>
                        Number
                      </div>
                      <div className='TableBody__cell'>
                        0
                      </div>
                      <div className='TableBody__cell'>
                        Delay in milliseconds until the modal should get closed
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        onBeforeShow
                      </div>
                      <div className='TableBody__cell'>
                        Function
                      </div>
                      <div className='TableBody__cell'>
                        () => {`{}`}
                      </div>
                      <div className='TableBody__cell'>
                        Callback which will be invoked before modal is shown
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        onAfterShow
                      </div>
                      <div className='TableBody__cell'>
                        Function
                      </div>
                      <div className='TableBody__cell'>
                        () => {`{}`}
                      </div>
                      <div className='TableBody__cell'>
                        Callback which will be invoked after modal is shown
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        onBeforeClose
                      </div>
                      <div className='TableBody__cell'>
                        Function
                      </div>
                      <div className='TableBody__cell'>
                        () => {`{}`}
                      </div>
                      <div className='TableBody__cell'>
                        Callback which will be invoked before modal is closed
                      </div>
                    </div>
                    <div className='TableBody__row'>
                      <div className='TableBody__cell'>
                        onAfterClose
                      </div>
                      <div className='TableBody__cell'>
                        Function
                      </div>
                      <div className='TableBody__cell'>
                        () => {`{}`}
                      </div>
                      <div className='TableBody__cell'>
                        Callback which will be invoked after modal is closed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
            <Section
              id='license'
              title='License'
              emoji='🔓'
              Text={() => <>The <a href='https://en.wikipedia.org/wiki/MIT_License' target='blank'>MIT License</a>. That said, please feel free to contribute!</>}
            />
            <Section
              id='examples'
              title='Examples'
              titleClassName='Section__title  Section__title--large'
              emoji='💡'
              Text={() =>
                <>
                  Below you can find some examples. For the sake of straightforwardness I have stripped out a few unnecessary lines
                  but if you want you can find the complete source code (more examples as well) <a target='blank' href='https://github.com/pixelmanya/react-a11y-modal/tree/master/example/src/components/Examples'>right here</a>.
                </>
              }
            />
            { state && state.map(({
              name,
              label,
              text,
              code,
              codeLink,
              value,
              Component
            }) => {
              const setState = toggleState(name)

              return (
                <Section
                  id={name}
                  title={label}
                  Text={text}
                  emoji='👀 👈'
                  key={name}
                >
                  <button
                    onClick={() => setState(true)}
                    className='ExampleButton'
                  >
                    Let me see!
                  </button>
                  { codeLink &&
                    <a
                      href={codeLink}
                      target='blank'
                      className='ExampleLink'
                    >
                      View code on Github.
                    </a>
                  }
                  { code &&
                    <Highlighter>
                      { code }
                    </Highlighter>
                  }
                  { value && Component &&
                    <Component
                      onAfterClose={() => setState(false)}
                    />
                  }
                </Section>
              )
            }) }
            <Section
              id='styling'
              title='Styling'
              emoji='💅'
              Text={() =>
                <>
                  For the sake of simplicity react-a11y-modal comes with a basic CSS layout which you can easily extend or get rid of if you want to.
                  However, if you want to have full control of styling, you can do that. Either pass a custom <code className='CodeHighlight'>namespace</code> as a prop and add your own styles and/or pass an empty <code className='CodeHighlight'>styles</code> prop.
                </>
              }
            />
            <Section
              id='accessibility'
              title='Accessibility'
              emoji='♿️'
              Text={() =>
                <>
                  As defined in the <a href='https://www.w3.org/TR/wai-aria-practices/#dialog_modal' target='blank'>W3C Dialog Specification</a>, the focus should move to an element within the opened modal. That said, you will need, in all circumstances, to place a tabbable element inside of the modal. Typically this could be a button which closes the modal again.
                  Or any kind of button.
                </>
              }
            >
              <blockquote className='Attention'>
                <strong>Heads up!</strong><br />
                If you don't follow the spec. mentioned above react-a11y-modal will throw an exception and don't render at all. Keep in mind that this is just about accessibility and I really care about your users!
              </blockquote>
            </Section>
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
    </>
  )
}

export default App
