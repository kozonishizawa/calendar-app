import React, {useState } from 'react';
import './style.sass';

const CalendarHeader = props => {

  const [visible, setVisible] = useState({
    year: false,
    month: false,
  });
  // 年リスト表示
  const showYears = () => {
    setVisible({
      year: true,
      month: false,
    });
  }

  // 月リストを表示
  const showMonths = () => {
    setVisible({
      year: false,
      month: true,
    });
  }

  // マウスが離れた時
  const onMouseLeave = () => {
    setVisible({
      year: false,
      month: false,
    });
  }

  // 西暦リスト生成
  const generateYearsList = () => {
    let list = [];
    const year = props.year;
    for (let i = 1; i <= 10; i++) {
      list.push(year + i)
    }
    return list;
  }

  // 月リスト生成
  const generateMonthsList = () => {
    let list = [];
    const month = props.month;
    for (let i = 1; i < 12; i++) {
      month + i < 13 ? list.push(month + i) : list.push(month + i - 12);
    }
    return list;
  }
  // 西暦リスト
  const yearsList = <ul>{generateYearsList().map((year, i) => <li key={i} data-year={year} onClick={e => props.turnCalendar(e)}>{ year }年</li>)}</ul>
  // 月リスト
  const monthsList = <ul>{generateMonthsList().map((month, i) => <li key={i} data-month={month} onClick={e => props.turnCalendar(e)}>{ month }月</li>)}</ul>

  return (
    <div className='Calendar__header'>
      <button className='Calendar__currentMonth' onClick={props.resetCalendar}>当月</button>
      <button className='Calendar__prevMonth' onClick={props.showPreviousMonth}>←</button>
      <div className='Calendar__label'>
        <div className='Calendar__year' onMouseOver={showYears} onMouseLeave={onMouseLeave}>
          <p>
          {props.year}年
          </p>
          <div className='Calendar__years' onMouseLeave={onMouseLeave} data-visible={visible.year}>{ yearsList }</div>
        </div>
        <div className='Calendar__month' onMouseOver={showMonths} onMouseLeave={onMouseLeave}>
          {props.month}月
          <div className='Calendar__months' onMouseLeave={onMouseLeave} data-visible={visible.month}>{ monthsList }</div>
        </div>
      </div>
      <button className='Calendar__nextMonth' onClick={props.showNextMonth}>→</button>
    </div>
  )
}

export default CalendarHeader;