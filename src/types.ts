export interface IState {
    dataList: Array<IDataListItem>,
    search: string,
    group: boolean,
    tagsForGroup: Array<string>,
    loading: boolean,
}
  
export interface IDataListItem {
tag: string;
url: string;
}

export interface IAction {
    type:string,
    payload: IPayload,
}

interface IPayload {
    dataList?: Array<IDataListItem>,
    search?: string,
    group?: boolean,
    tagsForGroup?: Array<string>,
    loading?: boolean,
}

export type Action =
 | { type: 'clear', payload: { dataList: Array<IDataListItem>, search: string }}
 | { type: 'search', payload: { search: string }}
 | { type: 'group', payload: { group: boolean }}
 | { type: 'loading false', payload: { loading: boolean }}
 | { type: 'add dataList', payload: { dataList: Array<IDataListItem>, loading: boolean }}
 | { type: 'add tags for group', payload: { tagsForGroup: Array<string> }}
