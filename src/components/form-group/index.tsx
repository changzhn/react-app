import * as React from 'react';
import { Button, Form } from 'antd';
import { renderField } from './utils';
import { IFormGroupProps } from './interface';
import { inject, observer } from 'mobx-react';

@inject('formStore')
@observer
export class FormGroup extends React.PureComponent<IFormGroupProps> {

  public getFormItemLayout = (layout: 'horizontal' | 'vertical' | 'inline') => {
    const formItemLayout =
      layout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;
    return formItemLayout;
  }

  public getButtonItemLayout = (layout: 'horizontal' | 'vertical' | 'inline') => {
    const buttonItemLayout =
      layout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : null;
    return buttonItemLayout;
  }

  public handleSubmit = (e: any) => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        typeof onSubmit === 'function' && onSubmit(values);
      }
    });
  }

  public reset = () => {
    this.props.form.resetFields();
  }

  public render() {
    const { fields, layout } = this.props;
    const formItemLayout = this.getFormItemLayout(layout);
    const buttonItemLayout = this.getButtonItemLayout(layout);

    return (
      <div>
        <Form layout={layout}>
          {
            Array.isArray(fields) && fields.map(field => (
              renderField.call(this, field, formItemLayout)
            ))
          }
          <Form.Item {...buttonItemLayout}>
            <Button onClick={this.handleSubmit} type="primary">提交</Button>
            &nbsp;&nbsp;
            <Button onClick={this.reset}>重置</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create<IFormGroupProps>()(FormGroup);