import React, { Component } from 'react';

export default class TimePicker extends Component {

  times = () => {
    let times = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m+=30) {
        let time = `${h}:${('00' + m).slice(-2)}`;
        times.push(time);
      }
    }
    return times;
  }

  render() {
    const times = <ul className='p-calendar__timelist'>{this.times().map((time, i) => <li className='p-calendar__timelistitem' key={i} data-time={time} data-beginning={this.props.beginningTime === time} onClick={e => this.props.handleClickTime(e)}>{time}</li>)}</ul>;
    return (
      <div className='p-calendar__timepicker'>
        { times }
      </div>
    );

  }

}