import "../App.scss";
import { Button, Form } from "react-bootstrap";
import { IState } from "../types";
import React from "react";

interface ISearchForm {
    state: IState,
    tagHandler: (value:string )=> void,
    handleLoading: () => void,
    handleClear: () => void,
    handleGroup: () => void,
}

const SearchForm: React.FC<ISearchForm> = ({state, tagHandler, handleLoading, handleClear, handleGroup}) => {
  const loading = () => handleLoading();
  const clear = () => handleClear();
  const group = () => handleGroup();
  return (
    <div className="title">
        <div className="conteiner">
            <div className="title__row">
                <div className="title__item input">
                    <Form.Control
                    value={state.search}
                    onChange={(e) => tagHandler(e.target.value)}
                    type="text"
                    placeholder="введите тег"
                    />
                </div>
                <div className="title__item">
                    {!state.loading && (
                    <Button onClick={loading} variant="success">
                        Загрузить
                    </Button>
                    )}
                    {state.loading && (
                    <Button disabled variant="success">
                        Загрузка...
                    </Button>
                    )}
                </div>
                <div className="title__item">
                    <Button onClick={clear} variant="danger">
                    Очистить
                    </Button>
                </div>
                <div className="title__item">
                    {!state.group && (
                        <Button onClick={group} variant="primary">
                            Группировать
                        </Button>
                    )}
                    {state.group && (
                        <Button onClick={group} variant="primary">
                            Разгруппировать
                        </Button>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}

export default SearchForm;