import { FormComponentProps, ValidationRule } from 'antd/es/form';
import { FormGroupStore } from '../../store';

export interface IFormItem {
  // 返回数据中的key
  id: string;
  label?: string;
  type: 'text' | 'input' | 'password' | 'inputNumber' | 'select' | 'switch' | 'radio' | 'checkbox' | 'date' | 'rangePicker';
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

export type OneOfFormItem = IFormItem | IFormInput | IFormInputNumber | IFormSelect | IFormSwitch | IFormRadio | IFormCheckbox | IFormDate;

export interface IFormGroupProps extends FormComponentProps {
  layout: 'horizontal' | 'vertical' | 'inline';
  onSubmit: (values: any) => void;
  fields: Array<OneOfFormItem>;
  formStore: FormGroupStore;
}