import React from 'react';
import './App.css';
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
      format: 'YYYY-MM-DD HH:mm',
      allowClear: false,
      disabledDate: (currentDate: Moment | undefined) => currentDate ? currentDate.valueOf() > moment().valueOf() : false,
      // defaultPickerValue: [moment('2018-12-12')],
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
