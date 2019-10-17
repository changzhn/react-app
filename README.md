# form group

## TODO:
- 表单联动
- 自定义表单的校验功能 提供一个默认开启检验的规则
- 自定义按钮和文字
- select默认选中第一个的配置

## 说明

### select的options的来源
```ts
export type IStoreOptions = string;

export interface IRemoteOptions {
  api: string;
  storeField: string;
  dataPath?: string;
}

export interface ILocalOptions {
  label: string;
  value: any;
  children?: ILocalOptions[];
}

const options: IStoreOptions | IRemoteOptions | ILocalOptions[];
```
1. 页面加载时通过接口调用已存在`formStore`中，可以传 `IStoreOptions` 字符串，则会直接从`formStore.remoteOpts[options]`中取值，可以适用于系统中公用的`options`选项；
2. 当前页面独有的`options`，可以传`IRemoteOptions`，store内部判断`formStore.remoteOpts[storeField]`是否有值来是否调用`api`来远程获取，`dataPath`参数是规定数据在接口的定位，会调用`lodash.get(response, dataPath, [])`，dataPath可以根据自己项目定义默认值；
3. 如果是固定数据（也可以是存在当前页面store中远程获取的options）则可以传 `ILocalOptions[]`类型，`children`属性是供`IFormCascader`级联组件使用的；