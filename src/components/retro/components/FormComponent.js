import React from "react";
import styled from "styled-components";

import { Button } from "./Button";

const Form = styled.form`
  margin: 5px 0;
  textarea {
    min-width: 100%;
    max-width: 100%;
    min-height: 30px;
    max-height: 100px;
    font-size: 16px;
    padding: 8px;
    border-radius: 10px;
    box-sizing: border-box;
    :focus {
      outline: none;
    }
  }
  div {
    display: flex;
    justify-content: flex-end;
  }
`;

const ButtonForm = styled(Button)`
  width: auto;
  margin: 0 3px;
`;

class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  componentDidMount() {
    this.nameInput.focus();
  }
  render() {
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.submitHandler(this.state.text);
          this.props.closeHandler();
        }}
      >
        <textarea
          type="text"
          required
          name="text"
          rows="3"
          placeholder="input comment text here"
          ref={(input) => {
            this.nameInput = input;
          }}
          onChange={(e) => this.setState({ text: e.target.value })}
        ></textarea>
        <div>
          <ButtonForm type="submite">Add</ButtonForm>
          <ButtonForm onClick={this.props.closeHandler}>Cancel</ButtonForm>
        </div>
      </Form>
    );
  }
}

export default FormComponent;
