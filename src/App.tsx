import React, { useReducer } from 'react';
import './App.scss';
import { Button, Form } from 'react-bootstrap';
import Api from './Api';
import reduser from './store';
import { IDataListItem } from './types';



function App() {
  const [state, dispatch] = useReducer(reduser, { dataList: [], search: '', group: false, tagsForGroup: [], loading: false });
  const handleClear = () => {
    dispatch({
      type: 'clear',
      payload: {
        dataList: [],
        search: '',
      }
    })
  };

  const tagHandler = (value:string) => {
    dispatch({
      type: 'search',
      payload: {
        search: value,
      }
    })
  }

  const handleGroup = () => {
    dispatch({
      type: 'group',
      payload: {
        group: !state.group,
      }
    })
  };

  const handleLoading = () => {
    if(state.search === '') {
      alert('Заполните поле "тег"')
    } else if (/^[A-Za-z,]+$/.test(state.search)) {
      getData()
    } else {
      alert('Не допустимое значение поля "тег"')
    }
  }

  const getData = async () => {
    try {
      dispatch({
        type: 'loading false',
        payload: {
          loading: true,
        }
      })
      const { data } = await Api.getData(state.search);
      setTimeout(() => {
        if(data.data.image_url !== undefined) {
          dispatch({
            type: 'add dataList',
            payload: {
              dataList: {tag: state.search, url: data.data.image_url},
              loading: false,
            }
          })
        } else {
          alert('По тегу ничего не найдено');
          dispatch({
            type: 'loading false',
            payload: {
              loading: true,
            }
          })
        }
      }, 1000);
    } catch (error) {
      alert('Произошла http ошибка');
      dispatch({
        type: 'loading false',
        payload: {
          loading: true,
        }
      })
    }
  };

  React.useEffect(() => {
    const arr = state.dataList.map((item:IDataListItem) => item.tag);
    function unique(arr:Array<string>) {
    let result:Array<string> = [];
  
    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
  
    return dispatch({
      type: 'add tags for group',
      payload: {
        tagsForGroup: result,
      }
    })
  };
    unique(arr);
    console.log(state.dataList);
    
  }, [state.dataList])
  return (
    <div className="App">
      <div className="title">
        <div className="conteiner">
          <div className="title__row">
            <div className="title__item input">
              <Form.Control value={state.search} onChange={(e) => tagHandler(e.target.value)} type="text" placeholder="Normal text" />
            </div>
            <div className="title__item">
              {!state.loading &&<Button onClick={handleLoading} variant="success">Загрузить</Button>}
              {state.loading && <Button disabled variant="success">Загрузка...</Button>}
            </div>
            <div className="title__item">
              <Button onClick={handleClear} variant="danger">Очистить</Button>
            </div>
            <div className="title__item">
              {!state.group && <Button onClick={handleGroup} variant="primary">Группировать</Button>}
              {state.group && <Button onClick={handleGroup} variant="primary">Разгруппировать</Button>}
            </div>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="conteiner">
          <div className="body__row">
            {!state.group && state.dataList.map((item:IDataListItem, index:number) => (
              <div key={index} className="body__item">
                <img src={item.url} alt="" />
              </div>
            ))}
          </div>
          <div className="body_column">
            {state.group && state.tagsForGroup.map((itemGroup:string, index:number) => (
              <div key={index}>
                <div>{itemGroup}</div>
                <div  className="body__group">
                  {state.dataList.map((item:IDataListItem, index:number) => itemGroup === item.tag && (
                    <div key={index} className="body__item">
                      <img src={item.url} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
