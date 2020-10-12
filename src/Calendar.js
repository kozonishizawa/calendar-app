import React, {useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CalendarHeader from './CalendarHeader';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import './reset.css';
import './style.sass';

const Calendar = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [history, setHistory] = useState([{
    text: '下記日程のご都合はいかがでしょうか。',
    beginningTime: '',
  }]);
  const [forward, setForward] = useState([]);
  const [stepNumber, setStepNumber] = useState(0);

  // 前月を表示
  const showPreviousMonth = () => {
    setYear(month <= 1 ? year - 1 : year);
    setMonth(month <=1 ? 12 : month - 1);
  }

  // 翌月を表示
  const showNextMonth = () => {
    setYear(month >= 12 ? year + 1 : year);
    setMonth(month >= 12 ? 1 : month + 1);
  }

  // 当月を表示
  const resetCalendar = () =>{
    const date = new Date();
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
  }

  // 日付をクリック
  const hundleClickDate = e => {
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const data = e.target.dataset;
    const targetMonth = data.month;
    const date = data.date;
    const weekday = data.weekday;
    const tmpHistory = history.slice(0, stepNumber + 1);
    const text = `\n${targetMonth}月${date}日（${weekdays[weekday]}）`;
    setHistory(
      tmpHistory.concat([{
        text: tmpHistory[tmpHistory.length - 1].text + text,
        beginningTime: '',
      }])
    );
    setForward([]);
    setStepNumber(tmpHistory.length);
  }

  // 時間をクリック
  const handleClickTime = e => {
    const time = e.target.dataset.time;
    const tmpHistory = history.slice(0, stepNumber + 1);
    const text = tmpHistory[tmpHistory.length - 1].beginningTime ? `${time}` : `　${time}〜`;
    setHistory(
      tmpHistory.concat([{
        text: tmpHistory[tmpHistory.length - 1].text + text,
        beginningTime: tmpHistory[tmpHistory.length - 1].beginningTime ? '' : time,
      }])
    );
    setForward([]);
    setStepNumber(tmpHistory.length);
  }

  // カレンダーをめくる
  const turnCalendar = e => {
    const data = e.target.dataset;
    setYear(data.year ? parseInt(data.year) : year);
    setMonth(data.month ? parseInt(data.month) : month);
  }

  // 文字を入力
  const onChangeText = e => {
    const text = e.target.value;
    const tmpHistory = history.slice(0, stepNumber + 1);
    setHistory(
      tmpHistory.concat([{
        text: text,
        beginningTime: tmpHistory[tmpHistory.lenght - 1].beginningTime,
      }])
    );
    setForward([]);
    setStepNumber(tmpHistory.length);
  }

  // 戻る
  const goBack = () => {
    const tmpHistory = history.slice(0, stepNumber);
    const tmpForward = history.slice(0, stepNumber + 1);
    if (tmpHistory.length > 0) {
      tmpHistory.splice(tmpHistory.length - 1, 1,{
        text: tmpHistory[tmpHistory.length - 1].text,
        beginningTime: tmpHistory[tmpHistory.length -1].beginningTime,
      });
      const currentStep = stepNumber;
      setHistory(tmpHistory);
      setForward(forward.concat(tmpForward[tmpForward.length - 1]));
      setStepNumber(currentStep- 1);
    }
  }

  // 進む
  const goForward = () => {
    if (forward.length) {
      const tmpHistory = history.slice();
      const tmpForward = forward.slice();
      const [recent, ...rest] = tmpForward.reverse();
      const currentStep = stepNumber;
      setHistory(tmpHistory.concat(recent));
      setForward(rest.reverce());
      setStepNumber(currentStep + 1);
    }
  }

  // リセット
  const reset = () => {
    const tmpHistory = history.slice(0, stepNumber + 1);
    setHistory(
      tmpHistory.concat([{
        text: '下記日程のご都合はいかがでしょうか。',
        beginningTime: '',
      }])
    );
    setStepNumber(tmpHistory.length);
  }

  return (
    <React.Fragment>
      <div className='Calendar'>
        <section className='Calendar__screen'>
          <textarea cols='50' rows='10' value={history[history.length -1].text} onChange={e => onChangeText(e)}></textarea>
        </section>
        <section className='Calendar__datetimepicker'>
          <div className='Calendar__datepicker'>
            <CalendarHeader year={year} month={month} turnCalendar={turnCalendar} showPreviousMonth={showPreviousMonth} showNextMonth={showNextMonth} resetCalendar={resetCalendar} />
            <DatePicker year={year} month={month} hundleClickDate={hundleClickDate} />
          </div>
          <TimePicker handleClickTime={handleClickTime}  beginningTime={history[history.length -1].beginningTime} />
        </section>
        <section className='Calendar__buttons'>
          <div className='Col_4'>
            <button className='Calendar__back' onClick={goBack}>戻る</button>
          </div>
          <div className='Col_4'>
            <button className='Calendar__forward' onClick={goForward}>進む</button>
          </div>
          <div className='Col_4'>
            <button className='Calendar__reset' onClick={reset}>リセット</button>
          </div>
          <div className='Col_4'>
            <CopyToClipboard
              text={history[history.length -1].text}>
              <button className='Calendar__copy'>コピー</button>
            </CopyToClipboard>
          </div>
        </section>
      </div>
    </React.Fragment>
  )
}

export default Calendar;