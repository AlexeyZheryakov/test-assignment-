import "../App.scss";
import { IDataListItem, IState, IAction } from "../types";
import { ITagsForGroupWithData } from '../types';

function GroupList(props:ITagsForGroupWithData) {
  return (
    <div className="body_column">
      {Object.keys(props).map((tag:string, index:number) => (
        <div key={index}>
          <div>{tag}</div>
          <div className="body__group">
            {props[tag].map((item:IDataListItem, index:number) => (
              <div key={index} className="body__item">
                <img src={item.url} alt="" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupList;
