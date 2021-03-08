import React from "react";
import styled from "styled-components";

import DayComponent from "./DayComponent";

const AppWrapper = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(bg.jpg) no-repeat;
  background-size: cover;
`;
const DaysComponent = styled.div`
  width: 100%;
  overflow: scroll;
`;
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weather: [] };
  }
  componentDidMount() {
    fetch(
      "http://api.weatherunlocked.com/api/forecast/50.27,30.31?app_id=231e22db&app_key=992c0bfbce0848660ff960fc64beea9c"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ weather: data.Days });
      });
  }

  render() {
    return (
      <AppWrapper>
        <h1>Weather in Kyiv for 7 days</h1>
        <DaysComponent>
          {this.state.weather &&
            this.state.weather.map((day) => (
              <DayComponent key={day.date + day.moonrise_time} dayData={day} />
            ))}
        </DaysComponent>
      </AppWrapper>
    );
  }
}

export default Weather;
