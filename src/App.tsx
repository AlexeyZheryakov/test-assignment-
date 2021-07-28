import React, { useReducer } from "react";
import "./App.scss";
import Api from "./Api";
import reducer, { initialState } from "./store";
import { IDataListItem, IState, IAction } from "./types";
import List from './Components/List';
import GroupList from './Components/GroupList';
import SearchForm from './Components/SearchForm';
import { IData } from './Api';

function App() {
  const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(
    reducer,
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

  const callbackData = (res: { ok: boolean, data: IData}) => {
    if(res.ok) {
      const arr = [];
      arr.push(res.data);
      dispatch({
        type: "ADD_LIST",
        payload: {
          dataList: [{ tag: state.search, data: arr}],
        },
      })
    } else {
      alert("Произошла http ошибка");
      dispatch({
        type: "LOADING",
        payload: {
          loading: true,
        },
      });
    }
  }

  const callbackLoading = (loading:boolean) => {
    dispatch({
      type: "LOADING",
      payload: {
        loading: loading,
      },
    });
  }

  const randomTags = ['dog', 'cat', 'mouse', 'boom', 'axaxa']

  const handleLoading = () => {
    if (state.search === "") {
      alert('Заполните поле "тег"');
    } else if (/^[A-Za-z,]+$/.test(state.search) && state.search !=='delay') {
      Api.getImages(state.search.split(',')).then((res) => {
        const arr:Array<IData> = [];
        res.map((item) => arr.push(item.data))
        dispatch({
          type: "ADD_LIST",
          payload: {
            dataList: [{ tag: state.search, data: arr}],
          },
        })
      }
      );
    } else if (state.search === "delay"){
      dispatch({
        type: "LOADING",
        payload: {
          loading: true,
        },
      });
      Api.getImageByDeley(randomTags, callbackData, callbackLoading)
    }else {
      alert('Не допустимое значение поля "тег", только латинские буквы, через запятую, без пробелов');
    }
  };

  // const getData = async (tag:string) => {
  //   try {
  //     dispatch({
  //       type: "LOADING",
  //       payload: {
  //         loading: true,
  //       },
  //     });
  //     const { data } = await Api.getData(tag);
  //     setTimeout(() => {
  //       if (data.data.image_url !== undefined) {
  //         dispatch({
  //           type: "ADD_LIST",
  //           payload: {
  //             dataList: [{ tag: state.search, url: data.data.image_url }],
  //             loading: false,
  //           },
  //         });
  //         console.log(state.dataList);
  //       } else {
  //         alert("По тегу ничего не найдено");
  //         dispatch({
  //           type: "LOADING",
  //           payload: {
  //             loading: true,
  //           },
  //         });
  //       }
  //     }, 1000);
  //   } catch (error) {
  //     alert("Произошла http ошибка");
  //     dispatch({
  //       type: "LOADING",
  //       payload: {
  //         loading: true,
  //       },
  //     });
  //   }
  // };

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
        <SearchForm 
          state={state}
          tagHandler={tagHandler}
          handleLoading={handleLoading}
          handleClear={handleClear}
          handleGroup={handleGroup} 
        />
      </div>
      <div className="body">
        <div className="conteiner">
          <div className="body__list">
            {!state.group && <List dataList={state.dataList} tagHandler={tagHandler}/> }
          </div>
          <div className="body_groupList">
            {state.group && <GroupList dataList={state.dataList} tagsForGroupWithData={state.tagsForGroupWithData} tagHandler={tagHandler}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
