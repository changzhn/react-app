import * as React from 'react';
import { FormGroup } from './index';
import { OneOfFormItem, IFormSelect, IRemoteOptions, IFormInputNumber, IFormSwitch, IFormRadio, IFormCheckbox, ILocalOptions, IFormCustom, IFormCascader, IStoreOptions } from './interface';
import { Checkbox, DatePicker, Form, Input, InputNumber, Select, Switch, Radio, Cascader } from 'antd';

export function getOptions(this: FormGroup, options: IStoreOptions | IRemoteOptions | ILocalOptions[]) {
  const { formStore } = this.props;
  let renderOpts: any[] = [];
  if (typeof options === 'string') {
    if (Array.isArray(formStore.remoteOpts[options])) {
      renderOpts = formStore.remoteOpts[options];
    }
  } else if (Array.isArray(options)) {
    renderOpts = options;
  } else {
    const { api, storeField, dataPath } = options as IRemoteOptions;
    if (formStore.remoteOpts[storeField]) {
      renderOpts = formStore.remoteOpts[storeField];
    } else {
      formStore.queryOpts(api, storeField, dataPath);
    }
  }

  return renderOpts;
}

export function handleChange(this: FormGroup, value: any) {
  if (typeof this.props.onChange === 'function') {
    this.props.onChange(value);
  }
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

  const decratorOpts = {
    initialValue: defaultValue,
    rules: [
      ...defaultRules,
      ...rules,
    ],
  };

  const commomOpts = {
    placeholder: `请输入${label || ''}`,
    allowClear: true,
    onChange: handleChange.bind(this),
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
              ...decratorOpts,
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
              ...decratorOpts,
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
              ...decratorOpts,
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
                ...decratorOpts,
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
                ...decratorOpts,
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
                ...decratorOpts,
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
                ...decratorOpts,
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
                ...decratorOpts,
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
                ...decratorOpts,
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