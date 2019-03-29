import React from 'react';
import PropTypes from 'prop-types';

const Section = ({
  id,
  title,
  titleClassName = 'Section__title',
  emoji,
  Text,
  children
}) => (
  <section id={id} className="Section">
    {title && (
      <h2 className={titleClassName}>
        {title}
        {emoji && (
          <span className="Section__emoji" role="img">
            {emoji}
          </span>
        )}
      </h2>
    )}
    {Text && (
      <p className="Section__text">
        {typeof Text === 'string' ? Text : <Text />}
      </p>
    )}

    {children}
  </section>
);

Section.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  emoji: PropTypes.string,
  Text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Section;
