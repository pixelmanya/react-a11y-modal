import React, { useEffect } from 'react'
import { Definition as Examples } from './Examples'

const NavItems = [
  {
    href: false,
    label: 'Getting started',
    children: [
      {
        href: 'foreword',
        label: 'Foreword'
      },
      {
        href: 'installation',
        label: 'Installation'
      },
      {
        href: 'usage',
        label: 'Usage'
      },
      {
        href: 'props',
        label: 'Props'
      }
    ]
  },
  {
    href: 'examples',
    label: 'Examples',
    children: Examples.map(item => ({
      href: item.name,
      label: item.label
    }))
  },
  {
    href: 'styling',
    label: 'Styling'
  },
  {
    href: 'accessibility',
    label: 'Accessibility'
  }
]

const scrollToSection = id => event => {
  const element = document.querySelector('#' + id)

  if (element && 'scroll' in window) {
    event.preventDefault()
    event.stopPropagation()

    window.scrollBy({
      top: element.getBoundingClientRect().top,
      behavior: 'smooth'
    })
  }
}

const NavTree = ({
  children = NavItems,
  level = 1
}) => {
  return (
    <ul className={`NavigationLinks NavigationLinks--level-${level}`}>
      { children.map((node, idx) =>
        <li
          key={idx}
          className='NavigationLinks__item'
        >
          <a
            onClick={scrollToSection(node.href)}
            href={'#' + (node.href ? node.href : '')}
            className='Navigation__link'
          >
            { node.label }
          </a>
          {
            node.children
              ? (
                <NavTree
                  children={node.children}
                  level={level + 1}
                />
              )
              : null
          }
        </li>
      ) }
    </ul>
  )
}

const createObserver = (callback, options = {
  threshold: new Array(101).fill(0).map((v, i) => i * 0.01)
}) =>
  window.IntersectionObserver !== undefined
    ? new window.IntersectionObserver(
      callback,
      options
    )
    : undefined

const Navigation = ({
  navRef
}) => {
  // effect for highlighting
  // current section in navigation

  useEffect(() => {
    const NavLinks = document.querySelectorAll('.Navigation__link')
    const Sections = document.querySelectorAll('.Section[id]')
    const activeClassName = 'Navigation__link--active'
    const getLinkElement = element => element
      ? Array.from(NavLinks)
        .filter(navItem =>
          navItem.href
            .replace(document.location.origin + document.location.pathname, '')
            .replace('#', '') ===
          element.id
        )
      : [undefined]
    let visible = null
    const previousMap = {}
    const onVisible = entries => {
      entries.forEach(entry => {
        const currentY = entry.boundingClientRect.y
        const currentRatio = entry.intersectionRatio
        const isIntersecting = entry.isIntersecting
        const Section = entry.target
        let direction
        const { previousY = 0, previousRatio = 0 } = previousMap[Section.id] || {}

        // Scrolling down/up
        if (currentY < previousY) {
          if (currentRatio > previousRatio && isIntersecting) {
            direction = 'Scrolling down enter'
            visible = Section
          } else {
            direction = 'Scrolling down leave'
          }
        } else if (currentY > previousY && isIntersecting) {
          if (currentRatio < previousRatio) {
            direction = 'Scrolling up leave'
          } else {
            direction = 'Scrolling up enter'
            visible = Section
          }
        }

        previousMap[Section.id] = {
          previousY: currentY,
          previousRatio: currentRatio
        }
      })

      Array.from(Sections).map(item => {
        const [link] = getLinkElement(item)

        if (link) {
          link.classList.remove(activeClassName)
        }
      })

      if (visible) {
        const [link] = getLinkElement(visible)

        if (link) {
          if (window.history.pushState) {
            window.history.pushState(null, null, link.href)
          } else {
            window.location.hash = link.href
          }

          link.classList.add(activeClassName)
        }
      }
    }
    const observer = createObserver(onVisible)

    if (observer) {
      Array.from(Sections).map(el => observer.observe(el))
    }

    return () => observer ? observer.disconnect() : null
  })

  return (
    <>
      <a
        onClick={() => document.body.classList.toggle('navigation-is-visible')}
        className='NavigationSwitch'
      >
        <span className='NavigationSwitch__line' />
        <span className='NavigationSwitch__line' />
        <span className='NavigationSwitch__line' />
      </a>
      <nav
        ref={navRef}
        className='Navigation'
      >
        <NavTree />
      </nav>
    </>
  )
}

export default Navigation
