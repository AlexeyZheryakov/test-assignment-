import "../App.scss";
import { IDataListItem } from "../types";
import { ITagsForGroupWithData } from "../types";
import { IData } from "../Api";
interface IGroupList {
  dataList: Array<IDataListItem>,
  tagsForGroupWithData: ITagsForGroupWithData,
  tagHandler: (value:string )=> void,
}

const GroupList:React.FC<IGroupList> = ({ dataList, tagsForGroupWithData, tagHandler }) => {
  const handleClick = (tag: string) => () => tagHandler(tag);
  return (
    <div className="body_column">
      {Object.keys(tagsForGroupWithData).map((tag:string, index:number) => (
        <div key={index}>
          <div>{tag}</div>
          <div className="body__group">
            {dataList.map((item: IDataListItem, index: number) => (
              tag === item.tag && <div onClick={handleClick(item.tag)} key={index} className="body__item">
                {item.data.map((itemData: IData, index: number) => (
                  <img key={index} src={itemData.data.image_url} alt="" />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupList;
