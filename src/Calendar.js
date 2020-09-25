import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CalendarHeader from './CalendarHeader';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      today: date.getDate(),
      history: [{
        text: '下記日程のご都合はいかがでしょうか。',
        beginningTime: '',
      }],
      forward: [],
      stepNumber: 0,
      visible: {
        year: false,
        month: false,
      },
      // copied: false,
    };
  }

  // 前月を表示
  showPreviousMonth = () => {
    this.setState({
      year: this.state.month <= 1 ? this.state.year - 1 : this.state.year,
      month: this.state.month <= 1 ? 12 : this.state.month - 1,
    });
  }

  // 翌月を表示
  showNextMonth = () => {
    this.setState({
      year: this.state.month >= 12 ? this.state.year + 1 : this.state.year,
      month: this.state.month >= 12 ? 1 : this.state.month + 1,
    });
  }

  // 当月を表示
  resetCalendar = () =>{
    const date = new Date();
    this.setState({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      today: date.getDate(),
    });
  }

  // 年リスト表示
  showYears = () => {
    this.setState({
      visible: {
        year: true,
        month: false,
      },
    })
  }

  // 月リストを表示
  showMonths = () => {
    this.setState({
      visible: {
        year: false,
        month: true,
      },
    })
  }

  // マウスが離れた時
  onMouseLeave = () => {
    this.setState({
      visible: {
        year: false,
        month: false,
      },
    })
  }

  // 日付をクリック
  hundleClickDate = e => {
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const data = e.target.dataset;
    const month = data.month;
    const date = data.date;
    const weekday = data.weekday;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    console.log(`${month}月${date}日（${weekdays[weekday]}）`);
    const text = `\n${month}月${date}日（${weekdays[weekday]}）`;
    this.setState({
      history: history.concat([{
        text: history[history.length -1].text + text,
        beginningTime: '',
      }]),
      forward: [],
      stepNumber: history.length,
    });
      console.log(`step: ${this.state.stepNumber} history: ${this.state.history.length} forward: ${this.state.forward.length}` );
  }

  // 時間をクリック
  handleClickTime = e => {
    const time = e.target.dataset.time;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const text = history[history.length - 1].beginningTime ? `${time}　` : `${time}〜`;
    this.setState({
      history: history.concat([{
        text: history[history.length -1].text + text,
        beginningTime: history[history.length -1].beginningTime ? '' : time,
      }]),
      forward: [],
      stepNumber: history.length,
    });
      console.log(`step: ${this.state.stepNumber} history: ${this.state.history.length} forward: ${this.state.forward.length}` );
  }

  // カレンダーをめくる
  turnCalendar = e => {
    const data = e.target.dataset;
    console.log(data);
    this.setState({
      year: data.year ? parseInt(data.year) : this.state.year,
      month: data.month ? parseInt(data.month) : this.state.month,
    })
  }

  // 文字を入力
  onChangeText = e => {
    const text = e.target.value;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    this.setState({
      history: history.concat([{
        text: text,
        beginningTime: history[history.length -1].beginningTime,
      }]),
      forward: [],
      stepNumber: history.length,
    })
  }

  // 戻る
  goBack = () => {
    const history = this.state.history.slice(0, this.state.stepNumber);
    const forward = this.state.history.slice(0, this.state.stepNumber + 1);
    if (history.length > 0) {
      history.splice(history.length - 1, 1,{
        text: history[history.length - 1].text,
        beginningTime: history[history.length -1].beginningTime,
      });
      const stepNumber = this.state.stepNumber;
      this.setState({
        history: history,
        forward: this.state.forward.concat(forward[forward.length - 1]),
        stepNumber: stepNumber - 1,
      })
      console.log(`step: ${this.state.stepNumber} history: ${this.state.history.length} forward: ${this.state.forward.length}` );
    }
  }

  // 進む
  goForward = () => {
    if (this.state.forward.length) {
      const history = this.state.history.slice();
      const forward = this.state.forward.slice();
      const [recent, ...rest] = forward.reverse();
      const stepNumber = this.state.stepNumber;
      this.setState({
        history: history.concat(recent),
        forward: rest.reverse(),
        stepNumber: stepNumber + 1,
      })
    }
    console.log(`step: ${this.state.stepNumber} history: ${this.state.history.length} forward: ${this.state.forward.length}` );
  }

  // リセット
  reset = () => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    this.setState({
      history: history.concat([{
        text: '下記日程のご都合はいかがでしょうか。',
        beginningTime: '',
      }]),
      stepNumber: history.length,
    })
  }

  // コピー
  onCopy = () => {
    this.setState({copied: true});
  };

  // うんこ
  unko = () => {
    const history = this.state.history;
    console.log(history[history.length - 1].beginningTime);
  }

  render() {

    return (
      <div className='p-calendar'>
        <section className='p-calendar__screen'>
          <textarea cols='50' rows='10' value={this.state.history[this.state.history.length -1].text} onChange={e => this.onChangeText(e)}></textarea>
        </section>
        <section className='p-calendar__datetimepicker'>
          <div className='p-calendar__calendar'>
            <CalendarHeader year={this.state.year} month={this.state.month} visible={this.state.visible} turnCalendar={this.turnCalendar} showPreviousMonth={this.showPreviousMonth} showNextMonth={this.showNextMonth} resetCalendar={this.resetCalendar} showYears={this.showYears} showMonths={this.showMonths} onMouseLeave={this.onMouseLeave} />
            <DatePicker year={this.state.year} month={this.state.month} hundleClickDate={this.hundleClickDate} />
          </div>
          <TimePicker handleClickTime={this.handleClickTime}  beginningTime={this.state.history[this.state.history.length -1].beginningTime} />
        </section>
        <section className='p-calendar__buttons'>
          <div className='l-col-4'>
            <button className='p-calendar__back' onClick={this.goBack}>戻る</button>
          </div>
          <div className='l-col-4'>
            <button className='p-calendar__forward' onClick={this.goForward}>進む</button>
          </div>
          <div className='l-col-4'>
            <button className='p-calendar__reset' onClick={this.reset}>リセット</button>
          </div>
          <div className='l-col-4'>
            <CopyToClipboard
              onCopy={this.onCopy}
              text={this.state.history[this.state.history.length -1].text}>
              <button className='p-calendar__copy'>コピー</button>
            </CopyToClipboard>
          </div>
        </section>
      </div>
    )
  }

}