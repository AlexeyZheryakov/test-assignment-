import { IData } from './Api';
export interface IState {
  dataList: Array<IDataListItem>;
  search: string;
  group: boolean;
  tagsForGroupWithData: ITagsForGroupWithData;
  loading: boolean;
  showModal: boolean;
  massegeModal: string;
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
  tagsForGroupWithData?: ITagsForGroupWithData;
  loading?: boolean;
  showModal?: boolean;
  massegeModal?: string;
}

type ActionType =
  | "CLEAR"
  | "SEARCH"
  | "GROUP"
  | "LOADING"
  | "ADD_LIST"
  | "ADD_TAG_BY_GROUP"
  | "SHOW_MODAL"

export interface IAction {
  type: ActionType;
  payload: IPayload;
}
  