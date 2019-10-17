import { FormComponentProps, ValidationRule } from 'antd/es/form';
import { FormGroupStore } from '../../store';

export interface IFormItem {
  // 返回数据中的key
  id: string;
  label?: string;
  type: 'text' | 'input' | 'password' | 'inputNumber' | 'select' | 'switch' | 'radio' | 'checkbox' | 'date' | 'rangePicker' | 'custom';
  defaultValue?: any;
  rules?: ValidationRule[]; 
}

export interface IFormInput extends IFormItem {
  type: 'input' | 'password';
}

export interface IFormInputNumber extends IFormItem {
  type: 'inputNumber';
  min?: number;
  max?: number;
  // 单位
  unit?: string;
}

export interface IRemoteOptions {
  api: string;
  storeField: string;
  dataPath?: string;
}

export interface ILocalOptions {
  label: string;
  value: any;
}

export interface IFormSelect extends IFormItem {
  type: 'select';
  mode?: 'multiple' | 'tags';
  options: IRemoteOptions | ILocalOptions[];
}

export interface IFormSwitch extends IFormItem {
  type: 'switch';
  checkedChildren?: any;
  unCheckedChildren?: any;
}

export interface IFormRadio extends IFormItem {
  type: 'radio';
  buttonStyle?: boolean;
  options: IRemoteOptions | ILocalOptions[];
}

export interface IFormCheckbox extends IFormItem {
  type: 'checkbox';
  options: IRemoteOptions | ILocalOptions[];
}

export interface IFormDate extends IFormItem {
  type: 'date' | 'rangePicker';
  format?: string;
  timeStamp?: boolean;
}

// 自定义看官方文档
// https://ant.design/components/form-cn/#components-form-demo-customized-form-controls
export interface IFormCustom extends IFormItem {
  type: 'custom';
  Ele: any;
}

export type OneOfFormItem = IFormItem | IFormInput | IFormInputNumber | IFormSelect | IFormSwitch | IFormRadio | IFormCheckbox | IFormDate | IFormCustom;

export interface IFormGroupProps extends FormComponentProps {
  layout: 'horizontal' | 'vertical' | 'inline';
  onSubmit: (values: any) => void;
  fields: Array<OneOfFormItem>;
  formStore: FormGroupStore;
  // 整个form的列数
  col?: number;
}