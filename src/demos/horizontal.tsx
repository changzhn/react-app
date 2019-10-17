import * as React from 'react';
import FormGroup from '../components/form-group';
import * as fromItems from '../shared/form-items';
import { IFormGroupProps, OneOfFormItem } from '../components/form-group/interface';

export default class Horizontal extends React.PureComponent {

  public handleChange = (value: any, values: any) => {
    console.log(value, values);
  }

  public render() {
    // FIXME: formStore & form props
    // @ts-ignore
    const opts: IFormGroupProps = {
      layout: 'horizontal',
      onSubmit: values => console.log(values),
      onChange: this.handleChange.bind(this),
      col: 2,
      fields: [
        ...Object.values(fromItems) as OneOfFormItem[]
      ],
      okBtn: false,
      resetBtn: false,
    };

    return (
      <div style={{width: '800px', margin: '10px auto', border: '1px solid #ccc', padding: '10px'}}>
        <h3>horizontal demo</h3>
        <FormGroup {...opts} />
      </div>
    );
  }
}
