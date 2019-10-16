import { observable, action } from 'mobx';

export interface IRemoteOpts {
  [propName: string]: Array<{label: string, value: any}>
}

export class FormGroupStore {
  @observable public remoteOpts: IRemoteOpts = {};

  @action public async queryOpts(api: any, storeField: string, dataPath?: string) {
    setTimeout(() => {
      this.remoteOpts = {
        ...this.remoteOpts,
        [storeField]: [
          { label: '男', value: 'male' },
          { label: '女', value: 'famale' },
        ]
      }
    }, 1000)
  }
}

export default new FormGroupStore();