import React from "react";
import styled from "styled-components";

const Cart = styled.div`
  width: 100%;
  margin: 5px 0;
  border: 1px solid #5f4a4a;
  border-radius: 10px;
  background-color: #fff;
  box-sizing: border-box;
`;

const CartCommentBlock = styled.div`
  padding: 15px 8px;
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  font-size: 20px;
  line-height: 25px;
  overflow: hidden;
`;

const CartInfoBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 8px;
  border-top: 1px solid #5f4a4a;
  i {
    font-size: 12px;
  }
`;

const LikesBlock = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 16px;
    line-height: 16px;
    cursor: pointer;
    user-select: none;
  }
  b {
    margin: 0 10px;
  }
  p {
    font-size: 16px;
    line-height: 16px;
    margin: 0 0 0 10px;
    cursor: pointer;
    user-select: none;
  }
`;

class CartComponent extends React.Component {
  render() {
    const deletePost = () => {
      if (window.confirm("Really want delete?")) {
        this.props.deleteHandle();
      }
      return;
    };
    return (
      <Cart>
        <CartCommentBlock>{this.props.cart.name} </CartCommentBlock>
        <CartInfoBlock>
          <i>Created: {this.props.cart.date.toLocaleString()}</i>
          <LikesBlock>
            <span onClick={this.props.likeHandler}>👍</span>
            <b>{this.props.cart.likes}</b>
            <span onClick={this.props.unlikeHandler}>👎</span>
            <p onClick={deletePost}>❌</p>
          </LikesBlock>
        </CartInfoBlock>
      </Cart>
    );
  }
}

export default CartComponent;
