import React from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.min.css';
import { RangePickerProps } from 'antd/lib/date-picker/interface';
import moment, { Moment } from 'moment';
import SeekBar from './SeekBar';

// @ts-ignore
window['moment'] = moment;

// const opts = {
//   locale,
//   disabledDate: uTime.isFuture,
//   showTime: { format: 'HH:mm' },
//   format: 'YYYY-MM-DD HH:mm',
//   value: [startTime, endTime] as [moment.Moment, moment.Moment],
//   allowClear: false,
//   ranges: GET_TIME_RANGES,
//   onChange: event.onChange.bind(this),
//   onOk: event.onOk.bind(this),
//   onOpenChange: event.onOpenChange.bind(this),
//   size: 'small' as "small" | "large" | "default" | undefined,
//   fixIt: props.store.time.customStart, // fix it
// } as any;

export const GET_TIME_RANGES = {
  '30m': () => [moment().subtract(30, 'minutes'), moment()] as [Moment, Moment],
  '1h': () => [moment().subtract(1, 'hours'), moment()] as [Moment, Moment],
  '2h': () => [moment().subtract(2, 'hours'), moment()] as [Moment, Moment],
  '6h': () => [moment().subtract(6, 'hours'), moment()] as [Moment, Moment],
  '12h': () => [moment().subtract(12, 'hours'), moment()] as [Moment, Moment],
  '1d': () => [moment().subtract(1, 'days'), moment()] as [Moment, Moment],
  '3d': () => [moment().subtract(3, 'days'), moment()] as [Moment, Moment],
  '7d': () => [moment().subtract(6, 'days'), moment()] as [Moment, Moment],
}

export interface IState {
  dates: [Moment, Moment];
}

export default class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    const GET_DEFAULT_END_TIME = moment();
    const GET_DEFAULT_START_TIME = moment().add(-2, 'hour');

    this.state = {
      dates: [GET_DEFAULT_START_TIME, GET_DEFAULT_END_TIME],
    }
  }

  public handleChange = (dates: any) => {
    this.setState({ 
      dates,
    });
  }

  render() {
    const { dates } = this.state;

    const seekBarOpts = {
      onChange: this.handleChange,
      dates,
    }
    
    const opts: RangePickerProps = {
      showTime: { format: 'HH:mm' },
      format: 'YYYY-MM-DD HH:mm',
      allowClear: false,
      disabledDate: (currentDate: Moment | undefined) => currentDate ? currentDate.valueOf() > moment().valueOf() : false,
      ranges: GET_TIME_RANGES,
      value: dates,
      onChange: this.handleChange,
      renderExtraFooter: () => <SeekBar {...seekBarOpts} />
    };
    return (
      <div className="App">
        <DatePicker.RangePicker {...opts} />
      </div>
    )
  }
}
