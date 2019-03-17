import { css } from '@emotion/core'

export const Backdrop = css`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: lightgray;
  opacity: .2;
`

/*
  top: 50px;
  bottom: 50px;
  left: 50px;
  right: 50px;
*/

export const Container = css`
  overflow: hidden;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  grid-template-rows: auto;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 6px;
  border: none;
  width: auto;
  height: auto;
  box-shadow:
    0px 11px 15px -7px rgba(0,0,0,0.2),
    0px 24px 38px 3px rgba(0,0,0,0.14),
    0px 9px 46px 8px rgba(0,0,0,0.12);
  background: white;

  @media screen and (max-width: 600px) {
    top: 25px;
    bottom: 25px;
    left: 25px;
    right: 25px;
  }

  @media screen and (max-width: 375px) {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 0;
  }
`

export const Header = css`
  border-bottom: 1px solid lightgray;
  padding: 1rem;

  &__title {
    font-size: 1.5rem;
    line-height: 2;
  }
`

export const Body = css`
  padding: 1rem;
  overflow-y: auto;
  font-size: 1rem;
  line-height: 1.5;
`

export const Footer = css`
  box-shadow: 0 5px 30px rgba(0, 0, 0, .4);
  padding: 1rem;
  text-align: right;
`

export default {
  Backdrop,
  Container,
  Header,
  Body,
  Footer
}
