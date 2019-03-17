import React, { useReducer, useEffect } from 'react'
import pick from 'lodash/pick'
import merge from 'lodash/merge'
import { defaultProps } from './index'
import { applyStyles } from './helper'

const ModalContext = React.createContext()

function reducer(state, action) {
  const { payload } = action

  switch (action.type) {
    case 'shallHide':
      return {
        ...state,
        shallHide: true
      }
    case 'setState':
      return {
        ...state,
        ...payload
      }
    case 'show':
    case 'hide':
    default:
      return {
        ...state,
        isOpen: action.type === 'show'
      }
  }
}

function ModalContextProvider({
  children
}) {
  const initialState = defaultProps
  const [state, dispatch] = useReducer(reducer, merge(
    {},
    initialState,
    pick(children.props, Object.keys(initialState))
  ))
  const hasStyles = property => state && state.styles && state.styles[property] && Object.keys(state.styles[property]).length
  const actions = {
    show: () => {
      dispatch({ type: 'show' })
    },
    close: () => {
      state.onBeforeClose()

      let styles = {}

      if (hasStyles('backdropBeforeUnmount')) {
        styles = {
          ...styles,
          backdrop: {
            ...state.styles.backdrop,
            ...state.styles.backdropBeforeUnmount
          }
        }
      }

      if (hasStyles('containerBeforeUnmount')) {
        styles = {
          ...styles,
          container: {
            ...state.styles.container,
            ...state.styles.containerBeforeUnmount
          }
        }
      }

      if (Object.keys(styles).length) {
        applyStyles({
          styles,
          state,
          actions
        })
      }

      dispatch({ type: 'shallHide' })
    },
    setState: payload => {
      dispatch({
        type: 'setState',
        payload
      })
    },
    hasStyles
  }
  const value = { state, dispatch, actions }

  if (state.isOpen) {
    state.onBeforeShow()
  }

  useEffect(() => {
    if (state.isOpen) {
      state.onAfterShow()
    }

    return () =>
      state.onAfterClose()
  }, [state.isOpen])

  useEffect(() => {
    let timeout

    if (state.shallHide) {
      timeout = setTimeout(() => actions.setState({
        shallHide: false,
        isOpen: false
      }), state.waitUntilUnmountInMs)
    }

    return () => clearTimeout(timeout)
  })

  return (
    <ModalContext.Provider value={value}>
      { children }
    </ModalContext.Provider>
  )
}

const ModalContextConsumer = ModalContext.Consumer

export {
  ModalContext,
  ModalContextProvider,
  ModalContextConsumer
}
