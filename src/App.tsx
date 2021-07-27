import React, { useReducer } from "react";
import "./App.scss";
import Api from "./Api";
import reduser, { initialState } from "./store";
import { IDataListItem, IState, IAction } from "./types";
import List from './Components/List';
import GroupList from './Components/GroupList';
import SearchForm from './Components/SearchForm';

function App() {
  const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(
    reduser,
    initialState
  );

  const handleClear = () => {
    dispatch({
      type: "CLEAR",
      payload: {
        dataList: [],
        search: "",
      },
    });
  };

  const tagHandler = (value: string) => {
    dispatch({
      type: "SEARCH",
      payload: {
        search: value,
      },
    });
  };

  const handleGroup = () => {
    dispatch({
      type: "GROUP",
      payload: {
        group: !state.group,
      },
    });
  };

  const handleLoading = () => {
    if (state.search === "") {
      alert('Заполните поле "тег"');
    } else if (/^[A-Za-z,]+$/.test(state.search)) {
      getData();
    } else {
      alert('Не допустимое значение поля "тег", только латинские буквы');
    }
  };

  const getData = async () => {
    try {
      dispatch({
        type: "LOADING",
        payload: {
          loading: true,
        },
      });
      const { data } = await Api.getData(state.search);
      setTimeout(() => {
        if (data.data.image_url !== undefined) {
          dispatch({
            type: "ADD_LIST",
            payload: {
              dataList: [{ tag: state.search, url: data.data.image_url }],
              loading: false,
            },
          });
        } else {
          alert("По тегу ничего не найдено");
          dispatch({
            type: "LOADING",
            payload: {
              loading: true,
            },
          });
        }
      }, 1000);
    } catch (error) {
      alert("Произошла http ошибка");
      dispatch({
        type: "LOADING",
        payload: {
          loading: true,
        },
      });
    }
  };

  const groupByTag = (array:Array<IDataListItem>) => {
    const groupByTagObject =  array.reduce((acc:any, item) => {
      if (acc[item.tag]) {
        acc[item.tag] = [...acc[item.tag], item];
      } else {
        acc[item.tag] = [item];
      }
      return acc;
  }, {});
  return dispatch({
    type: "ADD_TAG_BY_GROUP",
    payload: {
      tagsForGroupWithData: groupByTagObject,
    },
  });
  }

  React.useEffect(() => {
   groupByTag(state.dataList);
  }, [state.dataList]);

  return (
    <div className="App">
      <div className="SearchForm">
        {SearchForm(state, tagHandler, handleLoading, handleClear, handleGroup)}
      </div>
      <div className="body">
        <div className="conteiner">
          <div className="body__list">
            {!state.group && List(state.dataList, tagHandler)}
          </div>
          <div className="body_groupList">
            {state.group && GroupList(state.tagsForGroupWithData, tagHandler)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
