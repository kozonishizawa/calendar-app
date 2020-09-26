import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CalendarHeader from './CalendarHeader';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import './reset.css';
import './style.sass';

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

  // 日付をクリック
  hundleClickDate = e => {
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const data = e.target.dataset;
    const month = data.month;
    const date = data.date;
    const weekday = data.weekday;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const text = `\n${month}月${date}日（${weekdays[weekday]}）`;
    this.setState({
      history: history.concat([{
        text: history[history.length -1].text + text,
        beginningTime: '',
      }]),
      forward: [],
      stepNumber: history.length,
    });
  }

  // 時間をクリック
  handleClickTime = e => {
    const time = e.target.dataset.time;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const text = history[history.length - 1].beginningTime ? `${time}` : `　${time}〜`;
    this.setState({
      history: history.concat([{
        text: history[history.length -1].text + text,
        beginningTime: history[history.length -1].beginningTime ? '' : time,
      }]),
      forward: [],
      stepNumber: history.length,
    });
  }

  // カレンダーをめくる
  turnCalendar = e => {
    const data = e.target.dataset;
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

  render() {

    return (
        <React.Fragment>
          <div className='Calendar'>
            <section className='Calendar__screen'>
              <textarea cols='50' rows='10' value={this.state.history[this.state.history.length -1].text} onChange={e => this.onChangeText(e)}></textarea>
            </section>
            <section className='Calendar__datetimepicker'>
              <div>
                <CalendarHeader year={this.state.year} month={this.state.month} turnCalendar={this.turnCalendar} showPreviousMonth={this.showPreviousMonth} showNextMonth={this.showNextMonth} resetCalendar={this.resetCalendar} />
                <DatePicker year={this.state.year} month={this.state.month} hundleClickDate={this.hundleClickDate} />
              </div>
              <TimePicker handleClickTime={this.handleClickTime}  beginningTime={this.state.history[this.state.history.length -1].beginningTime} />
            </section>
            <section className='Calendar__buttons'>
              <div className='Col_4'>
                <button className='Calendar__back' onClick={this.goBack}>戻る</button>
              </div>
              <div className='Col_4'>
                <button className='Calendar__forward' onClick={this.goForward}>進む</button>
              </div>
              <div className='Col_4'>
                <button className='Calendar__reset' onClick={this.reset}>リセット</button>
              </div>
              <div className='Col_4'>
                <CopyToClipboard
                  onCopy={this.onCopy}
                  text={this.state.history[this.state.history.length -1].text}>
                  <button className='Calendar__copy'>コピー</button>
                </CopyToClipboard>
              </div>
            </section>
          </div>
        </React.Fragment>
      )
  }

}