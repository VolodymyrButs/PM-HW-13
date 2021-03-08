import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import styled from "styled-components";

import Weather from "./components/weather/Weather";
import Retro from "./components/retro/Retro";
import Todos from "./components/todos/todos";

const NavHeader = styled.ul`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  li {
    list-style: none;
    margin: 0 20px;
    padding: 3px 8px;
    border-radius: 8px;
    background-color: #666;
    cursor: pointer;
    a {
      text-decoration: none;
      color: #fff;
    }
    .selected {
      font-weight: bold;
      text-decoration: underline;
    }
  }
`;

const Hello = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: palevioletred;
  background-color: palegoldenrod;
`;

const App = () => {
  return (
    <Router>
      <NavHeader>
        <li>
          <NavLink to="/weather" activeClassName="selected">
            Wearher
          </NavLink>
        </li>

        <li>
          <NavLink to="/retro" activeClassName="selected">
            Retro
          </NavLink>
        </li>
        <li>
          <NavLink to="/todos" activeClassName="selected">
            Todos
          </NavLink>
        </li>
      </NavHeader>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/weather">
          <Weather />
        </Route>
        <Route path="/retro">
          <Retro />
        </Route>
        <Route path="/todos">
          <Todos />
        </Route>
        <Route path="/">
          <Hello>Hello!! Select path on nav-header)</Hello>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
