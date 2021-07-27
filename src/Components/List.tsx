import "../App.scss";
import { IDataListItem } from "../types";

function List(props:Array<IDataListItem>) {
  return (
    <div className="body__row">
      {props.map((item: IDataListItem, index: number) => (
        <div key={index} className="body__item">
          <img src={item.url} alt="" />
        </div>
      ))}
    </div>
  );
}

export default List;
