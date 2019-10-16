import { observable, action } from 'mobx';
import _ from 'lodash';

async function mock(api: any) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        result: {
          data: [
            { label: '男', value: 'male' },
            { label: '女', value: 'famale' },
          ]
        },
        resultCode: 200,
        resultMessage: "请求成功",
      })
    }, 1000)
  })
}

export interface IRemoteOpts {
  [propName: string]: Array<{label: string, value: any}>
}

export class FormGroupStore {
  @observable public remoteOpts: IRemoteOpts = {};

  @action public async queryOpts(api: any, storeField: string, dataPath?: string) {
    const response = await mock(api);
    const data = _.get(response, dataPath || 'result.data', []);
    this.remoteOpts = {
      ...this.remoteOpts,
      [storeField]: data,
    }
  }
}

export default new FormGroupStore();