import React, { Component } from 'react';

export default class CalendarHeader extends Component {

  // 西暦リスト生成
  generateYearsList = () => {
    let list = [];
    const year = this.props.year;
    for (let i = 1; i <= 10; i++) {
      list.push(year + i)
    }
    return list;
  }

  // 月リスト生成
  generateMonthsList = () => {
    let list = [];
    const month = this.props.month;
    for (let i = 1; i < 12; i++) {
      month + i < 13 ? list.push(month + i) : list.push(month + i - 12);
    }
    return list;
  }

  render() {
    // 西暦リスト
    const yearsList = <ul>{this.generateYearsList().map((year, i) => <li key={i} data-year={year} onClick={e => this.props.turnCalendar(e)}>{ year }年</li>)}</ul>
    // 月リスト
    const monthsList = <ul>{this.generateMonthsList().map((month, i) => <li key={i} data-month={month} onClick={e => this.props.turnCalendar(e)}>{ month }月</li>)}</ul>

    return (
      <div className='p-calendar__header'>
        <button className='p-calendar__current-month' onClick={this.props.resetCalendar}>当月</button>
        <button className='p-calendar__prev-month' onClick={this.props.showPreviousMonth}>←</button>
        <div className='p-calendar__label'>
          <div className='p-calendar__year' onMouseOver={this.props.showYears} onMouseLeave={this.props.onMouseLeave}>
            <p>
            {this.props.year}年
            </p>
            <div className='p-calendar__years' onMouseLeave={this.props.onMouseLeave} data-visible={this.props.visible.year}>{ yearsList }</div>
          </div>
          <div className='p-calendar__month' onMouseOver={this.props.showMonths} onMouseLeave={this.props.onMouseLeave}>
            {this.props.month}月
            <div className='p-calendar__months' onMouseLeave={this.props.onMouseLeave} data-visible={this.props.visible.month}>{ monthsList }</div>
          </div>
        </div>
        <button className='p-calendar__next-month' onClick={this.props.showNextMonth}>→</button>
      </div>
    )
  }
}