import React, { Component } from "react";
import { Input, Label, Item } from "native-base";

export default class Money extends Component {
  render() {
    const { last, id, onChange, ...otherProps } = this.props;

    return (
      <Item floatingLabel>
        <Label>Money</Label>
        <Input
          {...otherProps}
          onChangeText={this.handleChange}
          keyboardType="numeric"
        />
      </Item>
    );
  }

  handleChange = (text) => {
    const { id, onChange } = this.props;
    onChange(id, text);
  };
}
