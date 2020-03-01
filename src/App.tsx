import React from 'react';
import logo from './logo.svg';
import { Form, Select } from 'antd';
import 'antd/dist/antd.min.css';
import './App.css';

const App: React.FC = () => {
  const [query, setQuery] = React.useState<any>({num: []});
  React.useEffect(() => {
    setTimeout(() => {
      setQuery({num: [1,2,3]})
    }, 100)
  }, []); 
  console.log(query);
  
  return (
    <div className="App">
      <Form initialValues={query}>
        <Form.Item name="num">
          <Select mode="multiple">
            <Select.Option value={1}>1</Select.Option>
            <Select.Option value={2}>2</Select.Option>
            <Select.Option value={3}>3</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
