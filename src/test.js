import React from 'react';
import { mount } from 'enzyme';
import { Modal } from './index';

// Reusable stuff
const Title = () => <h1>Title</h1>;
const Text = () => <p>Text</p>;
const Button = ({ children, ...props }) => (
  <button {...props}>{children || 'Button'}</button>
);
const actionsObj = JSON.parse(
  JSON.stringify({
    close: () => {},
    show: () => {},
    getStyle: () => {},
    setState: () => {}
  })
);

//swallowLogs();

describe('Modal component', () => {
  it('renders modal with button which closes the modal onClick', () => {
    const closeTrigger = jest.fn();
    const component = mount(
      <Modal.Container>
        {({ actions }) => (
          <Button
            onClick={() => {
              if (actions.close) {
                actions.close();
                closeTrigger();
                component.unmount();
              }
            }}
          />
        )}
      </Modal.Container>
    );

    // Check presence of <Modal.Container />
    expect(component.find(Modal.Container).exists()).toBeTruthy();
    // Check presence of <Button />
    expect(component.find(Button).exists()).toBeTruthy();
    // and the absence of the Header, Body and Footer
    expect(component.find(Modal.Header).exists()).toBeFalsy();
    expect(component.find(Modal.Body).exists()).toBeFalsy();
    expect(component.find(Modal.Footer).exists()).toBeFalsy();
    // Trigger click on button which will close the Modal
    component.find(Button).simulate('click');
    // Check if closeTrigger fn has been called once
    expect(closeTrigger).toHaveBeenCalledTimes(1);
    // Finally check if component did unmount
    expect(component.exists()).toBe(false);
  });

  it('renders modal with Header, Body, Footer and some content', () => {
    const component = mount(
      <Modal.Container>
        <Modal.Header>
          <Title />
        </Modal.Header>
        <Modal.Body>
          <Text />
        </Modal.Body>
        <Modal.Footer>
          <Button />
        </Modal.Footer>
      </Modal.Container>
    );

    // Check presence of <Modal.Container />
    expect(component.find(Modal.Container).exists()).toBeTruthy();
    // and the presence of the Header, Body and Footer
    expect(component.find(Modal.Header).exists()).toBeTruthy();
    expect(component.find(Title).exists()).toBeTruthy();
    expect(component.find(Modal.Body).exists()).toBeTruthy();
    expect(component.find(Text).exists()).toBeTruthy();
    expect(component.find(Modal.Footer).exists()).toBeTruthy();
    expect(component.find(Button).exists()).toBeTruthy();
  });

  it(`passes an actions object as first argument when
      <Modal.Container /> received a function`, () => {
    mount(
      <Modal.Container>
        {({ actions }) => {
          expect(JSON.parse(JSON.stringify(actions))).toMatchObject(actionsObj);
          return <Button onClick={actions.close} />;
        }}
      </Modal.Container>
    );
  });

  it(`passes an actions object as first argument when
      <Modal.Header /> received a function`, () => {
    mount(
      <Modal.Container>
        <Modal.Header>
          {({ actions }) => {
            expect(JSON.parse(JSON.stringify(actions))).toMatchObject(
              actionsObj
            );
            return <Button onClick={actions.close} />;
          }}
        </Modal.Header>
      </Modal.Container>
    );
  });

  it('will apply custom styles to <Modal.Header /> from props', () => {
    const styles = {
      header: {
        padding: '1rem',
        background: 'green'
      }
    };
    const component = mount(
      <Modal.Container styles={styles}>
        <Modal.Header>
          <Button />
        </Modal.Header>
      </Modal.Container>
    );

    expect(component.find(Modal.Header)).toHaveStyleRule('background', 'green');
    expect(component.find(Modal.Header)).toHaveStyleRule('padding', '1rem');

    expect(component).toMatchSnapshot();
  });

  it('renders modal without one focusable element will throw an error from <FocusTrap />', () => {
    expect(() => {
      mount(<Modal.Container>A modal without a button.</Modal.Container>);
    }).toThrow();
  });
});
