import { IState, Action, IAction } from './types';

const reduser = (state:IState, action:any) => {
    switch (action.type) {
        case 'clear':
            return {
                ...state,
                dataList: action.payload.dataList,
                search: action.payload.search,
            }
        case 'search':
            return {
                ...state,
                search: action.payload.search,
            }
        case 'group':
            return {
                ...state,
                group: action.payload.group,
            }
        case 'loading false':
            return {
                ...state,
                loading: action.payload.loading,
            }
        case 'add dataList':
            return {
                ...state,
                dataList: [...state.dataList, action.payload.dataList],
                loading: action.payload.loading,
            }
        case 'add tags for group':
            return {
                ...state,
                tagsForGroup: action.payload.tagsForGroup,
            }
        default: return state
    }
}

export default reduser;
