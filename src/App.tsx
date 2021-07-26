import React from 'react';
import './App.scss';
import { Button, Form } from 'react-bootstrap';
import Api from './Api';

interface IItem {
  tag: string;
  url: string;
}

function App() {
  const [dataList, setDataList] = React.useState<Array<IItem>>([]);
  const [search, setSearch] = React.useState<string>('');
  const [group, setGroup] = React.useState<boolean>(false);
  const [tagsForGroup, setTagsForGroup] = React.useState<Array<string>>([]) 
  const handleClear = () => {
    setDataList([]);
    setSearch('');
  };

  const handlGroup = () => {
    setGroup(!group);
  };

  const getData = async () => {
    try {
      const { data } = await Api.getData(search);
      setTimeout(() => {
        setDataList([...dataList, {tag: search, url: data.data.image_url}]);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const arr = dataList.map((item:IItem) => item.tag);
    function unique(arr:Array<string>) {
    let result:Array<string> = [];
  
    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
  
    return setTagsForGroup(result);
  };
    unique(arr);
  }, [dataList])
  return (
    <div className="App">
      <div className="title">
        <div className="conteiner">
          <div className="title__row">
            <div className="title__item input">
              <Form.Control value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Normal text" />
            </div>
            <div className="title__item">
              <Button onClick={getData} variant="success">Загрузить</Button>
            </div>
            <div className="title__item">
              <Button onClick={handleClear} variant="danger">Очистить</Button>
            </div>
            <div className="title__item">
              {!group && <Button onClick={handlGroup} variant="primary">Группировать</Button>}
              {group && <Button onClick={handlGroup} variant="primary">Разгруппировать</Button>}
            </div>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="conteiner">
          <div className="body__row">
            {!group && dataList.map((item:IItem, index) => (
              <div key={index} className="body__item">
                <img src={item.url} alt="" />
              </div>
            ))}
          </div>
          <div className="body_column">
            {group && tagsForGroup.map((itemGroup:string, index) => (
              <>
                <div>{itemGroup}</div>
                <div key={index} className="body__group">
                  {dataList.map((item:IItem, index) => itemGroup === item.tag && (
                    <div key={index} className="body__item">
                      <img src={item.url} alt="" />
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
