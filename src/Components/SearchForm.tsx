export {}

// import React from 'react';
// import './App.scss';
// import { Button, Form } from 'react-bootstrap';

// interface IItem {
//   tag: string;
//   url: string;
// }

// function SearchForm() {
//   const [search, setSearch] = React.useState<string>('');
//   const [loading, setLoading] = React.useState<boolean>(false);
//   const handleClear = () => {
//     setDataList([]);
//     setSearch('');
//   };

//   const tagHandler = (value:string) => {
//     setSearch(value);
//   }

//   const handleLoading = () => {
//     if(search === '') {
//       alert('Заполните поле "тег"')
//     } else if (/^[A-Za-z,]+$/.test(search)) {
//       getData()
//     } else {
//       alert('Не допустимое значение поля "тег"')
//     }
//   }

//   return (
//     <>
//       <div className="title__item input">
//         <Form.Control value={search} onChange={(e) => tagHandler(e.target.value)} type="text" placeholder="Normal text" />
//       </div>
//       <div className="title__item">
//         {!loading &&<Button onClick={handleLoading} variant="success">Загрузить</Button>}
//         {loading && <Button disabled variant="success">Загрузка...</Button>}
//       </div>
//       <div className="title__item">
//         <Button onClick={handleClear} variant="danger">Очистить</Button>
//       </div>
//     </>
//   );
// }

// export default SearchForm;
