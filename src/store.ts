import { observable, action } from 'mobx';
import _ from 'lodash';

const selectOpts = [
  { label: '男', value: 'male' },
  { label: '女', value: 'famale' },
];

const l1 = [
  { label: 'Zhejiang', value: 'zhejiang' },
  { label: 'Jiangsu', value: 'jiangsu' },
];

const l2 = {
  zhejiang: [
    { label: 'Hangzhou', value: 'hangzhou' },
  ],
  jiangsu: [
    { label: 'Nanjing', value: 'nanjing' },
  ]
};

const l2Arr = [
  { label: 'Hangzhou', value: 'hangzhou' },
  { label: 'Nanjing', value: 'nanjing' }
]

const l3 = {
  hangzhou: [
    {
      value: 'xihu',
      label: 'West Lake',
    }
  ],
  nanjing: [
    {
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }
  ]
};

async function mock(api: any, opt: any[]) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        result: {
          data: opt,
        },
        resultCode: 200,
        resultMessage: "请求成功",
      })
    }, 1000)
  })
}

export type IOpt = {label: string, value: any};

export interface ICascaderOpts {
  [propName: string]: IOpt[];
}

export interface IRemoteOpts {
  [propName: string]: IOpt[] | ICascaderOpts;
};

export class FormGroupStore {
  @observable public remoteOpts: IRemoteOpts = {};

  constructor() {
    // 模拟应用一加载时获取的数据
    this.remoteOpts.l1 = l1;
    this.remoteOpts.l2 = l2;
    this.remoteOpts.l3 = l3;
  }

  @action public async queryOpts(api: any, storeField: string, dataPath?: string, body?: any) {

    let mockData: any = [];
    if (storeField === 'male' || storeField === 'male2') {
      mockData = selectOpts;
    } else if (storeField === 'l1') {
      mockData = l1;
    } else if (storeField === 'l2') {
      mockData = l2Arr;
    }

    const response = await mock(api, mockData);
    const data = _.get(response, dataPath || 'result.data', []);
    this.remoteOpts = {
      ...this.remoteOpts,
      [storeField]: data,
    }
  }

  @action public clearOne(key: string) {
    delete this.remoteOpts[key];
  }
}

export default new FormGroupStore();