import React from 'react'
import PropTypes from 'prop-types'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Highlighter = ({
  language = 'javascript',
  children
}) =>
  <SyntaxHighlighter
    className='Code'
    language={language}
    style={tomorrowNightEighties}
  >
    { typeof children === 'string' ? children.trim() : children.map(str => str.trim()) }
  </SyntaxHighlighter>

Highlighter.propTypes = {
  language: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Highlighter
