import React from "react";
import { AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Label,
  Button,
  Text,
  Spinner,
  View
} from "native-base";

import Stock from "./Stock";
import Money from "./Money";
import AsyncRender from "./AsyncRender";
import { STORE_STATE_KEY } from "../config";

export default class App extends React.Component {
  state = {
    last: 0,
    money: {},
    stock: "",
    isLoading: true
  };

  componentDidUpdate() {
    const { isLoading, ...stateForSave } = this.state;
    AsyncStorage.setItem(STORE_STATE_KEY, JSON.stringify(stateForSave));
  }

  async componentDidMount() {
    try {
      const value = JSON.parse(await AsyncStorage.getItem(STORE_STATE_KEY));

      if (value !== null) {
        this.setState({
          ...value
        });
      }
    } catch (error) {}

    this.setState({
      isLoading: false
    });
  }

  render() {
    const { isLoading } = this.state;

    return (
      <AsyncRender
        isLoading={isLoading}
        renderFunc={this.renderContent}
        loaderFunc={this.renderSpinner}
      />
    );
  }

  renderSpinner() {
    return <Spinner color="blue" style={{ margin: 50 }} />;
  }

  renderContent = () => {
    const calculated = Object.values(this.state.money).reduce(
      (acc, next) => acc + Number(next.value),
      0
    );
    const summ = calculated + Number(this.state.stock);

    const moneyResult = summ ? (calculated / summ * 100).toFixed(3) : "0.000";
    const stockResult = summ
      ? (this.state.stock / summ * 100).toFixed(3)
      : "0.000";

    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Stock
              value={this.state.stock}
              onChangeText={this.handleStockChange}
            />
            {this.renderMoney()}
          </Form>
          <Text style={{ margin: 15, marginBottom: 7.5 }}>
            stock {stockResult} / money {moneyResult}{'\n'}
            stock {this.state.stock} / money {calculated} / sum {summ}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Button
              style={{ marginLeft: 15, marginVertical: 7.5 }}
              onPress={this.handleAdd}
            >
              <Text>Add</Text>
            </Button>
            <Button
              style={{ marginLeft: 15, marginVertical: 7.5 }}
              onPress={this.handleReset}
              danger
            >
              <Text>Reset</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  };

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

  handleStockChange = value => {
    this.setState({
      stock: value
    });
  };

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
        value: ""
      }
    };

    this.setState({
      money: newMoney,
      last: this.state.last + 1
    });
  };

  handleReset = () => {
    this.setState({
      money: {},
      stock: "0",
      last: 0
    });
  };
}
