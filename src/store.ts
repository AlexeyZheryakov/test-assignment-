import { IState, IAction } from "./types";

export const initialState = {
  dataList: [],
  search: "",
  group: false,
  tagsForGroupWithData: {},
  loading: false,
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case "CLEAR":
      return {
        ...state,
        dataList: action.payload.dataList || initialState.dataList,
        search: action.payload.search || initialState.search,
      };
    case "SEARCH":
      return {
        ...state,
        search: action.payload.search || initialState.search,
      };
    case "GROUP":
      return {
        ...state,
        group: action.payload.group || initialState.group,
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload.loading || initialState.loading,
      };
    case "ADD_LIST":
      return {
        ...state,
        dataList: [
          ...state.dataList,
          ...(action.payload.dataList || initialState.dataList),
        ],
      };
    case "ADD_TAG_BY_GROUP":
      return {
        ...state,
        tagsForGroupWithData: action.payload.tagsForGroupWithData || initialState.tagsForGroupWithData,
      };
    default:
      return state;
  }
};

export default reducer;
