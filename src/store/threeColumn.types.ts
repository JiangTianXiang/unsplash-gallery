export interface IColumnFeed {
  key: number;
  images: Array<object>;
}

export interface IThreeColumnFeed {
  data: Array<object>;
  hasError: boolean;
  renderObject: Array<IColumnFeed>;
  page: number;
  isLoading: boolean;
  totalResult?: number;
  maxPage: number;
}

export const splitDataToColumns = (
  currentRenderObject: Array<IColumnFeed>,
  newData: Array<object>
) => {
  const newRenderObject = [...currentRenderObject];
  let counter = 0;

  while (counter < newData.length) {
    newRenderObject[counter % 3].images.push(newData[counter]);
    counter++;
  }
  return newRenderObject;
};
