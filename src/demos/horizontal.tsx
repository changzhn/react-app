import * as React from 'react';
import FormGroup from '../components/form-group';
import * as fromItems from '../shared/form-items';
import { IFormGroupProps, OneOfFormItem } from '../components/form-group/interface';

export default class Horizontal extends React.PureComponent {
  public render() {
    debugger
    // FIXME: formStore & form props
    // @ts-ignore
    const opts: IFormGroupProps = {
      layout: 'horizontal',
      onSubmit: values => console.log(values),
      col: 2,
      fields: [
        ...Object.values(fromItems) as OneOfFormItem[]
      ]
    };

    return (
      <div style={{width: '800px', margin: '10px auto', border: '1px solid #ccc', padding: '10px'}}>
        <h3>horizontal demo</h3>
        <FormGroup {...opts} />
      </div>
    );
  }
}
