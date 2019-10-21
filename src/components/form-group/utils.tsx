import * as React from 'react';
import { FormGroup } from './index';
import { OneOfFormItem, IFormSelect, IRemoteOptions, IFormInputNumber, IFormSwitch, IFormRadio, IFormCheckbox, ILocalOptions, IFormDate, IFormCustom, IFormCascader, IStoreOptions } from './interface';
import { Checkbox, DatePicker, Form, Input, InputNumber, Select, Switch, Radio, Cascader } from 'antd';
import { IOpt } from './store';
import _ from 'lodash';
import { Moment } from 'moment';


export function getOptions(this: FormGroup, options: IStoreOptions | IRemoteOptions | ILocalOptions[]) {
  const { formStore } = this.props;
  let renderOpts: any[] = [];
  if (typeof options === 'string') {
    renderOpts = _.get(formStore.remoteOpts, options, []) as IOpt[];
  } else if (Array.isArray(options)) {
    renderOpts = options;
  } else {
    const { api, storeField, dataPath, paramKey, paramValue } = options as IRemoteOptions;
    if (formStore.remoteOpts[storeField]) {
      renderOpts = formStore.remoteOpts[storeField] as IOpt[];
    } else {
      formStore.queryOpts(api, storeField, dataPath, { [paramKey as string]: paramValue });
    }
  }

  return renderOpts;
}

export function renderField(this: FormGroup, field: OneOfFormItem, formItemLayout: any) {
  const { form } = this.props;
  const { getFieldDecorator } = form;
  const { type, id, label, defaultValue, rules = [] } = field;
  let el: React.ReactNode;

  const fromItemOpts = {
    label: label,
    key: id,
    ...formItemLayout,
  };

  const defaultRules: any[] = [
    // TODO: 1. 是否是默认开启必填校验 2. 自定义表单不起作用
    // { required: true, message: `请选择/填写${label || ''}` },
  ];

  const decoratorOpts = {
    initialValue: defaultValue,
    rules: [
      ...defaultRules,
      ...rules,
    ],
  };

  const commomOpts = {
    placeholder: `请输入${label || ''}`,
    allowClear: true,
    // 这里的onChange只是处理联动的
    onChange: (value: any) => this.handleChange(value, field),
  };

  switch(type) {
    case 'text':
      el = (
        <Form.Item {...fromItemOpts}>
          <span className="ant-form-text">{ defaultValue }</span>
        </Form.Item>
      )
      break;
    case 'custom':
      const { Ele } = field as IFormCustom;
      el = (
        <Form.Item {...fromItemOpts}>
          {
            getFieldDecorator(id, {
              ...decoratorOpts,
            })(
              <Ele {...commomOpts} />
            )
          }
        </Form.Item>
      )
      break;
    case 'input':
    case 'password':
      el = (
        <Form.Item {...fromItemOpts}>
          {
            getFieldDecorator(id, {
              ...decoratorOpts,
            })(
              type === 'input' ?
              <Input {...commomOpts} /> :
              <Input.Password {...commomOpts} />
            )
          }
        </Form.Item>
      )
      break;

    case 'inputNumber':
      const { min, max, unit } = field as IFormInputNumber;
      el = (
        <Form.Item {...fromItemOpts}>
          {
            getFieldDecorator(id, {
              ...decoratorOpts,
            })(
              <InputNumber {...commomOpts} min={min} max={max} />
            )
          }
          <span className="ant-form-text">{ unit }</span>
        </Form.Item>
      )
      break;

    case 'select':
      {
        const { options, mode } = field as IFormSelect;
        let renderOpts: any[] = getOptions.call(this, options);
        el = (
          <Form.Item {...fromItemOpts}>
            {
              getFieldDecorator(id, {
                ...decoratorOpts,
              })(
                <Select {...commomOpts} mode={mode}>
                  {
                    Array.isArray(renderOpts) && renderOpts.map((option: any) => (
                      <Select.Option key={option.value} value={option.value}>{ option.label }</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
        )
      }
      break;

    case 'switch':
      const { checkedChildren, unCheckedChildren } = field as IFormSwitch;
      el = (
        <Form.Item {...fromItemOpts}>
          {
            getFieldDecorator(id, {
              // 默认 valuePropName: 'value'
              valuePropName: 'checked',
              initialValue: defaultValue || false,
            })(
              <Switch checkedChildren={checkedChildren} unCheckedChildren={unCheckedChildren} />
            )
          }
        </Form.Item>
      )
      break;
    
    case 'radio':
      {
        const { options, buttonStyle } = field as IFormRadio;
        let renderOpts: any[] = getOptions.call(this, options);

        el = (
          <Form.Item {...fromItemOpts}>
            {
              getFieldDecorator(id, {
                ...decoratorOpts,
              })(
                <Radio.Group>
                  {
                    Array.isArray(renderOpts) && renderOpts.map(option => (
                      buttonStyle ?
                      <Radio.Button key={option.value} value={option.value}>{ option.label }</Radio.Button> :
                      <Radio key={option.value} value={option.value}>{ option.label }</Radio>
                    ))
                  }
                </Radio.Group>
              )
            }
          </Form.Item>
        )
      }
      break;
    case 'checkbox':
      {
        const { options } = field as IFormCheckbox;
        let renderOpts: any[] = getOptions.call(this, options);

        el = (
          <Form.Item {...fromItemOpts}>
            {
              getFieldDecorator(id, {
                ...decoratorOpts,
              })(
                <Checkbox.Group
                  options={renderOpts}
                />
              )
            }
          </Form.Item>
        )
      }
      break;

    case 'date':
      {
        el = (
          <Form.Item {...fromItemOpts}>
            {
              getFieldDecorator(id, {
                ...decoratorOpts,
              })(
                <DatePicker />
              )
            }
          </Form.Item>
        )
      }
      break;

    case 'rangePicker':
      {
        el = (
          <Form.Item {...fromItemOpts}>
            {
              getFieldDecorator(id, {
                ...decoratorOpts,
              })(
                <DatePicker.RangePicker />
              )
            }
          </Form.Item>
        )
      }
      break;
    
    case 'cascader':
      {
        const { options } = field as IFormCascader;
        const renderOpts = getOptions.call(this, options);
        el = (
          <Form.Item {...fromItemOpts}>
            {
              getFieldDecorator(id, {
                ...decoratorOpts,
              })(
                <Cascader {...commomOpts} options={renderOpts} />
              )
            }
          </Form.Item>
        ) 
      }
      break;
    default:

  }

  return el;
}

export function convertMoment(fields: any, values: any) {
  if (Array.isArray(fields)) {
    fields.forEach((field: any) => {
      const { id, format = 'YYYY-MM-DD HH-mm-ss', timeStamp } = field as IFormDate;
      const value = values[id];
      if (value && value._isAMomentObject) {
        if (timeStamp) {
          values[id] = (value as Moment).valueOf();
        } else {
          values[id] = (value as Moment).format(format);
        }
      }

      if (Array.isArray(value) && value.length === 2) {
        values[id] = value.map(mom => {
          if (mom._isAMomentObject) {
            if (timeStamp) {
              return (mom as Moment).valueOf();
            } else {
              return (mom as Moment).format(format);
            }
          }
          return mom;
        })
      }
    })
  }
  return values;
}