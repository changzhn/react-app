import CustomInput from '../components/custom-input';
import { IFormItem, IFormInput, IFormSelect, IFormInputNumber, IFormSwitch, IFormRadio, IFormCheckbox, IFormCustom, IFormDate, IFormCascader } from '../components/form-group/interface';

export const palinText: IFormItem = {
  type: 'text',
  id: 'plaintext',
  label: '填写',
  defaultValue: '纯文本',
};

export const input: IFormInput = {
  type: 'input',
  id: 'name',
  label: '名称',
  defaultValue: 'mayday',
};

export const custom: IFormCustom = {
  type: 'custom',
  id: 'custom',
  label: '自定义',
  Ele: CustomInput,
};

export const password = {
  type: 'password',
  id: 'psw',
  label: '密码',
};

export const inputNumber: IFormInputNumber = {
  type: 'inputNumber',
  id: 'inputNumber',
  label: '个数',
  defaultValue: 3,
  min: 1,
  max: 10,
  unit: '个',
};

export const select: IFormSelect = {
  type: 'select',
  id: 'area',
  label: '地区',
  defaultValue: 'hebei',
  options: [
    { label: '河北', value: 'hebei' },
    { label: '河南', value: 'henan' },
  ]
};

export const cascader1: IFormSelect = {
  type: 'select',
  id: 'cascader-l1',
  label: 'cascader-l1',
  options: 'l1',
  // options: {
  //   api: '/mock',
  //   storeField: 'l1',
  // },
  linked: ['cascader-l2', 'cascader-l3'],
};

export const cascader2: IFormSelect = {
  type: 'select',
  id: 'cascader-l2',
  label: 'cascader-l2',
  options: 'l2',
  // options: {
  //   api: '/mock',
  //   storeField: 'l2',
  // },
  // linked: 'cascader-l3',
};

export const cascader3: IFormSelect = {
  type: 'select',
  id: 'cascader-l3',
  label: 'cascader-l3',
  options: 'l2'
};

export const remoteSelect: IFormSelect = {
  type: 'select',
  id: 'male',
  label: '性别',
  options: {
    api: '/male',
    storeField: 'male',
  }
}

export const multiSelect: IFormSelect = {
  type: 'select',
  id: 'male2',
  label: '性别(multi)',
  mode: 'multiple',
  options: {
    api: '/male',
    storeField: 'male',
  }
};

export const switchInput: IFormSwitch = {
  type: 'switch',
  id: 'switch',
  label: '是否选择',
  checkedChildren: '是',
  unCheckedChildren: '否',
};

export const radio: IFormRadio = {
  type: 'radio',
  id: 'radio-1',
  label: '1+1=?',
  defaultValue: 1,
  buttonStyle: true,
  options: [
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
    },
    {
      label: '3',
      value: 3,
    }
  ]
};

export const checkbox: IFormCheckbox = {
  type: 'checkbox',
  id: 'checkbox-1',
  label: 'hello?',
  defaultValue: [],
  options: [
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
    },
    {
      label: '3',
      value: 3,
    }
  ]
};

export const date: IFormDate = {
  type: 'date',
  id: 'date1',
  label: '时间',
  format: 'YYYY-MM-DD'
};

export const rangeDate: IFormDate = {
  type: 'rangePicker',
  id: 'date3',
  label: '时间2',
  timeStamp: true,
};

export const cascader: IFormCascader = {
  type: 'cascader',
  id: 'cascader1',
  label: '联动1',
  options: [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ],
}