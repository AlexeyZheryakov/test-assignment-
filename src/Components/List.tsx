import React from "react";
import "../App.scss";
import { IDataListItem } from "../types";
import { IData } from "../Api"

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
          {item.data.map((itemData: IData, index: number) => (
            <img key={index} src={itemData.data.image_url} alt="" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default List;
