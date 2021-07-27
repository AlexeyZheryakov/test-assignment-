import "../App.scss";
import { IDataListItem } from "../types";

function List(props:Array<IDataListItem>, tagHandler:Function) {
  const handleClick = (tag: string) => () => tagHandler(tag);
  return (
    <div className="body__row">
      {props.map((item: IDataListItem, index: number) => (
        <div onClick={handleClick(item.tag)} key={index} className="body__item">
          <img src={item.url} alt="" />
        </div>
      ))}
    </div>
  );
}

export default List;
