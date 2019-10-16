import React from 'react';
import './App.css';
import 'antd/dist/antd.min.css';
import FormGroup from './components/form-group';
import { IFormGroupProps } from './components/form-group/interface';
import CustomInput from './components/custom-input';

class App extends React.Component {
  render() {
    // FIXME:
    // @ts-ignore
    const opts: IFormGroupProps = {
      layout: 'horizontal',
      onSubmit: values => console.log(values),
      fields: [
        {
          type: 'text',
          id: 'plaintext',
          label: '填写',
          defaultValue: '纯文本',
        },
        {
          type: 'custom',
          id: 'custom',
          label: '自定义',
          defaultValue: 12,
          // FIXME:
          // @ts-ignore
          el: <CustomInput />
        },
        {
          type: 'input',
          id: 'name',
          label: '名称',
          rules: [
            { required: false }
          ]
        },
        {
          type: 'password',
          id: 'psw',
          label: '密码',
        },
        {
          type: 'inputNumber',
          id: 'inputNumber',
          label: '个数',
          defaultValue: 3,
          min: 1,
          max: 10,
          unit: '个',
        },
        {
          type: 'select',
          id: 'area',
          label: '地区',
          defaultValue: 'hebei',
          options: [
            { label: '河北', value: 'hebei' },
            { label: '河南', value: 'henan' },
          ]
        },
        {
          type: 'select',
          id: 'male',
          label: '性别',
          options: {
            api: '/male',
            storeField: 'male',
          }
        },
        {
          type: 'select',
          id: 'male2',
          label: '性别(multi)',
          mode: 'multiple',
          options: {
            api: '/male',
            storeField: 'male',
          }
        },
        {
          type: 'switch',
          id: 'switch',
          label: '是否选择',
          checkedChildren: '是',
          unCheckedChildren: '否',
        },
        {
          type: 'radio',
          id: 'radio-1',
          label: '1+1=?',
          defaultValue: 1,
          buttonStyle: true,
          options: [
            {
              label: '1',
              value: 1,
            },
            {
              label: '2',
              value: 2,
            },
            {
              label: '3',
              value: 3,
            }
          ]
        },
        {
          type: 'checkbox',
          id: 'checkbox-1',
          label: 'hello?',
          defaultValue: [],
          buttonStyle: true,
          options: [
            {
              label: '1',
              value: 1,
            },
            {
              label: '2',
              value: 2,
            },
            {
              label: '3',
              value: 3,
            }
          ]
        },
        {
          type: 'date',
          id: 'date1',
          label: '时间',
          format: 'YYYY-MM-DD'
        },
        {
          type: 'rangePicker',
          id: 'date3',
          label: '时间2',
          timeStamp: true,
        }
      ]
    };

    return (
      <div style={{width: '600px'}}>
        <FormGroup {...opts} />
      </div>
    )
  }
}

export default App;
