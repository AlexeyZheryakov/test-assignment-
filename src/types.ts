import { IData } from './Api';
export interface IState {
  dataList: Array<IDataListItem>;
  search: string;
  group: boolean;
  tagsForGroupWithData: ITagsForGroupWithData;
  loading: boolean;
}

export interface ITagsForGroupWithData {
  [key:string]:Array<IDataListItem>,
}
  
export interface IDataListItem {
  tag: string;
  data: Array<IData>;
}

interface IPayload {
  dataList?: Array<IDataListItem>;
  search?: string;
  group?: boolean;
  tagsForGroupWithData?: Array<Array<IDataListItem>>;
  loading?: boolean;
}

type ActionType =
  | "CLEAR"
  | "SEARCH"
  | "GROUP"
  | "LOADING"
  | "ADD_LIST"
  | "ADD_TAG_BY_GROUP";

export interface IAction {
  type: ActionType;
  payload: IPayload;
}
  