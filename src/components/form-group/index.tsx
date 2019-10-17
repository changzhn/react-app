import * as React from 'react';
import { Button, Form, Row, Col } from 'antd';
import { renderField } from './utils';
import { IFormGroupProps, IFormDate, OneOfFormItem, IState, IFormSelect } from './interface';
import { inject, observer } from 'mobx-react';
import { Moment } from 'moment';
import _ from 'lodash';

const convertMoment = (fields: any, values: any) => {
  if (Array.isArray(fields)) {
    fields.forEach((field: any) => {
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

  public handleSubmit = (e: any) => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        values = convertMoment(this.props.fields, values);
        typeof onSubmit === 'function' && onSubmit(values);
      }
    });
  }

  public handleChange = (value: any, field: OneOfFormItem) => {
    const { linked } = field as IFormSelect;
    // 处理联动
    if (Array.isArray(linked)) {
      this.handleLinkedSelect(field as IFormSelect, value);
    }
  }

  public handleLinkedSelect = ({ linked, defaultValue }: IFormSelect, value: any) => {
    const fields = this.state.fields.map(f => {
      if ((linked as any[]).includes(f.id)) {
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
          [f.id]: defaultValue,
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
    const { layout, col = 1, okBtn, resetBtn } = this.props;
    const formItemLayout = this.getFormItemLayout(layout);
    const buttonItemLayout = this.getButtonItemLayout(layout);
    if (!Array.isArray(fields)) {
      return <div>数据错误，field应该是一个数组</div>
    }

    let renderFields: OneOfFormItem[][] = [];
    if (fields.length && Array.isArray(fields[0])) {
      // @ts-ignore
      renderFields = fields;
    } else {
      renderFields  = _.chunk(fields, col);
    }

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
          {
            okBtn === false && resetBtn === false ? null :
            (
              <Form.Item {...buttonItemLayout}>
                {okBtn === false ? null : <Button onClick={this.handleSubmit} type="primary">{ typeof okBtn === 'string' ? okBtn : '提交' }</Button>}
                &nbsp;&nbsp;
                {resetBtn === false ? null : <Button onClick={this.reset}>{ typeof resetBtn === 'string' ? resetBtn : '重置' }</Button>}
              </Form.Item>
            )
          }
        </Form>
      </div>
    )
  }
}

export default Form.create<IFormGroupProps>({
  onValuesChange: (props, value, allValues) => {
    if (typeof props.onChange === 'function') {
      allValues = convertMoment(props.fields, allValues);
      props.onChange(value, allValues);
    }
  },
})(FormGroup);