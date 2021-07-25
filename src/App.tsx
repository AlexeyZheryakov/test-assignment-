import React from 'react';
import './App.scss';
import { Button, Form } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <div className="title">
        <div className="conteiner">
          <div className="title__row">
            <div className="title__item input">
              <Form.Control type="text" placeholder="Normal text" />
            </div>
            <div className="title__item">
              <Button variant="success">Загрузить</Button>
            </div>
            <div className="title__item">
              <Button variant="danger">Очистить</Button>
            </div>
            <div className="title__item">
              <Button variant="primary">Группировать</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
