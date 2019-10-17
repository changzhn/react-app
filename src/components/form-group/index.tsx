import * as React from 'react';
import { Button, Form, Row, Col } from 'antd';
import { renderField } from './utils';
import { IFormGroupProps, IFormDate, OneOfFormItem } from './interface';
import { inject, observer } from 'mobx-react';
import { Moment } from 'moment';
import _ from 'lodash';

@inject('formStore')
@observer
export class FormGroup extends React.PureComponent<IFormGroupProps> {

  public getFormItemLayout = (layout: 'horizontal' | 'vertical' | 'inline') => {
    const formItemLayout =
      layout === 'horizontal'
        ? {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
          }
        : null;
    return formItemLayout;
  }

  public getButtonItemLayout = (layout: 'horizontal' | 'vertical' | 'inline') => {
    const buttonItemLayout =
      layout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 10 },
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
    const { fields, layout, col = 1 } = this.props;
    const formItemLayout = this.getFormItemLayout(layout);
    const buttonItemLayout = this.getButtonItemLayout(layout);
    if (!Array.isArray(fields)) {
      return <div>数据错误，field应该是一个数组</div>
    }

    const renderFields: OneOfFormItem[][] = _.chunk(fields, col);

    return (
      <div>
        <Form layout={layout}>
          {
            renderFields.map((fieldGroup, rowIdx) => (
              <Row key={`row-${rowIdx}`}>
                {
                  fieldGroup.map((field, colIdx) => (
                    <Col span={24 / col} key={`col-${rowIdx}-${colIdx}`}>
                      {
                        renderField.call(this, field, formItemLayout)
                      }
                    </Col>
                  ))
                }
              </Row>
            ))
          }
          {/* footer */}
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

export default Form.create<IFormGroupProps>({
  // onValuesChange: (props, value, allValues) => console.log(props, value, allValues),
})(FormGroup);