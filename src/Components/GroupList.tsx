import "../App.scss";
import { IDataListItem } from "../types";
import { ITagsForGroupWithData } from '../types';

function GroupList(props:ITagsForGroupWithData, tagHandler:Function) {
  const handleClick = (tag: string) => () => tagHandler(tag);
  return (
    <div className="body_column">
      {Object.keys(props).map((tag:string, index:number) => (
        <div key={index}>
          <div>{tag}</div>
          <div className="body__group">
            {props[tag].map((item:IDataListItem, index:number) => (
              <div onClick={handleClick(tag)} key={index} className="body__item">
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
