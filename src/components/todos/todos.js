import React from "react";
// import styled from "styled-components";

import { TodoItem } from "./todoItem";

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 1, todos: [], users: [], input: "", search: "" };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data });
      });
    fetch(
      `https://jsonplaceholder.typicode.com/todos?userId=${this.state.current}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ todos: data });
      });
  }
  componentDidUpdate(_, nextState) {
    if (this.state.current !== nextState.current) {
      fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${this.state.current}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({ todos: data });
        });
    }
  }

  addTodoItem = (id) => {
    if (this.state.input === "") {
      alert("Empty todo is forbidden");
    } else {
      this.setState({ input: "" });
      return fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify({
          title: this.state.input,
          completed: false,
          userId: id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => this.setState({ todos: [...this.state.todos, json] }));
    }
  };

  render() {
    const withTodoItem = (Component) => (props) => {
      const onDone = (todo) => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            completed: false,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((response) => {
          if (response.status === 200) {
            this.setState((state) => ({
              todos: state.todos.map((item) =>
                item.id === todo.id
                  ? {
                      ...item,
                      completed: true,
                    }
                  : item
              ),
            }));
          }
        });
      };

      return <Component onDone={onDone} {...props} />;
    };

    const TodoItemWithOnDone = withTodoItem(TodoItem);

    return (
      <div>
        <div style={{ margin: "60px" }}>
          <select
            onChange={(e) =>
              this.setState({ current: e.target.value, search: "" })
            }
            style={{ marginRight: "10px" }}
          >
            {this.state.users.map((user) => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            value={this.state.input}
            ref={(input) => {
              this.addInput = input;
            }}
            onChange={(e) => this.setState({ input: e.target.value })}
          />
          <button
            onClick={() => {
              this.addTodoItem(this.state.current);
              this.addInput.focus();
            }}
            style={{ marginRight: "10px" }}
          >
            Add
          </button>
          <input
            type="text"
            value={this.state.search}
            ref={(input) => {
              this.searchInput = input;
            }}
            onChange={(e) => this.setState({ search: e.target.value })}
          />
          <div>
            {this.state.todos.map((todo, index) => (
              <TodoItemWithOnDone
                key={todo.id}
                todo={todo}
                index={index}
                search={this.state.search}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Todos;
