import * as React from 'react';
import { Input, Select } from 'antd';

/**
 * TIPS: 如何自定义表单组件 https://ant.design/components/form-cn/#components-form-demo-customized-form-controls
 * 提供受控属性 value 或其它与 valuePropName 的值同名的属性
 * 提供 onChange 事件或 trigger 的值同名的事件
 */

const Option = Select.Option;

export interface IProps {
  size: 'small' | 'default' | 'large';
  onChange: (value: any) => void;
  value: {
    number: number;
    currency: 'dollar' | 'rmb';
  }
}

export interface IState {
  number: number;
  currency: 'dollar' | 'rmb';
}

export default class PriceInput extends React.Component<IProps, IState> {
  static getDerivedStateFromProps(nextProps: any) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props: any) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 0,
      currency: value.currency || 'rmb',
    };
  }

  handleNumberChange = (e: any) => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  };

  handleCurrencyChange = (currency: any) => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  };

  triggerChange = (changedValue: any) => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...this.state,
        ...changedValue,
      });
    }
  };

  render() {
    const { size } = this.props;
    const { currency, number } = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={number}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={currency}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
      </span>
    );
  }
}