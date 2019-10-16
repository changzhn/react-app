import React from 'react';
import './App.css';
import 'antd/dist/antd.min.css';
import FormGroup from './components/form-group';
import { IFormGroupProps } from './components/form-group/interface';

class App extends React.Component {
  render() {
    // FIXME:
    // @ts-ignore
    const opts: IFormGroupProps = {
      layout: 'horizontal',
      onSubmit: values => console.log(values),
      fields: [
        {
          type: 'input',
          id: 'name',
          label: '名称',
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
        }
      ]
    };

    return (
      <div style={{width: '300px'}}>
        <FormGroup {...opts} />
      </div>
    )
  }
}

export default App;
