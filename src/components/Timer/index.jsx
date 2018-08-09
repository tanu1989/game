import React from "react";
import PropTypes from "prop-types";

import styles from "./Timer.scss";

export const formatTime = time => {
  if (time < 0) return "--:--";
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const mm = m < 10 ? `0${m}` : m;
  const s = time % 60;
  const ss = s < 10 ? `0${s}` : s;
  if (h > 0) return [h, mm, ss].join(":");
  return `${m}:${ss}`;
};

const TimerComponent = ({ time = 0 }) => (
  <div className={styles.timer}>{formatTime(time)}</div>
);

TimerComponent.propTypes = {
  time: PropTypes.number
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1
    });
  }

  render() {
    return <TimerComponent time={this.state.secondsElapsed} />;
  }
}

export default Timer;
