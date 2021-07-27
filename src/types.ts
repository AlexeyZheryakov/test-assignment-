export interface IState {
    dataList: Array<IDataListItem>;
    search: string;
    group: boolean;
    tagsForGroup: Array<string>;
    loading: boolean;
  }
  
  export interface IDataListItem {
    tag: string;
    url: string;
  }
  
  interface IPayload {
    dataList?: Array<IDataListItem>;
    search?: string;
    group?: boolean;
    tagsForGroup?: Array<string>;
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
  