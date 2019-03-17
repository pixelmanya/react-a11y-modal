import React from 'react'
import PropTypes from 'prop-types'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import tomorrow from 'react-syntax-highlighter/dist/styles/prism/tomorrow'

const trim = str => str.trim()

const Highlighter = ({
  language = 'jsx',
  children
}) =>
  <SyntaxHighlighter
    className='Code'
    language={language}
    style={tomorrow}
  >
    { typeof children === 'string' ? trim(children) : children.map(trim) }
  </SyntaxHighlighter>

Highlighter.propTypes = {
  language: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Highlighter
