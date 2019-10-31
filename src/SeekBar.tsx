import * as React from 'react';
import { Slider, Row, Col } from 'antd';
import './SeekBar.css';
import { Moment } from 'moment';

export interface ISeekBarProps {
    dates: [Moment, Moment];
    onChange: (value: [Moment, Moment]) => void;
}

const SeekBar: React.SFC<ISeekBarProps> = React.memo((props: ISeekBarProps) => {
    const { onChange, dates: [START_TIME, END_TIME] } = props;

    const startHour = START_TIME.get('hour');
    const startMinute = START_TIME.get('minute');
    const endHour = END_TIME.get('hour');
    const endMinute = END_TIME.get('minute');

    function handleChange(key: 'startHour' | 'startMinute' | 'endHour' | 'endMinute', value: number) {
        const isSameDay = START_TIME.format('YYYY-MM-DD') === END_TIME.format('YYYY-MM-DD');
        let startTime = START_TIME;
        let endTime = END_TIME;

        if (isSameDay) {
            if (key === 'startHour') {
                if (value > endHour) {
                    return;
                } else if (value === endHour && startMinute > endMinute) {
                    START_TIME.set('minute', endMinute);
                }
            } else if (key === 'endHour') {
                if (value < startHour) {
                    return;
                } else if (value === startHour && startMinute > endMinute) {
                    START_TIME.set('minute', endMinute);
                }
            } else if (startHour === endHour) {
                if (key === 'startMinute') {
                    if (value > endMinute) {
                        return;
                    }
                } else if (key === 'endMinute') {
                    if (value < startMinute) {
                        return;
                    }
                }
            }
        }

        if (key === 'startHour') {
            startTime = START_TIME.clone().set('hour', value);
        } else if (key === 'startMinute') {
            startTime = START_TIME.clone().set('minute', value);
        } else if (key === 'endHour') {
            endTime = END_TIME.clone().set('hour', value);
        } else if (key === 'endMinute') {
            endTime = END_TIME.clone().set('minute', value);
        }

        if (typeof onChange === 'function') {
            onChange([startTime, endTime]);
        }
    }

    return (
        <div className="seek-bar-container">
            <div className="seek-bar-item">
                <Row>
                    <Col span={4}>
                        小时：
                    </Col>
                    <Col span={16}>
                        <Slider value={startHour} min={0} max={23} onChange={(value: any) => handleChange('startHour', value)} />
                    </Col>
                    <Col span={4}>
                        {startHour}
                    </Col>
                </Row>

                <Row>
                    <Col span={4}>
                        分：
                    </Col>
                    <Col span={16}>
                        <Slider value={startMinute} min={0} max={59} onChange={(value: any) => handleChange('startMinute', value)} />
                    </Col>
                    <Col span={4}>
                        {startMinute}
                    </Col>
                </Row>
            </div>

            <div className="seek-bar-item">
                <Row>
                    <Col span={4}>
                        小时：
                    </Col>
                    <Col span={16}>
                        <Slider value={endHour} min={0} max={23} onChange={(value: any) => handleChange('endHour', value)} />
                    </Col>
                    <Col span={4}>
                        {endHour}
                    </Col>
                </Row>

                <Row>
                    <Col span={4}>
                        分：
                    </Col>
                    <Col span={16}>
                        <Slider value={endMinute} min={0} max={59} onChange={(value: any) => handleChange('endMinute', value)} />
                    </Col>
                    <Col span={4}>
                        {endMinute}
                    </Col>
                </Row>
            </div>
        </div>
    );
})

export default SeekBar;
