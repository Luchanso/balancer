import React from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Label,
  Button,
  Text
} from "native-base";

import Stock from "./src/Stock";
import Money from "./src/Money";

export default class App extends React.Component {
  state = {
    last: 0,
    money: {
    },
    stock: ""
  };

  render() {
    const calculated = Object.values(this.state.money).reduce((acc, next) => acc + Number(next.value), 0);
    const summ = calculated + Number(this.state.stock);

    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Stock value={this.state.stock} onChangeText={this.handleStockChange} />
            {this.renderMoney()}
          </Form>
          <Text style={{ margin: 15 }}>
            money {((calculated / summ) * 100).toFixed(3)} / stock{" "}
            {((this.state.stock / summ) * 100).toFixed(3)}
          </Text>
          <Button style={{ margin: 15 }} onPress={this.handleAdd}>
            <Text>Add</Text>
          </Button>
          <Button style={{ margin: 15 }} onPress={this.handleReset}>
            <Text>Reset</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  renderMoney() {
    return Object.values(this.state.money).map(money => (
      <Money
        key={money.id}
        value={money.value}
        id={money.id}
        onChange={this.handleMoneyChange}
      />
    ));
  }

  handleStockChange = (value) => {
    this.setState({
      stock: value
    })
  }

  handleMoneyChange = (id, value) => {
    const { money } = this.state;
    const newMoney = {
      ...money,
      [id]: {
        ...money[id],
        value
      }
    };

    this.setState({
      money: newMoney
    });
  };

  handleAdd = () => {
    const { money, last } = this.state;
    const newMoney = {
      ...money,
      [last]: {
        id: last,
        value: ''
      },
    };

    this.setState({
      money: newMoney,
      last: this.state.last + 1
    });
  };

  handleReset = () => {
    this.setState({
      money: {},
      last: 0
    });
  };
}
