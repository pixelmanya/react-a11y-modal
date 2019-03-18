import React, { useEffect } from 'react'
import inView from 'in-view'
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
      }
    ]
  },
  {
    href: 'accessibility',
    label: 'Accessibility'
  },
  {
    href: 'styling',
    label: 'Styling'
  },
  {
    href: 'examples',
    label: 'Examples',
    children: Examples.map(item => ({
      href: item.name,
      label: item.label
    }))
  }
]

const scrollToSection = id => event => {
  const element = document.querySelector('#' + id)

  if (element && 'scrollIntoView' in element) {
    event.preventDefault()
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const NavTree = ({
  children = NavItems,
  level = 1
}) => {
  return (
    <ul className={`NavigationLinks NavigationLinks--level-${level}`}>
      { children.map(node =>
        <li className='NavigationLinks__item'>
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

const Navigation = ({
  navRef
}) => {
  // effect for highlighting
  // current section in navigation
  useEffect(() => {
    const NavLinks = document.querySelectorAll('.Navigation__link')
    const Sections = document.querySelectorAll('.Section[id]')
    const activeClassName = 'Navigation__link--active'
    const visible = []
    const getLinkElement = element => element
      ? Array.from(NavLinks)
        .filter(navItem =>
          navItem.href
            .replace(document.location.origin, '')
            .replace('/#', '') ===
          element.id
        )
      : [undefined]

    inView.threshold(0.3)

    const checkVisibility = () => {
      Array.from(Sections).map(Section => {
        const idx = visible.indexOf(Section)

        if (inView.is(Section)) {
          if (idx === -1) {
            visible.push(Section)
          } else {
            visible.splice(idx, 1)
            visible.unshift(Section)
            visible.reverse()
          }
        } else if (idx !== -1) {
          const [link] = getLinkElement(Section)

          link.classList.remove(activeClassName)

          visible.splice(idx, 1)
        }
      })

      visible.map((Section, idx) => {
        const [link] = getLinkElement(Section)

        if (idx === 0) {
          if (window.history.pushState) {
            window.history.pushState(null, null, link.href)
          } else {
            window.location.hash = link.href
          }
        }

        link.classList[idx > 0 ? 'remove' : 'add'](activeClassName)
      })
    }

    document.addEventListener('scroll', checkVisibility)

    checkVisibility()

    return () => document.removeEventListener('scroll', checkVisibility)
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
