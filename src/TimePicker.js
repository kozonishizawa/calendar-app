import React from 'react';
import './style.sass';

const TimePicker = (props) => {

  const times = () => {
    let times = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m+=30) {
        let time = `${h}:${('00' + m).slice(-2)}`;
        times.push(time);
      }
    }
    return times;
  }

  const timeList = <ul className='Calendar__timelist'>{times().map((time, i) => <li className='Calendar__timelistitem' key={i} data-time={time} data-beginning={props.beginningTime === time} onClick={e => props.handleClickTime(e)}>{time}</li>)}</ul>;
  
  return (
    <div className='Calendar__timepicker'>
      { timeList }
    </div>
  );

}

export default TimePicker;