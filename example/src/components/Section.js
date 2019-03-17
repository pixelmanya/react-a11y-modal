import React from 'react'
import PropTypes from 'prop-types'

const Section = ({
  id,
  title,
  emoji,
  text,
  children
}) =>
  <section className='Section'>
    { title && (
      <h2 id={id} className='Section__title'>
        { title }
        { emoji && (
          <span className='Section__emoji' role='img'>
            { emoji }
          </span>
        )}
      </h2>
    )}
    { text && (
      <p className='Section__text'>
        { text }
      </p>
    )}
    { children }
  </section>

Section.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  emoji: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Section
