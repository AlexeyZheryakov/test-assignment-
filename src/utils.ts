import { IDataListItem, ITagsForGroupWithData } from './types';

export const groupByTag = (array:Array<IDataListItem>) => {
    const groupByTagObject =  array.reduce((acc:ITagsForGroupWithData, item) => {
      if (acc[item.tag]) {
        acc[item.tag] = [...acc[item.tag], item];
      } else {
        acc[item.tag] = [item];
      }
      return acc;
  }, {});
  return Object.values(groupByTagObject)
}
