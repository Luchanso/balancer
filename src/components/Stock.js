import React, { Component } from 'react';
import { Input, Label, Item } from 'native-base';

export default class Money extends Component {
    render() {
        const { last } = this.props;

        return (
            <Item floatingLabel style={{ marginBottom: 20 }}>
              <Label>Stock</Label>
              <Input {...this.props} keyboardType="numeric" />
            </Item>
        )
    }
}
