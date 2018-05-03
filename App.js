import React from 'react';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}