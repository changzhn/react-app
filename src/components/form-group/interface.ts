import { FormComponentProps } from 'antd/es/form';
import { FormGroupStore } from '../../store';

export interface IFormItem {
  // 返回数据中的key
  id: string;
  label?: string;
  width?: number;
  type: 'input' | 'select';
  // TODO:
  validations?: any; 
  defaultValue?: any;
}

export interface IFormInput extends IFormItem {
  type: 'input';
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
  options: IRemoteOptions | ILocalOptions[];
}

export type OneOfFormItem = IFormInput | IFormSelect;

export interface IFormGroupProps extends FormComponentProps {
  layout: 'horizontal' | 'vertical' | 'inline';
  onSubmit: (values: any) => void;
  fields: Array<OneOfFormItem>;
  formStore: FormGroupStore;
}