import { css } from '@emotion/core';

const pxToRem = value => value / 16 + 'rem';

export const backdrop = css`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: lightgray;
  opacity: 0.2;
`;

export const container = ({ hasHeaderBodyAndFooter }) => css`
  display: grid;
  grid-template-rows: auto;
  overflow: hidden;
  position: fixed;
  max-width: ${pxToRem(500)};
  border-radius: 6px;
  border: none;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  background: white;

  ${!hasHeaderBodyAndFooter
    ? `
    top: 50%;
    left: 50%;
    right: 0;
    height: auto;
    transform: translate(-50%, -50%);

    @media screen and (max-width: ${pxToRem(375)}) {
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100vh;
      transform: none;
    }
  `
    : `
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vh;
    height: calc(100vh - ${pxToRem(100)});
    margin: ${pxToRem(50)} auto 0;

    @media screen and (max-width: ${pxToRem(485)}) {
      max-width: 100%;
      margin: ${pxToRem(25)} auto 0;
      height: 100vh;
      margin: 0;
    }
  `}
`;

export const header = css`
  border-bottom: 1px solid lightgray;
  padding: 1rem;

  &__title {
    font-size: 1.5rem;
    line-height: 2;
  }
`;

export const body = css`
  padding: 1rem;
  overflow-y: auto;
  font-size: 1rem;
  line-height: 1.5;
`;

export const footer = css`
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.4);
  padding: 1rem;
  text-align: right;
`;

export default {
  backdrop,
  container,
  header,
  body,
  footer
};
