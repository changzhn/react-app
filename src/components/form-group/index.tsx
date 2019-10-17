import * as React from 'react';
import { Button, Form, Row, Col } from 'antd';
import { renderField } from './utils';
import { IFormGroupProps, IFormDate, OneOfFormItem, IState, IFormSelect, IRemoteOptions } from './interface';
import { inject, observer } from 'mobx-react';
import { Moment } from 'moment';
import _ from 'lodash';

@inject('formStore')
@observer
export class FormGroup extends React.PureComponent<IFormGroupProps, IState> {

  constructor(props: IFormGroupProps) {
    super(props);

    this.state = {
      fields: [],
    };
  }


  public static getDerivedStateFromProps(nextProps: any, prevState: IState) {
    return {
      ...prevState,
      fields: nextProps.fields,
    };
  }

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

  public handleChange = (value: any, field: OneOfFormItem) => {
    const { id, linked } = field as IFormSelect;
    // 处理联动
    if (linked) {
      this.handleLinkedSelect(field as IFormSelect, value);
    }

    // 返回上级
    if (typeof this.props.onChange === 'function') {
      // TODO: date组件没有触发
      this.props.onChange({ 
        [id]: value,
      });
    }
  }

  public handleLinkedSelect = ({ linked, defaultValue }: IFormSelect, value: any) => {
    const fields = this.state.fields.map(f => {
      if (linked === f.id) {
        const { options } = f as IFormSelect;

        if (typeof options === 'string') {
          // l2.zhejiang
          let dotIdx: number = options.indexOf('.');
          if (dotIdx > 0) {
            (f as IFormSelect).options = options.slice(0, options.indexOf('.') + 1) + value;
          } else {
            (f as IFormSelect).options = `${options}.${value}`;
          }
        } else if (Array.isArray(options)) {
          // 传了一组固定数据，应该交由上级的onChange事件继续自行处理
        } else {
          // remote
          const { formStore } = this.props;
          formStore.clearOne(f.id);
          (f as IFormSelect).options = {
            ...options,
            paramValue: value,            
          }
        }

        // 清空关联框
        this.props.form.setFieldsValue({
          [linked as string]: defaultValue,
          // FIXME: 为了处理3级联动时无法清空第3级
          [(f as IFormSelect).linked as string]: undefined,
        })
      }
      return f;
    });

    this.setState({ fields });
  }

  public reset = () => {
    this.props.form.resetFields();
  }

  public render() {
    const { fields } = this.state;
    const { layout, col = 1 } = this.props;
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