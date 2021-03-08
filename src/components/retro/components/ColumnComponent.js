import React from "react";
import styled from "styled-components";

import CardComponent from "./CardComponent";
import FormComponent from "./FormComponent";
import { Button } from "./Button";

const Column = styled.div`
  width: 33.33%;
  height: calc(100% - 20px);
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #666;
  box-sizing: border-box;
`;

const ColumnTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  letter-spacing: 1.3px;
  background-color: ${(props) => props.bgc};
  padding: 10px;
  border: 1px solid #5f4a4a;
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
  b {
    font-size: 19px;
    min-width: 20px;
    text-align: center;
    border-radius: 50%;
    color: black;
    padding: 3px;
    background-color: #fff;
  }
`;

const CardWrapper = styled.div`
  height: ${({ height }) =>
    height.toString() ? "calc(100% - 170px)" : "calc(100% - 90px)"};
  overflow-y: scroll;
`;

class ColumnComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: false, cards: [] };
    this.color = this.props.color;
    this.name = this.props.name;
  }

  submit = (data) => {
    this.setState({
      cards: [...this.state.cards, { name: data, likes: 0, date: new Date() }],
    });
  };

  likeHandler = (i) =>
    this.setState({
      cards: this.state.cards.map((card, index) => {
        if (index === i) {
          return { ...card, likes: card.likes + 1 };
        } else {
          return card;
        }
      }),
    });

  unlikeHandler = (i) =>
    this.setState({
      cards: this.state.cards.map((card, index) => {
        if (index === i) {
          return { ...card, likes: card.likes - 1 };
        } else {
          return card;
        }
      }),
    });

  deleteHandle = (id) => {
    this.setState({
      cards: this.state.cards.filter((_, index) => index !== id),
    });
  };

  render() {
    return (
      <Column>
        <ColumnTitle bgc={this.color}>
          {this.name.toUpperCase()}
          {this.state.cards.length > 0 && <b>{this.state.cards.length}</b>}
        </ColumnTitle>
        {!this.state.form && (
          <Button onClick={() => this.setState({ form: true })}>
            Add new comment to {this.name.toUpperCase()}
          </Button>
        )}

        {this.state.form && (
          <FormComponent
            form={this.state.form}
            submitHandler={(data) => this.submit(data)}
            closeHandler={() => this.setState({ form: false })}
          />
        )}

        <CardWrapper height={this.state.form}>
          {this.state.cards
            .sort((a, b) => b.likes - a.likes)
            .map((cart, index) => {
              return (
                <CardComponent
                  key={index}
                  cart={cart}
                  deleteHandle={() => this.deleteHandle(index)}
                  likeHandler={() => this.likeHandler(index)}
                  unlikeHandler={() => this.unlikeHandler(index)}
                  updatePost={() => this.updateHandler(index)}
                />
              );
            })}
        </CardWrapper>
      </Column>
    );
  }
}

export default ColumnComponent;
