import React from 'react';
import './style.sass';

const DatePicker = props => {
  
  const isToday = day => {
    const date = new Date();
    if (date.getFullYear() === props.year && date.getMonth() + 1 === props.month && date.getDate() === day) {
      return true;
    } else {
      return false;
    }
  }
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  // 当月１日の日付
  const firstDate = new Date(props.year, props.month -1, 1);
  // 翌月の０日を指定して当月の末日の日付を取得
  const lastDate = new Date(props.year, props.month, 0);
  // 当月の日数
  const lastDayCount = lastDate.getDate();
  // 当月初日の曜日
  const firstDay = firstDate.getDay();
  // 前月末日の日付
  const lastMonthEndDate = new Date(props.year, props.month - 1, 0);
  // 前月末日
  const lastMonthDayCount = lastMonthEndDate.getDate()
  // 曜日を表示する
  const showWeekdays = <tr>{weekdays.map((weekday, i) => <th key={i}>{ weekday }</th>)}</tr>;
    
  let weeks = [[]];
  // 前月の最終週を生成
  for (let i = 0; i < firstDay; i++) {
    weeks[0].unshift(lastMonthDayCount - i);
  }
  // 当月の１周目を生成
  for (let i = 1; weeks[0].length < 7; i++) {
    weeks[0].push(i);
  }
  // 当月の２周目以降を生成
  for (let week = 1; week < 6; week++) {
    let days = [];
    for (let day = weeks[week - 1][6] + 1; days.length < 7 && day <= lastDayCount; day++) {
      days.push(day);
    }
    if (days.length) weeks.push(days);
  }
  // 翌月の１周目を生成
  for (let i = 1; weeks[weeks.length - 1].length < 7; i++) {
    weeks[weeks.length - 1].push(i);
  }
  
  const showWeeks = weeks.map((week, i) => {
    return (
      <tr key={i}>
        {week.map((day, n) => {
          // 当月の日付かどうか判定
          if ((i === 0 && day > 22) || (i >= 4 && day < 7)) { 
            return (
              <td className='Calendar__cell' key={n} data-year={props.year} data-month={props.month} data-date={day} data-weekday={n} onClick={ e => props.hundleClickDate(e)} data-anothermonth={true}>{day}</td>
            )
          } else {
            return (
              <td className='Calendar__cell' key={n} data-year={props.year} data-month={props.month} data-date={day} data-weekday={n} data-today={isToday(day)} onClick={ e => props.hundleClickDate(e)}>{day}</td>
            )
          }
        }
        )}
      </tr>
    )
  })

  return (
    <table className='Calendar__table'>
      <thead>
        { showWeekdays }
      </thead>
      <tbody>
        { showWeeks }
      </tbody>
    </table>
  )
}

export default DatePicker;