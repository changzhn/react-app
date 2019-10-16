import * as React from 'react';
import { Button, Form } from 'antd';
import { renderField } from './utils';
import { IFormGroupProps, IFormDate } from './interface';
import { inject, observer } from 'mobx-react';
import { Moment } from 'moment';

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

  public convertMoment = (values: any) => {
    const { fields } = this.props;
    if (Array.isArray(fields)) {
      fields.forEach(field => {
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

  public handleSubmit = (e: any) => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        values = this.convertMoment(values);
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
          <Form.Item {...buttonItemLayout}>
            <Button onClick={this.handleSubmit} type="primary">提交</Button>
            &nbsp;&nbsp;
            <Button onClick={this.reset}>重置</Button>
          </Form.Item>
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