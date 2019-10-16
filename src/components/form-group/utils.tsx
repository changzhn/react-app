import * as React from 'react';
import { FormGroup } from './index';
import { OneOfFormItem, IFormSelect, IRemoteOptions } from './interface';
import { Form, Input, Select } from 'antd';


export function renderField(this: FormGroup, field: OneOfFormItem, formItemLayout: any) {
  const { form } = this.props;
  const { getFieldDecorator } = form;
  const { type, id, label, defaultValue } = field;
  let el: React.ReactNode;

  const fromItemOpts = {
    label: label,
    key: id,
    ...formItemLayout,
  };

  const decratorOpts = {
    initialValue: defaultValue,
  }

  const commomOpts = {
    placeholder: `请输入${label || ''}`,
    allowClear: true,
  };

  switch(type) {
    case 'input':
      el = (
        <Form.Item {...fromItemOpts}>
          {
            getFieldDecorator(id, {
              ...decratorOpts,
            })(
              <Input {...commomOpts} />
            )
          }
        </Form.Item>
      )
      break;
    case 'select':
      const { formStore } = this.props;
      const { options } = field as IFormSelect;
      let renderOpts: any[] = [];

      if (Array.isArray(options)) {
        renderOpts = options;
      } else {
        const { api, storeField, dataPath } = options as IRemoteOptions;
        if (formStore.remoteOpts[storeField]) {
          renderOpts = formStore.remoteOpts[storeField];
        } else {
          formStore.queryOpts(api, storeField, dataPath);
        }
      }


      el = (
        <Form.Item {...fromItemOpts}>
          {
            getFieldDecorator(id, {
              ...decratorOpts,
            })(
              <Select {...commomOpts}>
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
      break;
    default:

  }

  return el;
}