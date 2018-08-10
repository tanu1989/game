import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { formatTime } from "../../utils/format";

const TimerComponent = ({ time = 0 }) => <div>{formatTime(time)}</div>;

TimerComponent.propTypes = {
  time: PropTypes.number
};

class Timer extends PureComponent {
  state = {
    secondsElapsed: this.props.timeTrack
  };

  static propTypes = {
    recordTime: PropTypes.func.isRequired,
    timeTrack: PropTypes.number.isRequired
  };

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (
      nextProps.timeTrack === 0 ||
      (nextProps.timeTrack === 0 && this.props.timeTrack > 0)
    ) {
      this.setState({ secondsElapsed: 0 }, () => {
        clearInterval(this.interval);
        this.interval = setInterval(this.tick.bind(this), 1000);
      });
    }
  }

  componentDidUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState(
      {
        secondsElapsed: this.state.secondsElapsed + 1
      },
      () => {
        this.props.recordTime(this.state.secondsElapsed);
      }
    );
  }

  render() {
    return <TimerComponent time={this.state.secondsElapsed} />;
  }
}

export default Timer;
