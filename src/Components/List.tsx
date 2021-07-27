import React from "react";
import "../App.scss";
import { IDataListItem } from "../types";

interface IList {
  dataList: Array<IDataListItem>,
  tagHandler: (value:string) => void,
}

const List: React.FC<IList> = ({dataList, tagHandler}) => {
  const handleClick = (tag: string) => () => tagHandler(tag);
  return (
    <div className="body__row">
      {dataList.map((item: IDataListItem, index: number) => (
        <div onClick={handleClick(item.tag)} key={index} className="body__item">
          <img src={item.url} alt="" />
        </div>
      ))};
    </div>
  );
}

export default List;
