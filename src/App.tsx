import React, { useReducer } from 'react';
import './App.scss';
import Api from './Api';
import reducer, { initialState } from "./store";
import { IState, IAction } from "./types";
import List from './Components/List';
import GroupList from './Components/GroupList';
import SearchForm from './Components/SearchForm';
import { IData } from './Api';
import { Modal } from 'react-bootstrap';
import { groupByTag } from './utils';

const randomTags = ['dog', 'cat', 'mouse', 'tank', 'axaxa', 'salute'];

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

  const callbackData = (res: { ok: boolean, data: IData, err: string}) => {
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
      modalHandler(true, res.err)
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

  const handleLoading = () => {
    if (state.search === "") {
      modalHandler(true, 'Заполните поле "тег"')
    } else if (/^[A-Za-z,]+$/.test(state.search) && state.search !=='delay') {
      Api.getImages(state.search.split(',')).then((res) => {
        callbackLoading(true);
        const arr:Array<IData> = [];
        res.forEach((item, index) => { 
          if (item.data.data.image_url !== undefined) {
            arr.push(item.data)
            
          } else {
            modalHandler(true, `По тегу"${state.search.split(',')[index]}" ничего не найдено`);
          }
        })
        arr.length && dispatch({
          type: "ADD_LIST",
          payload: {
            dataList: [{ tag: state.search, data: arr}],
          },
        })
      }).catch((e) => modalHandler(true, `${e}`)).finally(() => callbackLoading(false));
    } else if (state.search === "delay") {
      Api.getImageByDeley(randomTags, callbackData, callbackLoading)
    }else {
      modalHandler(true, 'Не допустимое значение поля "тег", только латинские буквы, через запятую, без пробелов')
    }
  };
  
  const modalHandler = (flag: boolean, text: string) => {
    dispatch({
      type: "SHOW_MODAL",
      payload: {
        showModal: flag,
        massegeModal: text,
      }
    })
  }

  React.useEffect(() => {
    dispatch({
      type: "ADD_TAG_BY_GROUP",
      payload: {
        tagsForGroupWithData: groupByTag(state.dataList)
      },
    });
  }, [state.dataList]);

  return (
    <div className="App">
      <Modal
        size="sm"
        show={state.showModal}
        onHide={() => modalHandler(false, '')}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal">
            Внимание!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{state.massegeModal}</Modal.Body>
      </Modal>
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
