import React from 'react';
import './App.css';
import 'antd/dist/antd.min.css';
import Demo1 from './Demo1';

// @ts-ignore
window['moment'] = moment;

export default class App extends React.Component<any, any> {

  render() {
    
    return (
      <div className="App">
        <Demo1 />
      </div>
    )
  }
}
