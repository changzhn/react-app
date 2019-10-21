import { FormComponentProps, ValidationRule } from 'antd/es/form';
import { FormGroupStore } from './store';

export interface IFormItem {
  // 返回数据中的key
  id: string;
  label?: string;
  type: 'text' | 'input' | 'password' | 'inputNumber' | 'select' | 'switch' | 'radio' | 'checkbox' | 'date' | 'rangePicker' | 'custom' | 'cascader';
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

// _.get(formStore.remoteOpts, options, [])
// 应用场景为拥有之前的select框同样的options
export type IStoreOptions = string;

export interface IRemoteOptions {
  api: string;
  storeField: string;
  // 如果需要联动调用另一个接口会包装成 { [paramKey]: value } 形式传到接口参数中
  paramKey?: string;
  // 不需要手动传，在组件内部自动处理
  paramValue?: any; 
  dataPath?: string;
}

export interface ILocalOptions {
  label: string;
  value: any;
  children?: ILocalOptions[];
}

export interface IFormSelect extends IFormItem {
  type: 'select';
  mode?: 'multiple' | 'tags';
  options: IStoreOptions | IRemoteOptions | ILocalOptions[];
  linked?: string[]; // 联动的select的id
}

export interface IFormSwitch extends IFormItem {
  type: 'switch';
  checkedChildren?: any;
  unCheckedChildren?: any;
}

export interface IFormRadio extends IFormItem {
  type: 'radio';
  buttonStyle?: boolean;
  options: IStoreOptions | IRemoteOptions | ILocalOptions[];
}

export interface IFormCheckbox extends IFormItem {
  type: 'checkbox';
  options: IStoreOptions | IRemoteOptions | ILocalOptions[];
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

export interface IFormCascader extends IFormItem {
  type: 'cascader';
  options: IStoreOptions | ILocalOptions[];
}

export type OneOfFormItem = IFormItem | IFormInput | IFormInputNumber | IFormSelect | IFormSwitch | IFormRadio | IFormCheckbox | IFormDate | IFormCustom | IFormCascader;

export interface IFormGroupProps extends FormComponentProps {
  layout: 'horizontal' | 'vertical' | 'inline';
  onSubmit: (values: any) => void;
  fields: OneOfFormItem[] | OneOfFormItem[][];
  formStore: FormGroupStore;
  // 整个form的列数
  col?: number;
  onChange?: (vlaue: any,  values: any) => void;
  okBtn?: false | string;
  resetBtn?: false | string;
}

export interface IState {
  fields: Array<OneOfFormItem>;
}